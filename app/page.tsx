'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Todo, TodoFilter } from '@/types';
import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';
import ThemeToggle from '@/components/ThemeToggle';
import TodoStats from '@/components/TodoStats';
import BackupReminder from '@/components/BackupReminder';
import DataInfo from '@/components/DataInfo';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, text: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  const exportTodos = () => {
    const dataStr = JSON.stringify(todos, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `todos-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Simpan tanggal backup dan tampilkan pesan sukses
    localStorage.setItem('lastBackupDate', new Date().getTime().toString());
    alert('✅ Data berhasil di-backup! Simpan file dengan aman dan ingat untuk backup secara berkala.');
  };

  const importTodos = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedTodos = JSON.parse(e.target?.result as string);
          if (Array.isArray(importedTodos)) {
            setTodos(importedTodos);
            alert('Data berhasil diimpor!');
          } else {
            alert('Format file tidak valid');
          }
        } catch (error) {
          alert('File tidak dapat dibaca');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 py-4 sm:py-8 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 relative">
          {/* Theme Toggle - positioned at top right */}
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
          
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-3 sm:mb-4 shadow-lg">
            <span className="text-xl sm:text-2xl">✨</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            TaskFlow
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 px-4">Kelola tugas Anda dengan mudah dan efisien</p>
        </div>
        
        <TodoStats todos={todos} />
        
        <AddTodo onAdd={addTodo} />

        {/* Controls Panel */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-slate-700 mb-6 sm:mb-8 transition-colors duration-300">
          {/* Search Input */}
          <div className="mb-4 sm:mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <span className="text-gray-400 dark:text-gray-500 text-lg sm:text-xl">🔍</span>
              </div>
              <input
                type="text"
                placeholder="Cari tugas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-600 transition-all duration-200 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Export/Import & Filters */}
          <div className="flex flex-col gap-4">
            {/* Export/Import Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={exportTodos}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                📥 Export
              </button>
              <label className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 text-sm sm:text-base">
                📤 Import
                <input
                  type="file"
                  accept=".json"
                  onChange={importTodos}
                  className="hidden"
                />
              </label>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-1 sm:gap-2 bg-gray-100 dark:bg-slate-700 p-1 rounded-xl overflow-x-auto">
              {(['all', 'active', 'completed'] as TodoFilter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-1 px-2 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm whitespace-nowrap ${
                    filter === f
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-600'
                  }`}
                >
                  {f === 'all' ? '📋 Semua' : f === 'active' ? '⏳ Aktif' : '✅ Selesai'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <TodoList
          todos={todos}
          filter={filter}
          searchTerm={searchTerm}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />

        <DataInfo />
        <BackupReminder onExport={exportTodos} />
      </div>
    </div>
  );
} 