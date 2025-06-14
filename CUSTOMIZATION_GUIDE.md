# 📚 Panduan Kustomisasi Todo App

Dokumentasi lengkap untuk melakukan penyesuaian pada aplikasi Todo dengan penjelasan detail lokasi file dan implementasinya.

## 🎯 KUSTOMISASI TAMPILAN

### 1. Mengubah Judul Aplikasi
**File: `app/layout.tsx` (baris 8-11)**
```typescript
export const metadata: Metadata = {
  title: 'Todo App',                    // ← Ubah ini
  description: 'Aplikasi Todo sederhana', // ← Dan ini
};
```

**File: `app/page.tsx` (baris 54)**
```typescript
<h1 className="text-3xl font-bold text-center mb-8">
  Todo App  // ← Ubah judul yang tampil
</h1>
```

### 2. Mengubah Font
**File: `app/layout.tsx` (baris 2 & 4)**
```typescript
// Ganti font
import { Roboto } from 'next/font/google';
const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] });
```

### 3. Mengubah Ukuran Container
**File: `app/page.tsx` (baris 51)**
```typescript
// Opsi ukuran:
<div className="max-w-sm mx-auto">   // Kecil (384px)
<div className="max-w-md mx-auto">   // Sedang (448px)  
<div className="max-w-2xl mx-auto">  // Default (672px)
<div className="max-w-4xl mx-auto">  // Besar (896px)
```

## 🌈 KUSTOMISASI WARNA

### 1. Warna Utama
**File: `tailwind.config.js` (baris 10-13)**
```javascript
colors: {
  primary: '#EF4444',    // Merah
  primary: '#10B981',    // Hijau  
  primary: '#8B5CF6',    // Ungu
  primary: '#F97316',    // Orange
},
```

### 2. Tema Dark Mode
**File: `app/globals.css` (baris 10-13)**
```css
.dark {
  --foreground-rgb: 255, 255, 255;  /* Warna teks */
  --background-rgb: 17, 24, 39;     /* Warna background */
}
```

## ⚙️ KUSTOMISASI TEKS

### 1. Placeholder Input
**File: `components/AddTodo.tsx` (baris 24)**
```typescript
placeholder="Apa yang ingin Anda lakukan hari ini?"
```

### 2. Tombol dan Label
**File: `components/AddTodo.tsx` (baris 29)**
```typescript
Buat  // Ganti "Tambah" dengan "Buat"
```

**File: `components/TodoItem.tsx` (baris 28)**
```typescript
🗑️  // Ganti "Hapus" dengan emoji
```

### 3. Filter Labels
**File: `app/page.tsx` (baris 68-70)**
```typescript
// Dengan emoji
{f === 'all' ? '📋 Semua' : f === 'active' ? '⏳ Aktif' : '✅ Selesai'}
```

## 🚀 MENAMBAH FITUR BARU

### 1. Pencarian Todo
**File: `app/page.tsx` - Tambahkan state:**
```typescript
const [searchTerm, setSearchTerm] = useState('');
```

**Tambahkan input pencarian:**
```typescript
<input
  type="text"
  placeholder="🔍 Cari tugas..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full px-4 py-2 mb-4 rounded-lg border"
/>
```

### 2. Statistik Todo
**File baru: `components/TodoStats.tsx`**
```typescript
export default function TodoStats({ todos }) {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="text-center p-4 bg-white rounded-lg">
        <div className="text-2xl font-bold">{total}</div>
        <div className="text-sm">Total</div>
      </div>
      <div className="text-center p-4 bg-white rounded-lg">
        <div className="text-2xl font-bold">{completed}</div>
        <div className="text-sm">Selesai</div>
      </div>
    </div>
  );
}
```

### 3. Export/Import Data
**File: `app/page.tsx` - Tambahkan fungsi:**
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
```

## 🎭 KUSTOMISASI ANIMASI

### 1. Durasi Animasi
**File: `tailwind.config.js` (baris 14-20)**
```javascript
animation: {
  'slide-in': 'slide-in 0.5s ease-out',  // Ubah dari 0.3s ke 0.5s
},
```

### 2. Efek Hover
**File: `components/TodoItem.tsx` - Tambahkan:**
```typescript
<motion.div
  whileHover={{ scale: 1.02 }}  // Membesar saat hover
  whileTap={{ scale: 0.98 }}    // Mengecil saat klik
>
```

## 📱 RESPONSIF

### 1. Layout Mobile
**File: `app/page.tsx` (baris 51)**
```typescript
<div className="w-full px-4 sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
```

### 2. Grid Responsif
**File: `app/page.tsx` - Filter buttons:**
```typescript
<div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
```

## 🌍 MULTI-BAHASA

### 1. File Terjemahan
**File baru: `lib/translations.ts`**
```typescript
export const translations = {
  id: {
    title: 'Aplikasi Todo',
    addButton: 'Tambah',
    deleteButton: 'Hapus',
  },
  en: {
    title: 'Todo App', 
    addButton: 'Add',
    deleteButton: 'Delete',
  }
};
```

### 2. Implementasi
**File: `app/page.tsx`**
```typescript
const [language, setLanguage] = useState('id');
const t = translations[language];

// Gunakan t.title, t.addButton, dll.
```

## 🔧 VALIDASI INPUT

**File: `components/AddTodo.tsx` - Update handleSubmit:**
```typescript
const handleSubmit = (e) => {
  e.preventDefault();
  if (text.trim()) {
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

## 📝 CHECKLIST KUSTOMISASI

### ✅ Tampilan
- [ ] Ubah judul aplikasi
- [ ] Ganti font
- [ ] Sesuaikan warna
- [ ] Ubah ukuran container

### ✅ Fitur
- [ ] Tambah pencarian
- [ ] Implementasi statistik
- [ ] Export/import data
- [ ] Validasi input

### ✅ UX
- [ ] Sesuaikan animasi
- [ ] Tambah efek hover
- [ ] Responsif mobile
- [ ] Multi-bahasa

## 🚨 TIPS PENTING

1. **Backup kode** sebelum melakukan perubahan
2. **Test di berbagai device** setelah kustomisasi
3. **Gunakan console.log** untuk debugging
4. **Simpan perubahan** secara bertahap

---

*Dokumentasi ini membantu Anda melakukan kustomisasi aplikasi Todo sesuai kebutuhan.* 