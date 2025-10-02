# TaskFlow - Modern Todo App

Aplikasi manajemen tugas modern yang dibangun dengan Next.js, TypeScript, dan Tailwind CSS.

## ✨ Fitur

- 📱 **Responsive Design** - Optimal di semua perangkat
- 🌙 **Dark/Light Mode** - Toggle tema sesuai preferensi
- 💾 **Local Storage** - Data tersimpan di browser
- 📊 **Statistics** - Lihat progress tugas Anda
- 🔍 **Search & Filter** - Cari dan filter tugas
- 📥 **Export/Import** - Backup dan restore data
- 🔔 **Backup Reminder** - Pengingat backup otomatis
- ✨ **Smooth Animations** - Animasi yang halus dengan Framer Motion
- 📦 **PWA Support** - Dapat di-install di perangkat Anda

## 🛠️ Teknologi

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **next-pwa** - Progressive Web App capabilities

## 📦 Instalasi & Menjalankan

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

3. Buka [http://localhost:3000/taskflow](http://localhost:3000/taskflow) di browser Anda.

## 🌐 Deploy ke GitHub Pages

1. Push code ke GitHub repository Anda.
2. GitHub Actions akan otomatis build dan deploy aplikasi.
3. Di repository GitHub Anda, pergi ke Settings > Pages > Build and deployment > Source, dan pilih **GitHub Actions**.

## 📁 Struktur Project

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── AddTodo.tsx        # Form tambah tugas
│   ├── TodoItem.tsx       # Item tugas
│   └── ... (dan komponen lainnya)
├── public/
│   ├── icons/             # Ikon untuk PWA
│   ├── manifest.json      # PWA manifest file
│   └── .nojekyll          # GitHub Pages config
├── types/
│   └── index.ts           # TypeScript types
└── .github/
    └── workflows/
        └── deploy.yml     # GitHub Actions workflow
```

## 🔧 Konfigurasi

- **next.config.js** - Konfigurasi Next.js (termasuk PWA dan static export)
- **tailwind.config.js** - Konfigurasi Tailwind CSS

## 📄 License

MIT License