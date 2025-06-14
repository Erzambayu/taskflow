import { useState } from 'react';
import { motion } from 'framer-motion';

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      // Validasi panjang karakter
      if (text.length < 3) {
        alert('Tugas minimal 3 karakter');
        return;
      }
      if (text.length > 100) {
        alert('Tugas maksimal 100 karakter');
        return;
      }
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-slate-700 mb-6 sm:mb-8 transition-colors duration-300"
    >
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="✨ Apa yang ingin Anda lakukan hari ini?"
            className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-600 transition-all duration-200 text-base sm:text-lg"
          />
          <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
            <span className="text-xs sm:text-sm">{text.length}/100</span>
          </div>
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <span>➕</span>
          Tambah
        </motion.button>
      </form>
    </motion.div>
  );
} 