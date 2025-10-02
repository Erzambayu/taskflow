'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Todo, TodoFilter } from '@/types';
import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';
import ThemeToggle from '@/components/ThemeToggle';
import TodoStats from '@/components/TodoStats';
import BackupReminder from '@/components/BackupReminder';
import DataInfo from '@/components/DataInfo';
import TodoControls from '@/components/TodoControls';
import KeyboardShortcuts from '@/components/KeyboardShortcuts';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const addTodoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem('todos');
      const hasVisited = localStorage.getItem('hasVisited');
      
      if (!hasVisited) {
        setIsFirstVisit(true);
        localStorage.setItem('hasVisited', 'true');
      }
      
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (e) {
      console.error("Failed to parse todos from localStorage", e);
      setTodos([]);
    }
    setIsLoading(false);
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

  const reorderTodos = (reorderedTodos: Todo[]) => {
    setTodos(reorderedTodos);
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
    localStorage.setItem('lastBackupDate', new Date().getTime().toString());
    
    // Show success notification instead of alert
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in';
    notification.textContent = '✅ Data berhasil di-backup!';
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 3000);
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
            
            // Show success notification instead of alert
            const notification = document.createElement('div');
            notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in';
            notification.textContent = '✅ Data berhasil diimpor!';
            document.body.appendChild(notification);
            setTimeout(() => {
              notification.remove();
            }, 3000);
          } else {
            // Show error notification
            const notification = document.createElement('div');
            notification.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in';
            notification.textContent = '❌ Format file tidak valid';
            document.body.appendChild(notification);
            setTimeout(() => {
              notification.remove();
            }, 3000);
          }
        } catch (error) {
          // Show error notification
          const notification = document.createElement('div');
          notification.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in';
          notification.textContent = '❌ File tidak dapat dibaca';
          document.body.appendChild(notification);
          setTimeout(() => {
            notification.remove();
          }, 3000);
        }
      };
      reader.readAsText(file);
    }
  };

  // Keyboard shortcuts handlers
  const handleAddTodoShortcut = () => {
    if (addTodoInputRef.current) {
      addTodoInputRef.current.focus();
    }
  };

  const handleSearchShortcut = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleToggleThemeShortcut = () => {
    // This will be handled by the ThemeToggle component
    const themeButton = document.querySelector('[aria-label="Pilih tema"]') as HTMLButtonElement;
    if (themeButton) {
      themeButton.click();
    }
  };

  const handleExportShortcut = () => {
    exportTodos();
  };

  const handleImportShortcut = () => {
    const importButton = document.querySelector('[aria-label="Import data"]') as HTMLButtonElement;
    if (importButton) {
      importButton.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10">
        
        <header className="relative flex justify-center mb-8 sm:mb-12">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl mb-4 shadow-xl"
            >
              <span className="text-4xl">✨</span>
            </motion.div>
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent pb-2 font-poppins"
            >
              TaskFlow
            </motion.h1>
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto"
            >
              Kelola tugas Anda dengan mudah dan efisien
            </motion.p>
          </div>
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
        </header>
        
        <main className="space-y-6">
          {isLoading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-500 dark:text-gray-400">Memuat tugas Anda...</p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="space-y-6"
            >
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <TodoStats todos={todos} />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <AddTodo onAdd={addTodo} ref={addTodoInputRef} />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <TodoControls
                  ref={searchInputRef}
                  filter={filter}
                  searchTerm={searchTerm}
                  onFilterChange={setFilter}
                  onSearchChange={setSearchTerm}
                  onExport={exportTodos}
                  onImport={importTodos}
                />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <TodoList
                  todos={todos}
                  filter={filter}
                  searchTerm={searchTerm}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                  onReorder={reorderTodos}
                />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <DataInfo />
              </motion.div>
            </motion.div>
          )}
        </main>

        <BackupReminder onExport={exportTodos} />
        
        {/* First visit welcome modal */}
        <AnimatePresence>
          {isFirstVisit && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setIsFirstVisit(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="text-5xl mb-4">👋</div>
                  <h2 className="text-2xl font-bold mb-2">Selamat Datang di TaskFlow!</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Kelola tugas Anda dengan mudah dan efisien. Mulai dengan menambahkan tugas baru Anda!
                  </p>
                  <div className="mb-6 text-left bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Pintasan Keyboard:</h3>
                    <ul className="text-sm space-y-1">
                      <li><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">Ctrl + N</kbd> - Tambah tugas baru</li>
                      <li><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">Ctrl + /</kbd> - Pencarian</li>
                      <li><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">Ctrl + T</kbd> - Ganti tema</li>
                      <li><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">Ctrl + ?</kbd> - Bantuan</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => setIsFirstVisit(false)}
                    className="btn-primary w-full"
                  >
                    Mulai Sekarang
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Keyboard shortcuts component */}
        <KeyboardShortcuts
          onAddTodo={handleAddTodoShortcut}
          onToggleTheme={handleToggleThemeShortcut}
          onSearch={handleSearchShortcut}
          onExport={handleExportShortcut}
          onImport={handleImportShortcut}
        />
      </div>
    </div>
  );
}
