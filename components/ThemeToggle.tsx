import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Theme = 'light' | 'dark' | 'system';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');
  const [isDark, setIsDark] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme || 'system';
    setTheme(storedTheme);
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = storedTheme === 'system' ? prefersDark : storedTheme === 'dark';
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = (newTheme?: Theme) => {
    const selectedTheme = newTheme || (theme === 'light' ? 'dark' : 'light');
    setTheme(selectedTheme);
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = selectedTheme === 'system' ? prefersDark : selectedTheme === 'dark';
    
    setIsDark(shouldBeDark);
    localStorage.setItem('theme', selectedTheme);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    setShowMenu(false);
  };

  const getThemeIcon = () => {
    if (theme === 'system') {
      return isDark ? '🌙' : '☀️';
    }
    return isDark ? '🌙' : '☀️';
  };

  const getThemeLabel = () => {
    if (theme === 'system') {
      return `Sistem (${isDark ? 'Gelap' : 'Terang'})`;
    }
    return isDark ? 'Gelap' : 'Terang';
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowMenu(!showMenu)}
        className="w-12 h-12 rounded-full glass flex items-center justify-center text-xl shadow-custom hover:shadow-custom-lg transition-all duration-300"
        aria-label="Pilih tema"
        aria-expanded={showMenu}
      >
        <motion.div
          key={getThemeIcon()}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 180, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-8 h-8 flex items-center justify-center"
        >
          {getThemeIcon()}
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 rounded-xl glass shadow-custom-lg overflow-hidden z-10"
          >
            <div className="py-1">
              <button
                onClick={() => toggleTheme('light')}
                className={`w-full text-left px-4 py-2 flex items-center gap-3 transition-colors ${
                  theme === 'light' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-lg">☀️</span>
                <span>Terang</span>
              </button>
              <button
                onClick={() => toggleTheme('dark')}
                className={`w-full text-left px-4 py-2 flex items-center gap-3 transition-colors ${
                  theme === 'dark' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-lg">🌙</span>
                <span>Gelap</span>
              </button>
              <button
                onClick={() => toggleTheme('system')}
                className={`w-full text-left px-4 py-2 flex items-center gap-3 transition-colors ${
                  theme === 'system' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-lg">🖥️</span>
                <span>Sistem</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
        {getThemeLabel()}
      </div>
    </div>
  );
}