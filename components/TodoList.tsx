import { useState, useEffect } from 'react';
import { DndProvider, useDragDropManager } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Todo, TodoFilter } from '@/types';
import DraggableTodoItem from './DraggableTodoItem';
import { motion } from 'framer-motion';

interface TodoListProps {
  todos: Todo[];
  filter: TodoFilter;
  searchTerm?: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onReorder: (todos: Todo[]) => void;
}

const listVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function TodoListContent({
  todos,
  filter,
  searchTerm = '',
  onToggle,
  onDelete,
  onEdit,
  onReorder
}: TodoListProps) {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  // Update filtered todos when todos, filter, or searchTerm changes
  useEffect(() => {
    const filtered = todos.filter((todo) => {
      const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
      if (filter === 'active') return !todo.completed && matchesSearch;
      if (filter === 'completed') return todo.completed && matchesSearch;
      return matchesSearch;
    });
    setFilteredTodos(filtered);
  }, [todos, filter, searchTerm]);

  const moveTodo = (dragIndex: number, hoverIndex: number) => {
    const draggedTodo = filteredTodos[dragIndex];
    const newTodos = [...filteredTodos];
    newTodos.splice(dragIndex, 1);
    newTodos.splice(hoverIndex, 0, draggedTodo);
    setFilteredTodos(newTodos);
    
    // Update the original todos array to maintain the new order
    const updatedTodos = [...todos];
    const originalDragIndex = todos.findIndex(t => t.id === draggedTodo.id);
    const originalHoverIndex = todos.findIndex(t => t.id === newTodos[hoverIndex].id);
    
    if (originalDragIndex !== -1 && originalHoverIndex !== -1) {
      const [removed] = updatedTodos.splice(originalDragIndex, 1);
      updatedTodos.splice(originalHoverIndex, 0, removed);
      onReorder(updatedTodos);
    }
  };

  const getEmptyStateContent = () => {
    if (searchTerm) {
      return {
        icon: '🔍',
        title: 'Tidak ada hasil pencarian',
        description: `Tidak ada tugas yang cocok dengan "${searchTerm}". Coba kata kunci lain.`
      };
    }
    
    switch (filter) {
      case 'active':
        return {
          icon: '✅',
          title: 'Tidak ada tugas aktif',
          description: 'Semua tugas Anda sudah selesai. Tambahkan tugas baru atau lihat tugas yang sudah selesai.'
        };
      case 'completed':
        return {
          icon: '🎉',
          title: 'Semua tugas selesai!',
          description: 'Kerja bagus! Saatnya istirahat atau tambahkan tugas baru.'
        };
      default:
        return {
          icon: '📝',
          title: 'Daftar tugas kosong',
          description: 'Mulai produktivitas Anda dengan menambahkan tugas baru di atas.'
        };
    }
  };

  const emptyState = getEmptyStateContent();

  return (
    <motion.div
      key={filter + searchTerm} // Re-trigger animation when filter or search changes
      variants={listVariant}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {filteredTodos.length > 0 ? (
        <div className="grid gap-4">
          {filteredTodos.map((todo, index) => (
            <motion.div key={todo.id} variants={itemVariant}>
              <DraggableTodoItem
                todo={todo}
                index={index}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
                moveTodo={moveTodo}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8 text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse" as const
            }}
            className="text-6xl mb-4 inline-block"
          >
            {emptyState.icon}
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            {emptyState.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            {emptyState.description}
          </p>
          
          {!searchTerm && filter === 'all' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-full">
                <span>💡</span>
                <span>Tekan Enter di input di atas untuk menambah tugas dengan cepat</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function TodoList(props: TodoListProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <TodoListContent {...props} />
    </DndProvider>
  );
}
