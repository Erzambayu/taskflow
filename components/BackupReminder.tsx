import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BackupReminderProps {
  onExport: () => void;
}

export default function BackupReminder({ onExport }: BackupReminderProps) {
  const [showReminder, setShowReminder] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the reminder recently
    const dismissedUntil = localStorage.getItem('backupReminderDismissedUntil');
    if (dismissedUntil && Date.now() < parseInt(dismissedUntil)) {
      return;
    }

    const lastBackup = localStorage.getItem('lastBackupDate');
    if (lastBackup) {
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - parseInt(lastBackup) < sevenDays) {
        return;
      }
    }
    
    const timer = setTimeout(() => setShowReminder(true), 10000); // Show after 10 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleBackupNow = () => {
    onExport();
    setShowReminder(false);
  };

  const handleDismiss = () => {
    setShowReminder(false);
    // Dismiss for 3 days
    const dismissUntil = Date.now() + (3 * 24 * 60 * 60 * 1000);
    localStorage.setItem('backupReminderDismissedUntil', dismissUntil.toString());
  };

  const getLastBackupDate = () => {
    const lastBackup = localStorage.getItem('lastBackupDate');
    if (!lastBackup) return 'belum pernah';
    
    const backupDate = new Date(parseInt(lastBackup));
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - backupDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'hari ini';
    } else if (diffDays === 1) {
      return 'kemarin';
    } else if (diffDays < 7) {
      return `${diffDays} hari yang lalu`;
    } else {
      return backupDate.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
  };

  return (
    <AnimatePresence>
      {showReminder && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", damping: 25 }}
          className="fixed bottom-5 right-5 z-50 max-w-sm"
        >
          <div className="glass p-5 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" as const }}
                className="text-3xl flex-shrink-0"
              >
                💾
              </motion.div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                  Waktu Backup Data!
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 mb-4">
                  Backup terakhir Anda: <span className="font-medium">{getLastBackupDate()}</span>.
                  Amankan data tugas Anda sekarang juga.
                </p>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleBackupNow}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg text-sm font-medium transition-all shadow-md"
                  >
                    Backup Sekarang
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleDismiss}
                    className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium transition-all"
                  >
                    Ingatkan Nanti
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
