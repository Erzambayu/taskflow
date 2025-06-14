import { motion } from 'framer-motion';
import { Todo } from '@/types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      whileHover={{ scale: 1.01, y: -2 }}
      className={`group relative bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border transition-all duration-200 ${
        todo.completed 
          ? 'border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20' 
          : 'border-gray-200 dark:border-slate-700 hover:border-blue-500/30 dark:hover:border-blue-400/30 hover:shadow-xl'
      }`}
    >
      {/* Status indicator */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl sm:rounded-l-2xl ${
        todo.completed ? 'bg-gradient-to-b from-green-400 to-emerald-600' : 'bg-gradient-to-b from-blue-500 to-purple-600'
      }`}></div>
      
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Custom Checkbox */}
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggle(todo.id)}
          className={`relative w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 cursor-pointer transition-all duration-200 ${
            todo.completed
              ? 'bg-gradient-to-r from-green-400 to-emerald-600 border-green-500'
              : 'border-gray-300 dark:border-slate-500 hover:border-blue-500 dark:hover:border-blue-400'
          }`}
        >
          {todo.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 flex items-center justify-center text-white text-xs sm:text-sm"
            >
              ✓
            </motion.div>
          )}
        </motion.div>

        {/* Task Text */}
        <input
          type="text"
          value={todo.text}
          onChange={(e) => onEdit(todo.id, e.target.value)}
          className={`flex-1 bg-transparent border-none focus:outline-none text-base sm:text-lg font-medium transition-all duration-200 ${
            todo.completed 
              ? 'line-through text-gray-500 dark:text-gray-400' 
              : 'text-gray-900 dark:text-white focus:text-blue-600 dark:focus:text-blue-400'
          }`}
        />

        {/* Action Buttons */}
        <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(todo.id)}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors duration-200 flex items-center justify-center text-sm sm:text-base"
            title="Hapus tugas"
          >
            🗑️
          </motion.button>
        </div>
      </div>

      {/* Task metadata */}
      <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 text-xs text-gray-500 dark:text-gray-400">
        <span>Dibuat: {new Date(todo.createdAt).toLocaleDateString('id-ID')}</span>
        {todo.completed && (
          <span className="px-2 py-1 bg-green-100 dark:bg-green-800/50 text-green-700 dark:text-green-300 rounded-full self-start sm:self-auto">
            ✅ Selesai
          </span>
        )}
      </div>
    </motion.div>
  );
} 