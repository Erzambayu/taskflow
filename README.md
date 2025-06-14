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

## 🚀 Demo

Aplikasi ini dapat diakses di: [GitHub Pages URL akan muncul setelah deploy]

## 🛠️ Teknologi

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Local Storage** - Data persistence

## 📦 Instalasi

1. Clone repository:
```bash
git clone https://github.com/username/taskflow.git
cd taskflow
```

2. Install dependencies:
```bash
npm install
```

3. Jalankan development server:
```bash
npm run dev
```

4. Buka [http://localhost:3000](http://localhost:3000)

## 🌐 Deploy ke GitHub Pages

### Otomatis (Recommended)

1. Push code ke GitHub repository
2. GitHub Actions akan otomatis build dan deploy
3. Aktifkan GitHub Pages di Settings > Pages > Source: GitHub Actions

### Manual

1. Build aplikasi:
```bash
npm run build
```

2. Deploy folder `out` ke GitHub Pages

## 📁 Struktur Project

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── AddTodo.tsx        # Form tambah tugas
│   ├── TodoItem.tsx       # Item tugas
│   ├── TodoList.tsx       # List tugas
│   ├── TodoStats.tsx      # Statistik
│   ├── ThemeToggle.tsx    # Toggle tema
│   ├── BackupReminder.tsx # Pengingat backup
│   └── DataInfo.tsx       # Info penyimpanan
├── types/
│   └── index.ts           # TypeScript types
└── public/
    └── .nojekyll          # GitHub Pages config
```

## 🔧 Konfigurasi

- **next.config.js** - Konfigurasi Next.js untuk static export
- **tailwind.config.js** - Konfigurasi Tailwind CSS
- **.github/workflows/deploy.yml** - GitHub Actions workflow

## 📱 Fitur Mobile

- Touch-friendly interface
- Responsive breakpoints
- Optimized untuk layar kecil
- Gesture support

## 💾 Data Storage

- Data disimpan di localStorage browser
- Tidak ada server backend
- Export/Import untuk backup
- Pengingat backup otomatis setiap 7 hari

## 🤝 Contributing

1. Fork repository
2. Buat feature branch
3. Commit changes
4. Push ke branch
5. Buat Pull Request

## 📄 License

MIT License - lihat file LICENSE untuk detail.

## 🙏 Acknowledgments

- Next.js team untuk framework yang luar biasa
- Tailwind CSS untuk utility-first CSS
- Framer Motion untuk animasi yang smooth
- Vercel untuk hosting dan deployment tools 