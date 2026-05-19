import type { Metadata } from 'next';
import { Inter, Noto_Serif_SC } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const notoSerif = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: '中国电影展示空间的线上图谱',
  description:
    '一个以中国电影博物馆与展示空间为考察对象的数字人文项目，通过地图、图像与文字构建中国电影展示空间的知识图谱。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${notoSerif.variable}`}>
      <body className="font-sans antialiased film-grain">
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
