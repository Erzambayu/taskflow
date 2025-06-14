# 📚 Dokumentasi Lengkap Kustomisasi Todo App

Panduan komprehensif untuk melakukan penyesuaian pada aplikasi Todo dengan penjelasan detail lokasi file dan cara implementasinya.

## 📋 Struktur Proyek

```
todo-app/
├── app/
│   ├── layout.tsx          # Layout utama aplikasi
│   ├── page.tsx           # Halaman utama
│   └── globals.css        # CSS global
├── components/
│   ├── AddTodo.tsx        # Komponen input todo baru
│   ├── TodoItem.tsx       # Komponen item todo individual
│   ├── TodoList.tsx       # Komponen daftar todo
│   └── ThemeToggle.tsx    # Komponen toggle tema
├── types/
│   └── index.ts           # Definisi tipe TypeScript
├── package.json           # Dependensi dan script
├── tailwind.config.js     # Konfigurasi Tailwind CSS
└── tsconfig.json          # Konfigurasi TypeScript
```

---

## 🎨 KUSTOMISASI TAMPILAN

### 1. Mengubah Judul dan Metadata

**📁 File: `app/layout.tsx`**
- **Baris 8-11**: Metadata aplikasi
```typescript
export const metadata: Metadata = {
  title: 'Todo App',                    // ← Ubah judul tab browser
  description: 'Aplikasi Todo sederhana', // ← Ubah deskripsi
};
```

**📁 File: `app/page.tsx`**
- **Baris 54**: Judul utama aplikasi
```typescript
<h1 className="text-3xl font-bold text-center mb-8">
  Todo App  // ← Ubah judul yang tampil di halaman
</h1>
```

### 2. Mengubah Font

**📁 File: `app/layout.tsx`**
- **Baris 2**: Import font
```typescript
import { Inter } from 'next/font/google';
// Ganti dengan font lain:
// import { Roboto, Poppins, Open_Sans } from 'next/font/google';
```

- **Baris 4**: Konfigurasi font
```typescript
const inter = Inter({ subsets: ['latin'] });
// Sesuaikan dengan font yang dipilih:
// const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] });
```

### 3. Mengubah Layout dan Ukuran

**📁 File: `app/page.tsx`**
- **Baris 51**: Container utama
```typescript
<div className="max-w-2xl mx-auto">
// Opsi ukuran:
// max-w-sm    (384px)  - Sangat kecil
// max-w-md    (448px)  - Kecil
// max-w-lg    (512px)  - Sedang kecil
// max-w-xl    (576px)  - Sedang
// max-w-2xl   (672px)  - Sedang besar (default)
// max-w-4xl   (896px)  - Besar
// max-w-6xl   (1152px) - Sangat besar
```

- **Baris 50**: Padding dan margin halaman
```typescript
<main className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
// py-8 = padding vertical 32px
// px-4 = padding horizontal 16px
// Ubah sesuai kebutuhan: py-4, py-12, px-2, px-8, dll.
```

---

## 🌈 KUSTOMISASI WARNA DAN TEMA

### 1. Warna Utama (Primary Color)

**📁 File: `tailwind.config.js`**
- **Baris 10-13**: Definisi warna custom
```javascript
colors: {
  primary: '#3B82F6',    // Biru (default)
  secondary: '#6B7280',  // Abu-abu
},
```

**Pilihan warna populer:**
```javascript
// Merah
primary: '#EF4444',
// Hijau
primary: '#10B981',
// Ungu
primary: '#8B5CF6',
// Orange
primary: '#F97316',
// Pink
primary: '#EC4899',
// Indigo
primary: '#6366F1',
```

### 2. Tema Dark Mode

**📁 File: `app/globals.css`**
- **Baris 5-8**: Warna tema terang
```css
:root {
  --foreground-rgb: 0, 0, 0;        /* Warna teks terang */
  --background-rgb: 243, 244, 246;  /* Warna background terang */
}
```

- **Baris 10-13**: Warna tema gelap
```css
.dark {
  --foreground-rgb: 255, 255, 255;  /* Warna teks gelap */
  --background-rgb: 17, 24, 39;     /* Warna background gelap */
}
```

### 3. Warna Background Komponen

**📁 File: `components/TodoItem.tsx`**
- **Baris 15**: Background item todo
```typescript
className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
// Opsi warna background:
// bg-blue-50 dark:bg-blue-900    - Biru muda
// bg-green-50 dark:bg-green-900  - Hijau muda
// bg-purple-50 dark:bg-purple-900 - Ungu muda
// bg-yellow-50 dark:bg-yellow-900 - Kuning muda
```

**📁 File: `components/AddTodo.tsx`**
- **Baris 25**: Background input
```typescript
className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
```

---

## ⚙️ KUSTOMISASI FITUR DAN TEKS

### 1. Placeholder dan Label

**📁 File: `components/AddTodo.tsx`**
- **Baris 24**: Placeholder input
```typescript
placeholder="Tambahkan tugas baru..."
// Alternatif:
// "Apa yang ingin Anda lakukan hari ini?"
// "Tulis tugas Anda di sini..."
// "What's on your mind?"
```

- **Baris 29**: Teks tombol tambah
```typescript
Tambah
// Alternatif:
// "Buat"
// "Simpan"
// "Add"
// "Create"
// "+"
```

### 2. Teks Tombol dan Aksi

**📁 File: `components/TodoItem.tsx`**
- **Baris 28**: Tombol hapus
```typescript
Hapus
// Alternatif:
// "Delete"
// "Remove"
// "🗑️"
// "✕"
// "❌"
```

### 3. Label Filter

**📁 File: `app/page.tsx`**
- **Baris 68-70**: Label filter
```typescript
{f === 'all' ? 'Semua' : f === 'active' ? 'Aktif' : 'Selesai'}
// Versi Inggris:
// {f === 'all' ? 'All' : f === 'active' ? 'Active' : 'Completed'}
// Dengan emoji:
// {f === 'all' ? '📋 Semua' : f === 'active' ? '⏳ Aktif' : '✅ Selesai'}
```

### 4. Pesan Kosong

**📁 File: `components/TodoList.tsx`**
- **Baris 20-22**: Pesan ketika tidak ada todo
```typescript
Tidak ada tugas yang {filter === 'all' ? '' : filter === 'active' ? 'aktif' : 'selesai'}
// Alternatif:
// "Belum ada tugas"
// "Daftar kosong"
// "No tasks found"
```

---

## 💾 KUSTOMISASI PENYIMPANAN DATA

### 1. Nama Key LocalStorage

**📁 File: `app/page.tsx`**
- **Baris 15**: Membaca data
```typescript
const savedTodos = localStorage.getItem('todos');
// Ganti 'todos' dengan nama lain:
// 'myTodos', 'taskList', 'userTasks', dll.
```

- **Baris 20**: Menyimpan data
```typescript
localStorage.setItem('todos', JSON.stringify(todos));
// Pastikan nama key sama dengan yang di atas
```

### 2. Menambah Validasi Input

**📁 File: `components/AddTodo.tsx`**
- **Baris 11-17**: Fungsi submit dengan validasi
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (text.trim()) {
    // Tambahkan validasi di sini:
    if (text.length < 3) {
      alert('Tugas minimal 3 karakter');
      return;
    }
    if (text.length > 100) {
      alert('Tugas maksimal 100 karakter');
      return;
    }
    // Cek duplikasi
    if (todos.some(todo => todo.text.toLowerCase() === text.toLowerCase())) {
      alert('Tugas sudah ada');
      return;
    }
    onAdd(text.trim());
    setText('');
  }
};
```

---

## 🎭 KUSTOMISASI ANIMASI

### 1. Durasi dan Jenis Animasi

**📁 File: `tailwind.config.js`**
- **Baris 14-20**: Konfigurasi animasi
```javascript
animation: {
  'slide-in': 'slide-in 0.3s ease-out',  // Durasi 0.3 detik
  // Tambahkan animasi baru:
  'fade-in': 'fade-in 0.5s ease-in-out',
  'bounce-in': 'bounce-in 0.4s ease-out',
},
keyframes: {
  'slide-in': {
    '0%': { transform: 'translateY(-10px)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
  // Animasi fade
  'fade-in': {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  // Animasi bounce
  'bounce-in': {
    '0%': { transform: 'scale(0.3)', opacity: '0' },
    '50%': { transform: 'scale(1.05)' },
    '70%': { transform: 'scale(0.9)' },
    '100%': { transform: 'scale(1)', opacity: '1' },
  },
},
```

### 2. Animasi Komponen

**📁 File: `components/TodoItem.tsx`**
- **Baris 12-16**: Animasi item todo
```typescript
<motion.div
  initial={{ opacity: 0, y: -10 }}    // Posisi awal
  animate={{ opacity: 1, y: 0 }}      // Posisi akhir
  exit={{ opacity: 0, y: 10 }}        // Animasi keluar
  transition={{ duration: 0.3 }}      // Durasi animasi
  whileHover={{ scale: 1.02 }}        // Efek hover
  whileTap={{ scale: 0.98 }}          // Efek klik
>
```

**📁 File: `components/AddTodo.tsx`**
- **Baris 19-22**: Animasi form input
```typescript
<motion.form
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}  // Delay animasi
>
```

### 3. Animasi Theme Toggle

**📁 File: `components/ThemeToggle.tsx`**
- **Baris 22-26**: Animasi tombol tema
```typescript
<motion.button
  whileTap={{ scale: 0.95 }}          // Mengecil saat diklik
  whileHover={{ scale: 1.1 }}         // Membesar saat hover
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
```

---

## 📱 KUSTOMISASI RESPONSIF

### 1. Breakpoint Custom

**📁 File: `tailwind.config.js`**
- Tambahkan di dalam `theme.extend`:
```javascript
screens: {
  'xs': '475px',      // Extra small
  'sm': '640px',      // Small (default)
  'md': '768px',      // Medium (default)
  'lg': '1024px',     // Large (default)
  'xl': '1280px',     // Extra large (default)
  '2xl': '1536px',    // 2X large (default)
  '3xl': '1600px',    // Custom 3X large
},
```

### 2. Layout Responsif

**📁 File: `app/page.tsx`**
- **Baris 51**: Container responsif
```typescript
// Dari:
<div className="max-w-2xl mx-auto">

// Ke responsif:
<div className="w-full px-4 sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
```

### 3. Grid Filter Responsif

**📁 File: `app/page.tsx`**
- **Baris 60**: Filter buttons
```typescript
<div className="flex justify-center gap-4 mb-6">
// Ubah ke grid responsif:
<div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-6">
```

---

## 🚀 MENAMBAH FITUR BARU

### 1. Menambah Prioritas Todo

**📁 File: `types/index.ts`**
- **Baris 1-6**: Update interface Todo
```typescript
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';  // Tambahkan ini
  category?: string;                     // Opsional
  dueDate?: Date;                       // Opsional
}
```

**📁 File: `components/TodoItem.tsx`**
- Tambahkan setelah checkbox (sekitar baris 18):
```typescript
{/* Indikator prioritas */}
<div className={`w-3 h-3 rounded-full ${
  todo.priority === 'high' ? 'bg-red-500' :
  todo.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
}`} title={`Prioritas: ${todo.priority}`} />
```

### 2. Menambah Pencarian

**📁 File: `app/page.tsx`**
- Tambahkan state setelah baris 13:
```typescript
const [searchTerm, setSearchTerm] = useState('');
```

- Update fungsi filter (ganti TodoList props):
```typescript
const filteredTodos = todos.filter((todo) => {
  const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
  if (filter === 'active') return !todo.completed && matchesSearch;
  if (filter === 'completed') return todo.completed && matchesSearch;
  return matchesSearch;
});
```

- Tambahkan input pencarian sebelum AddTodo:
```typescript
{/* Search Input */}
<div className="mb-4">
  <input
    type="text"
    placeholder="🔍 Cari tugas..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
  />
</div>
```

### 3. Menambah Statistik

**📁 File baru: `components/TodoStats.tsx`**
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="text-2xl font-bold text-blue-600">{total}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
      </div>
      <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="text-2xl font-bold text-yellow-600">{active}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Aktif</div>
      </div>
      <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="text-2xl font-bold text-green-600">{completed}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Selesai</div>
      </div>
      <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="text-2xl font-bold text-purple-600">{completionRate}%</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Progress</div>
      </div>
    </div>
  );
}
```

**📁 File: `app/page.tsx`**
- Import komponen:
```typescript
import TodoStats from '@/components/TodoStats';
```

- Tambahkan setelah judul:
```typescript
<TodoStats todos={todos} />
```

### 4. Export/Import Data

**📁 File: `app/page.tsx`**
- Tambahkan fungsi setelah editTodo:
```typescript
const exportTodos = () => {
  const dataStr = JSON.stringify(todos, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `todos-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const importTodos = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedTodos = JSON.parse(e.target?.result as string);
        if (Array.isArray(importedTodos)) {
          setTodos(importedTodos);
          alert('Data berhasil diimpor!');
        } else {
          alert('Format file tidak valid');
        }
      } catch (error) {
        alert('File tidak dapat dibaca');
      }
    };
    reader.readAsText(file);
  }
};
```

- Tambahkan tombol export/import:
```typescript
{/* Export/Import Buttons */}
<div className="flex gap-2 mb-4">
  <button
    onClick={exportTodos}
    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
  >
    📥 Export
  </button>
  <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
    📤 Import
    <input
      type="file"
      accept=".json"
      onChange={importTodos}
      className="hidden"
    />
  </label>
</div>
```

---

## 🌍 KUSTOMISASI BAHASA (INTERNATIONALIZATION)

### 1. Membuat File Terjemahan

**📁 File baru: `lib/translations.ts`**
```typescript
export const translations = {
  id: {
    title: 'Aplikasi Todo',
    addPlaceholder: 'Tambahkan tugas baru...',
    addButton: 'Tambah',
    deleteButton: 'Hapus',
    searchPlaceholder: 'Cari tugas...',
    exportButton: 'Export',
    importButton: 'Import',
    filters: {
      all: 'Semua',
      active: 'Aktif',
      completed: 'Selesai'
    },
    empty: {
      all: 'Tidak ada tugas',
      active: 'Tidak ada tugas aktif',
      completed: 'Tidak ada tugas selesai'
    },
    stats: {
      total: 'Total',
      active: 'Aktif',
      completed: 'Selesai',
      progress: 'Progress'
    }
  },
  en: {
    title: 'Todo App',
    addPlaceholder: 'Add new task...',
    addButton: 'Add',
    deleteButton: 'Delete',
    searchPlaceholder: 'Search tasks...',
    exportButton: 'Export',
    importButton: 'Import',
    filters: {
      all: 'All',
      active: 'Active',
      completed: 'Completed'
    },
    empty: {
      all: 'No tasks',
      active: 'No active tasks',
      completed: 'No completed tasks'
    },
    stats: {
      total: 'Total',
      active: 'Active',
      completed: 'Completed',
      progress: 'Progress'
    }
  }
};

export type Language = keyof typeof translations;
```

### 2. Menggunakan Terjemahan

**📁 File: `app/page.tsx`**
- Import dan setup:
```typescript
import { translations, Language } from '@/lib/translations';

export default function Home() {
  const [language, setLanguage] = useState<Language>('id');
  const t = translations[language];
  
  // Gunakan t.title, t.addButton, dll. di seluruh komponen
}
```

- Tambahkan language switcher:
```typescript
{/* Language Switcher */}
<div className="flex justify-center mb-4">
  <button
    onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
  >
    {language === 'id' ? '🇺🇸 EN' : '🇮🇩 ID'}
  </button>
</div>
```

---

## 🔧 TIPS DEBUGGING DAN OPTIMASI

### 1. Console Logging

**📁 File: `app/page.tsx`**
- Tambahkan untuk debug:
```typescript
useEffect(() => {
  console.log('Todos updated:', todos);
  console.log('Filter:', filter);
}, [todos, filter]);
```

### 2. Error Boundary

**📁 File baru: `components/ErrorBoundary.tsx`**
```typescript
'use client';

import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Terjadi Kesalahan</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Aplikasi mengalami error. Silakan refresh halaman.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Refresh Halaman
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

### 3. Performance Monitoring

**📁 File: `app/page.tsx`**
- Tambahkan performance logging:
```typescript
useEffect(() => {
  const startTime = performance.now();
  // Operasi yang ingin diukur
  const endTime = performance.now();
  console.log(`Operation took ${endTime - startTime} milliseconds`);
}, []);
```

---

## 📝 CHECKLIST KUSTOMISASI

### ✅ Tampilan Dasar
- [ ] Ubah judul aplikasi
- [ ] Ganti font
- [ ] Sesuaikan ukuran container
- [ ] Ubah warna tema
- [ ] Sesuaikan spacing

### ✅ Fitur Teks
- [ ] Ubah placeholder input
- [ ] Ganti label tombol
- [ ] Sesuaikan pesan error
- [ ] Ubah teks filter
- [ ] Ganti pesan kosong

### ✅ Fungsionalitas
- [ ] Tambah validasi input
- [ ] Implementasi pencarian
- [ ] Tambah statistik
- [ ] Export/import data
- [ ] Multi-bahasa

### ✅ Animasi & UX
- [ ] Sesuaikan durasi animasi
- [ ] Tambah efek hover
- [ ] Implementasi loading state
- [ ] Tambah konfirmasi hapus

### ✅ Responsif
- [ ] Test di mobile
- [ ] Test di tablet
- [ ] Test di desktop
- [ ] Sesuaikan breakpoint

---

## 🚨 CATATAN PENTING

1. **Backup**: Selalu backup kode sebelum melakukan perubahan besar
2. **Testing**: Test setiap perubahan di berbagai device dan browser
3. **Performance**: Monitor performa setelah menambah fitur
4. **Accessibility**: Pastikan aplikasi tetap accessible
5. **Version Control**: Gunakan Git untuk tracking perubahan

---

## 📞 BANTUAN LEBIH LANJUT

Jika Anda membutuhkan bantuan implementasi fitur tertentu, silakan tanyakan dengan menyebutkan:
1. Fitur yang ingin ditambahkan
2. File yang ingin dimodifikasi
3. Hasil yang diharapkan

*Dokumentasi ini dibuat untuk memudahkan kustomisasi aplikasi Todo sesuai kebutuhan Anda.* 