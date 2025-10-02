import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface KeyboardShortcutsProps {
  onAddTodo: () => void;
  onToggleTheme: () => void;
  onSearch: () => void;
  onExport: () => void;
  onImport: () => void;
}

export default function KeyboardShortcuts({ 
  onAddTodo, 
  onToggleTheme, 
  onSearch, 
  onExport, 
  onImport 
}: KeyboardShortcutsProps) {
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when user is typing in an input
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') {
        return;
      }

      // Toggle help modal
      if (e.key === '?' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setShowHelp(!showHelp);
        return;
      }

      // Add new todo
      if (e.key === 'n' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        onAddTodo();
        return;
      }

      // Toggle theme
      if (e.key === 't' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        onToggleTheme();
        return;
      }

      // Focus search
      if (e.key === '/' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        onSearch();
        return;
      }

      // Export data
      if (e.key === 'e' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        onExport();
        return;
      }

      // Import data
      if (e.key === 'i' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        onImport();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showHelp, onAddTodo, onToggleTheme, onSearch, onExport, onImport]);

  const shortcuts = [
    { key: 'Ctrl + N', description: 'Tambah tugas baru' },
    { key: 'Ctrl + T', description: 'Ganti tema' },
    { key: 'Ctrl + /', description: 'Fokus pencarian' },
    { key: 'Ctrl + E', description: 'Export data' },
    { key: 'Ctrl + I', description: 'Import data' },
    { key: 'Ctrl + ?', description: 'Tampilkan bantuan' },
  ];

  return (
    <AnimatePresence>
      {showHelp && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowHelp(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pintasan Keyboard</h2>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Tutup"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              {shortcuts.map((shortcut, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">{shortcut.description}</span>
                  <kbd className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-sm font-mono">
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowHelp(false)}
                className="btn-primary"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}