import { motion } from 'framer-motion';

export default function DataInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="mt-6 sm:mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-200 dark:border-blue-800"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-800/50 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-lg sm:text-xl">💡</span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 text-sm sm:text-base mb-2">
            Informasi Penyimpanan Data
          </h3>
          <div className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 space-y-2">
            <p>
              📱 <strong>Data Tersimpan Lokal:</strong> Semua tugas Anda disimpan di browser (localStorage) dan tidak akan hilang saat refresh halaman.
            </p>
            <p>
              💾 <strong>Backup Berkala:</strong> Gunakan fitur Export untuk backup data Anda secara berkala. Data akan hilang jika browser cache dibersihkan.
            </p>
            <p>
              🔄 <strong>Sinkronisasi:</strong> Data tidak tersinkronisasi antar perangkat. Export dari satu perangkat dan Import ke perangkat lain untuk transfer data.
            </p>
            <p>
              ⚠️ <strong>Penting:</strong> Selalu backup data Anda sebelum mengganti browser atau membersihkan cache!
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 