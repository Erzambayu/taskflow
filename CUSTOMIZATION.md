# Panduan Kustomisasi Todo App

Dokumentasi ini menjelaskan secara detail bagaimana melakukan penyesuaian pada aplikasi Todo untuk memenuhi kebutuhan spesifik Anda.

## 📋 Daftar Isi

1. [Kustomisasi Tampilan](#kustomisasi-tampilan)
2. [Kustomisasi Warna dan Tema](#kustomisasi-warna-dan-tema)
3. [Kustomisasi Fitur](#kustomisasi-fitur)
4. [Kustomisasi Penyimpanan Data](#kustomisasi-penyimpanan-data)
5. [Kustomisasi Animasi](#kustomisasi-animasi)
6. [Kustomisasi Bahasa](#kustomisasi-bahasa)
7. [Menambah Fitur Baru](#menambah-fitur-baru)

---

## 🎨 Kustomisasi Tampilan

### 1. Mengubah Layout Utama

**File:** `app/page.tsx`

```typescript
// Mengubah lebar maksimum container
<div className="max-w-2xl mx-auto"> // Ganti dengan max-w-4xl untuk lebih lebar

// Mengubah padding dan margin
<main className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
// Ganti py-8 px-4 dengan py-12 px-6 untuk lebih besar
```

### 2. Mengubah Judul Aplikasi

**File:** `app/page.tsx` (baris 58)

```typescript
<h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
  Todo App // Ganti dengan judul yang diinginkan
</h1>
```

**File:** `app/layout.tsx` (baris 8-11)

```typescript
export const metadata: Metadata = {
  title: 'Todo App', // Ganti judul tab browser
  description: 'Aplikasi Todo sederhana dengan Next.js dan Tailwind CSS', // Ganti deskripsi
};
```

### 3. Mengubah Font

**File:** `app/layout.tsx` (baris 4)

```typescript
import { Inter } from 'next/font/google';
// Ganti dengan font lain seperti:
// import { Roboto, Open_Sans, Poppins } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
// Sesuaikan dengan font yang dipilih:
// const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] });
```

---

## 🌈 Kustomisasi Warna dan Tema

### 1. Mengubah Warna Utama

**File:** `tailwind.config.js` (baris 10-13)

```javascript
colors: {
  primary: '#3B82F6', // Biru - ganti dengan warna yang diinginkan
  secondary: '#6B7280', // Abu-abu
  // Tambahkan warna custom:
  success: '#10B981', // Hijau
  warning: '#F59E0B', // Kuning
  danger: '#EF4444',  // Merah
},
```

**Contoh warna alternatif:**
- Purple: `#8B5CF6`
- Green: `#10B981`
- Red: `#EF4444`
- Orange: `#F97316`

### 2. Mengubah Tema Dark Mode

**File:** `app/globals.css` (baris 10-13)

```css
.dark {
  --foreground-rgb: 255, 255, 255; /* Warna teks */
  --background-rgb: 17, 24, 39;    /* Warna background */
}

/* Tambahkan variabel warna custom */
:root {
  --primary-color: #3B82F6;
  --success-color: #10B981;
  --danger-color: #EF4444;
}
```

### 3. Kustomisasi Warna Komponen

**File:** `components/TodoItem.tsx` (baris 15-17)

```typescript
// Mengubah warna background item
className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
// Ganti dengan:
// bg-blue-50 dark:bg-blue-900 untuk tema biru
// bg-green-50 dark:bg-green-900 untuk tema hijau
```

---

## ⚙️ Kustomisasi Fitur

### 1. Mengubah Placeholder Input

**File:** `components/AddTodo.tsx` (baris 26)

```typescript
placeholder="Tambahkan tugas baru..."
// Ganti dengan pesan yang diinginkan:
// "Apa yang ingin Anda lakukan hari ini?"
// "Tulis tugas Anda di sini..."
```

### 2. Mengubah Teks Tombol

**File:** `components/AddTodo.tsx` (baris 31)

```typescript
<button type="submit">
  Tambah // Ganti dengan: "Buat", "Simpan", "+"
</button>
```

**File:** `components/TodoItem.tsx` (baris 30)

```typescript
<button onClick={() => onDelete(todo.id)}>
  Hapus // Ganti dengan: "Delete", "🗑️", "✕"
</button>
```

### 3. Mengubah Label Filter

**File:** `app/page.tsx` (baris 70-72)

```typescript
{f === 'all' ? 'Semua' : f === 'active' ? 'Aktif' : 'Selesai'}
// Ganti dengan:
// {f === 'all' ? 'All' : f === 'active' ? 'Active' : 'Completed'}
// atau emoji:
// {f === 'all' ? '📋 Semua' : f === 'active' ? '⏳ Aktif' : '✅ Selesai'}
```

### 4. Menambah Validasi Input

**File:** `components/AddTodo.tsx` (baris 11-17)

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (text.trim()) {
    // Tambahkan validasi:
    if (text.length < 3) {
      alert('Tugas minimal 3 karakter');
      return;
    }
    if (text.length > 100) {
      alert('Tugas maksimal 100 karakter');
      return;
    }
    onAdd(text.trim());
    setText('');
  }
};
```

---

## 💾 Kustomisasi Penyimpanan Data

### 1. Mengubah Key LocalStorage

**File:** `app/page.tsx` (baris 16 dan 21)

```typescript
// Mengubah nama key penyimpanan
const savedTodos = localStorage.getItem('todos'); // Ganti 'todos' dengan nama lain
localStorage.setItem('todos', JSON.stringify(todos)); // Sesuaikan dengan key di atas
```

### 2. Menambah Penyimpanan Pengaturan

**File:** `app/page.tsx` - tambahkan setelah state todos

```typescript
const [settings, setSettings] = useState({
  autoSave: true,
  showCompleted: true,
  sortBy: 'date' // 'date', 'alphabetical', 'priority'
});

useEffect(() => {
  const savedSettings = localStorage.getItem('todoSettings');
  if (savedSettings) {
    setSettings(JSON.parse(savedSettings));
  }
}, []);

useEffect(() => {
  localStorage.setItem('todoSettings', JSON.stringify(settings));
}, [settings]);
```

### 3. Menambah Export/Import Data

**File:** `app/page.tsx` - tambahkan fungsi baru

```typescript
const exportTodos = () => {
  const dataStr = JSON.stringify(todos, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'todos-backup.json';
  link.click();
};

const importTodos = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedTodos = JSON.parse(e.target?.result as string);
        setTodos(importedTodos);
      } catch (error) {
        alert('File tidak valid');
      }
    };
    reader.readAsText(file);
  }
};
```

---

## 🎭 Kustomisasi Animasi

### 1. Mengubah Durasi Animasi

**File:** `tailwind.config.js` (baris 14-20)

```javascript
animation: {
  'slide-in': 'slide-in 0.3s ease-out', // Ganti 0.3s dengan durasi lain
  'fade-in': 'fade-in 0.5s ease-in-out', // Tambahkan animasi baru
},
keyframes: {
  'slide-in': {
    '0%': { transform: 'translateY(-10px)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
  'fade-in': { // Animasi baru
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
},
```

### 2. Mengubah Animasi Komponen

**File:** `components/TodoItem.tsx` (baris 12-16)

```typescript
<motion.div
  initial={{ opacity: 0, y: -10 }} // Posisi awal
  animate={{ opacity: 1, y: 0 }}   // Posisi akhir
  exit={{ opacity: 0, y: 10 }}     // Animasi keluar
  transition={{ duration: 0.3 }}   // Tambahkan durasi custom
>
```

### 3. Menambah Animasi Hover

**File:** `components/TodoItem.tsx` - tambahkan props motion

```typescript
<motion.div
  whileHover={{ scale: 1.02 }} // Membesar saat hover
  whileTap={{ scale: 0.98 }}   // Mengecil saat diklik
  // ... props lainnya
>
```

---

## 🌍 Kustomisasi Bahasa

### 1. Membuat File Bahasa

**File baru:** `lib/translations.ts`

```typescript
export const translations = {
  id: {
    title: 'Aplikasi Todo',
    addPlaceholder: 'Tambahkan tugas baru...',
    addButton: 'Tambah',
    deleteButton: 'Hapus',
    filters: {
      all: 'Semua',
      active: 'Aktif',
      completed: 'Selesai'
    },
    empty: {
      all: 'Tidak ada tugas',
      active: 'Tidak ada tugas aktif',
      completed: 'Tidak ada tugas selesai'
    }
  },
  en: {
    title: 'Todo App',
    addPlaceholder: 'Add new task...',
    addButton: 'Add',
    deleteButton: 'Delete',
    filters: {
      all: 'All',
      active: 'Active',
      completed: 'Completed'
    },
    empty: {
      all: 'No tasks',
      active: 'No active tasks',
      completed: 'No completed tasks'
    }
  }
};
```

### 2. Menggunakan Terjemahan

**File:** `app/page.tsx` - tambahkan import dan state

```typescript
import { translations } from '@/lib/translations';

export default function Home() {
  const [language, setLanguage] = useState<'id' | 'en'>('id');
  const t = translations[language];
  
  // Gunakan t.title, t.addButton, dll. di komponen
}
```

---

## 🚀 Menambah Fitur Baru

### 1. Menambah Prioritas Todo

**File:** `types/index.ts` - update interface

```typescript
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high'; // Tambahkan ini
  category?: string; // Opsional: kategori
}
```

**File:** `components/TodoItem.tsx` - tambahkan indikator prioritas

```typescript
// Tambahkan setelah checkbox
<span className={`w-3 h-3 rounded-full ${
  todo.priority === 'high' ? 'bg-red-500' :
  todo.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
}`} />
```

### 2. Menambah Pencarian

**File:** `app/page.tsx` - tambahkan state dan fungsi

```typescript
const [searchTerm, setSearchTerm] = useState('');

const filteredTodos = todos.filter((todo) => {
  const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
  if (filter === 'active') return !todo.completed && matchesSearch;
  if (filter === 'completed') return todo.completed && matchesSearch;
  return matchesSearch;
});

// Tambahkan input pencarian di JSX
<input
  type="text"
  placeholder="Cari tugas..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full px-4 py-2 mb-4 rounded-lg border"
/>
```

### 3. Menambah Statistik

**File:** `components/TodoStats.tsx` - komponen baru

```typescript
import { Todo } from '@/types';

interface TodoStatsProps {
  todos: Todo[];
}

export default function TodoStats({ todos }: TodoStatsProps) {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const active = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
        <div className="text-2xl font-bold text-blue-600">{total}</div>
        <div className="text-sm text-gray-600">Total</div>
      </div>
      <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
        <div className="text-2xl font-bold text-yellow-600">{active}</div>
        <div className="text-sm text-gray-600">Aktif</div>
      </div>
      <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
        <div className="text-2xl font-bold text-green-600">{completed}</div>
        <div className="text-sm text-gray-600">Selesai</div>
      </div>
      <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
        <div className="text-2xl font-bold text-purple-600">{completionRate}%</div>
        <div className="text-sm text-gray-600">Progress</div>
      </div>
    </div>
  );
}
```

### 4. Menambah Drag & Drop

**File:** `components/TodoList.tsx` - update dengan DnD

```typescript
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function TodoList({ todos, onReorder, ...props }: TodoListProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-3">
        {filteredTodos.map((todo, index) => (
          <DraggableTodoItem
            key={todo.id}
            todo={todo}
            index={index}
            onMove={onReorder}
            {...props}
          />
        ))}
      </div>
    </DndProvider>
  );
}
```

---

## 📱 Kustomisasi Responsif

### 1. Mengubah Breakpoint

**File:** `tailwind.config.js` - tambahkan custom breakpoint

```javascript
theme: {
  extend: {
    screens: {
      'xs': '475px', // Extra small devices
      '3xl': '1600px', // Extra large devices
    },
  },
},
```

### 2. Layout Mobile-First

**File:** `app/page.tsx` - update className

```typescript
// Dari:
<div className="max-w-2xl mx-auto">

// Ke:
<div className="w-full px-4 sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
```

---

## 🔧 Tips Debugging

### 1. Menambah Console Log

```typescript
// Untuk debug state changes
useEffect(() => {
  console.log('Todos updated:', todos);
}, [todos]);
```

### 2. Error Boundary

**File baru:** `components/ErrorBoundary.tsx`

```typescript
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  render() {
    if ((this.state as any).hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (this.props as any).children;
  }
}

export default ErrorBoundary;
```

---

## 📝 Catatan Penting

1. **Backup Data**: Selalu backup data sebelum melakukan perubahan besar
2. **Testing**: Test setiap perubahan di berbagai ukuran layar
3. **Performance**: Monitor performa aplikasi setelah menambah fitur
4. **Accessibility**: Pastikan aplikasi tetap accessible setelah kustomisasi
5. **Browser Compatibility**: Test di berbagai browser

---

## 🤝 Kontribusi

Jika Anda menambahkan fitur baru yang berguna, pertimbangkan untuk:
1. Dokumentasikan perubahan
2. Tambahkan unit test jika memungkinkan
3. Update README.md
4. Share dengan komunitas

---

*Dokumentasi ini akan terus diperbarui seiring dengan pengembangan aplikasi.* 