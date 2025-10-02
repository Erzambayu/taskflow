import { motion } from 'framer-motion';

export default function DataInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="mt-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200 dark:border-blue-800 text-sm text-blue-800 dark:text-blue-200 card"
    >
      <div className="flex items-start gap-4">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse" as const
          }}
          className="text-2xl flex-shrink-0"
        >
          💡
        </motion.div>
        <div className="space-y-2">
          <h3 className="font-bold text-blue-900 dark:text-blue-100 text-base">Informasi Penyimpanan Data</h3>
          <div className="space-y-1.5">
            <p className="flex items-start gap-2">
              <span className="text-blue-500 dark:text-blue-400">•</span>
              <span><strong className="text-blue-900 dark:text-blue-100">Data Tersimpan Lokal:</strong> Semua tugas Anda disimpan di browser dan tidak akan hilang saat refresh.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-blue-500 dark:text-blue-400">•</span>
              <span><strong className="text-blue-900 dark:text-blue-100">Penting:</strong> Selalu gunakan fitur <strong className="text-blue-900 dark:text-blue-100">Export</strong> untuk backup data Anda secara berkala sebelum membersihkan cache browser.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-blue-500 dark:text-blue-400">•</span>
              <span><strong className="text-blue-900 dark:text-blue-100">Privasi:</strong> Data Anda tidak pernah meninggalkan perangkat Anda dan tidak dikirim ke server mana pun.</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
