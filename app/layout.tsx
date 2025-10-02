import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TaskFlow - Modern Todo App',
  description: 'Kelola tugas Anda dengan mudah dan efisien dengan antarmuka yang modern dan intuitif',
  manifest: '/taskflow/manifest.json',
  keywords: ['todo', 'task management', 'productivity', 'taskflow'],
  authors: [{ name: 'TaskFlow Team' }],
  openGraph: {
    title: 'TaskFlow - Modern Todo App',
    description: 'Kelola tugas Anda dengan mudah dan efisien',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TaskFlow - Modern Todo App',
    description: 'Kelola tugas Anda dengan mudah dan efisien',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0d47a1',
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}