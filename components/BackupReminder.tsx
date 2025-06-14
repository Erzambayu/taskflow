import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BackupReminderProps {
  onExport: () => void;
}

export default function BackupReminder({ onExport }: BackupReminderProps) {
  const [showReminder, setShowReminder] = useState(false);

  useEffect(() => {
    // Cek apakah sudah pernah backup dalam 7 hari terakhir
    const lastBackup = localStorage.getItem('lastBackupDate');
    const now = new Date().getTime();
    const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);

    if (!lastBackup || parseInt(lastBackup) < sevenDaysAgo) {
      // Tampilkan reminder setelah 3 detik
      const timer = setTimeout(() => {
        setShowReminder(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleBackupNow = () => {
    onExport();
    localStorage.setItem('lastBackupDate', new Date().getTime().toString());
    setShowReminder(false);
  };

  const handleRemindLater = () => {
    setShowReminder(false);
    // Ingatkan lagi dalam 1 hari
    const tomorrow = new Date().getTime() + (24 * 60 * 60 * 1000);
    localStorage.setItem('nextReminderDate', tomorrow.toString());
  };

  const handleDismiss = () => {
    setShowReminder(false);
    localStorage.setItem('lastBackupDate', new Date().getTime().toString());
  };

  return (
    <AnimatePresence>
      {showReminder && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className="fixed bottom-4 right-4 z-50 max-w-sm"
        >
          <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl border border-gray-200 dark:border-slate-700">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-lg sm:text-xl">💾</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base mb-1">
                  Backup Data Anda!
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
                  Sudah lebih dari 7 hari sejak backup terakhir. Jangan sampai data tugas Anda hilang!
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={handleBackupNow}
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-xs sm:text-sm hover:shadow-lg transition-all duration-200"
                  >
                    📥 Backup Sekarang
                  </button>
                  <button
                    onClick={handleRemindLater}
                    className="flex-1 px-3 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium text-xs sm:text-sm hover:bg-gray-200 dark:hover:bg-slate-600 transition-all duration-200"
                  >
                    ⏰ Ingatkan Besok
                  </button>
                </div>
                <button
                  onClick={handleDismiss}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200 flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 