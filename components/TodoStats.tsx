import { Todo } from '@/types';
import { motion } from 'framer-motion';

interface TodoStatsProps {
  todos: Todo[];
}

export default function TodoStats({ todos }: TodoStatsProps) {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const active = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, staggerChildren: 0.1 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8"
    >
      <motion.div 
        whileHover={{ scale: 1.05, y: -5 }}
        className="relative overflow-hidden bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-slate-700 transition-colors duration-300"
      >
        <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-bl-full opacity-10"></div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">{total}</div>
            <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">Total Tugas</div>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg sm:rounded-xl flex items-center justify-center">
            <span className="text-lg sm:text-xl">📋</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.05, y: -5 }}
        className="relative overflow-hidden bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-slate-700 transition-colors duration-300"
      >
        <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-bl-full opacity-10"></div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400">{active}</div>
            <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">Sedang Aktif</div>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 dark:bg-orange-900/50 rounded-lg sm:rounded-xl flex items-center justify-center">
            <span className="text-lg sm:text-xl">⏳</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.05, y: -5 }}
        className="relative overflow-hidden bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-slate-700 transition-colors duration-300"
      >
        <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-bl-full opacity-10"></div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">{completed}</div>
            <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">Selesai</div>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900/50 rounded-lg sm:rounded-xl flex items-center justify-center">
            <span className="text-lg sm:text-xl">✅</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.05, y: -5 }}
        className="relative overflow-hidden bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-slate-700 transition-colors duration-300"
      >
        <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-400 to-pink-600 rounded-bl-full opacity-10"></div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">{completionRate}%</div>
            <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">Progress</div>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg sm:rounded-xl flex items-center justify-center">
            <span className="text-lg sm:text-xl">📊</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-3 sm:mt-4 w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </motion.div>
    </motion.div>
  );
}