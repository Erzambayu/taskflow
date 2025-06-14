import { Todo, TodoFilter } from '@/types';
import TodoItem from './TodoItem';
import { motion } from 'framer-motion';

interface TodoListProps {
  todos: Todo[];
  filter: TodoFilter;
  searchTerm?: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export default function TodoList({ todos, filter, searchTerm = '', onToggle, onDelete, onEdit }: TodoListProps) {
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'active') return !todo.completed && matchesSearch;
    if (filter === 'completed') return todo.completed && matchesSearch;
    return matchesSearch;
  });

  return (
    <div className="space-y-3 sm:space-y-4">
      {filteredTodos.map((todo, index) => (
        <motion.div
          key={todo.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <TodoItem
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </motion.div>
      ))}
      {filteredTodos.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 sm:py-16 px-4"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center">
            <span className="text-3xl sm:text-4xl">
              {filter === 'completed' ? '🎉' : filter === 'active' ? '📝' : '📋'}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
            {filter === 'completed' ? 'Belum ada tugas yang selesai' : 
             filter === 'active' ? 'Tidak ada tugas aktif' : 
             'Belum ada tugas'}
          </h3>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            {filter === 'completed' ? 'Selesaikan beberapa tugas untuk melihatnya di sini' :
             filter === 'active' ? 'Semua tugas sudah selesai! 🎉' :
             'Mulai dengan menambahkan tugas pertama Anda'}
          </p>
        </motion.div>
      )}
    </div>
  );
} 