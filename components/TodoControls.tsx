'use client';

import { useState, useRef, forwardRef } from 'react';
import { TodoFilter } from '@/types';
import { motion } from 'framer-motion';

interface TodoControlsProps {
  filter: TodoFilter;
  searchTerm: string;
  onFilterChange: (filter: TodoFilter) => void;
  onSearchChange: (term: string) => void;
  onExport: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default forwardRef<HTMLInputElement, TodoControlsProps>(function TodoControls({
  filter,
  searchTerm,
  onFilterChange,
  onSearchChange,
  onExport,
  onImport,
}: TodoControlsProps, ref) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const filterButtons: { value: TodoFilter; label: string; icon: string }[] = [
    { value: 'all', label: 'Semua', icon: '📋' },
    { value: 'active', label: 'Aktif', icon: '⏳' },
    { value: 'completed', label: 'Selesai', icon: '✅' },
  ];

  const handleClearSearch = () => {
    onSearchChange('');
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="card p-4 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
          <input
            ref={ref}
            type="text"
            placeholder="Cari tugas..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="input pl-10 pr-10"
            aria-label="Cari tugas"
          />
          {searchTerm && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Hapus pencarian"
            >
              ✕
            </motion.button>
          )}
        </div>
        <div className="flex items-center justify-end gap-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onExport}
            className="btn-secondary flex items-center gap-2 text-sm"
            aria-label="Export data"
          >
            <span>📥</span>
            <span className="hidden sm:inline">Export</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={triggerFileInput}
            className="btn-primary flex items-center gap-2 text-sm"
            aria-label="Import data"
          >
            <span>📤</span>
            <span className="hidden sm:inline">Import</span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={onImport}
              className="hidden"
              aria-hidden="true"
            />
          </motion.button>
        </div>
      </div>
      
      <div className="flex gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
        {filterButtons.map((f) => (
          <motion.button
            key={f.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onFilterChange(f.value)}
            className={`flex-1 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm flex items-center justify-center gap-2 ${
              filter === f.value
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow'
                : 'text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-600'
            }`}
            aria-label={`Tampilkan tugas ${f.label}`}
            aria-pressed={filter === f.value}
          >
            <span>{f.icon}</span>
            <span>{f.label}</span>
          </motion.button>
        ))}
      </div>
      
      {searchTerm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2"
        >
          <span>🔍</span>
          <span>Menampilkan hasil untuk: "{searchTerm}"</span>
        </motion.div>
      )}
    </div>
  );
});