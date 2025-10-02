import { useState, useRef, useEffect, forwardRef } from 'react';
import { motion } from 'framer-motion';

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export default forwardRef<HTMLInputElement, AddTodoProps>(function AddTodo({ onAdd }: AddTodoProps, ref) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [charCount, setCharCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus on input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Expose the input ref to the parent component
  useEffect(() => {
    if (ref && typeof ref === 'function') {
      ref(inputRef.current);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLInputElement | null>).current = inputRef.current;
    }
  }, [ref]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 3) {
      setError('Tugas harus lebih dari 3 karakter.');
      return;
    }
    if (text.trim().length > 100) {
      setError('Tugas tidak boleh lebih dari 100 karakter.');
      return;
    }
    onAdd(text.trim());
    setText('');
    setError('');
    setCharCount(0);
    
    // Re-focus on input after submission
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    setCharCount(value.length);
    
    if (error) setError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Submit on Enter without Shift
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card p-1"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="flex-grow relative">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="✨ Tambah tugas baru..."
            className="input pr-12"
            aria-label="Tambah tugas baru"
            aria-invalid={!!error}
            aria-describedby={error ? "todo-error" : undefined}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 dark:text-gray-400">
            {charCount}/100
          </div>
          {error && (
            <motion.p
              id="todo-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1 ml-2"
            >
              {error}
            </motion.p>
          )}
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!text.trim() || !!error}
          aria-label="Tambah tugas"
        >
          <span>Tambah</span>
          <span className="text-lg">+</span>
        </motion.button>
      </form>
      
      <div className="mt-3 flex flex-wrap gap-2 px-2">
        <span className="text-xs text-gray-500 dark:text-gray-400">Tips:</span>
        <div className="flex gap-2">
          <kbd className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">Enter</kbd>
          <span className="text-xs text-gray-500 dark:text-gray-400">untuk menambah</span>
        </div>
      </div>
    </motion.div>
  );
});
