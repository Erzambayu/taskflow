import { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { motion } from 'framer-motion';
import { Todo } from '@/types';

interface DraggableTodoItemProps {
  todo: Todo;
  index: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  moveTodo: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export default function DraggableTodoItem({
  todo,
  index,
  onToggle,
  onDelete,
  onEdit,
  moveTodo,
}: DraggableTodoItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ isDragging }, drag] = useDrag({
    type: 'todo',
    item: { type: 'todo', id: todo.id, index } as DragItem,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'todo',
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      
      if (dragIndex === hoverIndex) {
        return;
      }
      
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset?.y || 0) - hoverBoundingRect.top;
      
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      
      moveTodo(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  const formatDate = (date: Date) => {
    const now = new Date();
    const todoDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - todoDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Hari ini';
    } else if (diffDays === 1) {
      return 'Kemarin';
    } else if (diffDays < 7) {
      return `${diffDays} hari yang lalu`;
    } else {
      return todoDate.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
    }
  };

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleSave = () => {
    if (text.trim() && text.trim().length >= 3) {
      onEdit(todo.id, text.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className={`group relative card p-4 transition-all duration-300 ${ 
        todo.completed 
          ? 'opacity-80' 
          : 'hover:shadow-lg hover:scale-[1.01]'
      } ${isDragging ? 'opacity-50 shadow-xl' : ''}`}
      style={{ cursor: 'move' }}
    >
      <div className="flex items-start gap-4">
        <div className="flex items-center gap-2 mt-1">
          <div className="text-gray-400 dark:text-gray-500 cursor-move">
            ⋮⋮
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer flex-shrink-0"
            onClick={() => onToggle(todo.id)}
            aria-label={todo.completed ? "Tandai sebagai belum selesai" : "Tandai sebagai selesai"}
          >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${ 
              todo.completed 
                ? 'bg-green-500 border-green-600' 
                : 'border-gray-300 dark:border-gray-600 group-hover:border-blue-500'
            }`}>
              {todo.completed && (
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  className="w-3 h-3 bg-white rounded-full"
                />
              )}
            </div>
          </motion.button>
        </div>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Edit tugas"
            />
          ) : (
            <div>
              <p className={`break-words ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>
                {todo.text}
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span>📅</span>
                <span>{formatDate(todo.createdAt)}</span>
                {todo.completed && (
                  <>
                    <span>•</span>
                    <span className="text-green-500 dark:text-green-400">Selesai</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {!isEditing && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
              aria-label="Edit tugas"
            >
              ✏️
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(todo.id)}
            className="p-2 rounded-lg hover:bg-red-200 dark:hover:bg-red-800/50 text-red-500"
            aria-label="Hapus tugas"
          >
            🗑️
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}