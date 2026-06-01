import { Film } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-stone-600">
            <Film className="w-3.5 h-3.5 text-amber-gold" />
            <span className="text-xs">
              中国电影展示空间的线上图谱
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs text-stone-600">
            <Link href="/about" className="hover:text-amber-gold transition-colors">
              关于项目
            </Link>
            <Link href="/map" className="hover:text-amber-gold transition-colors">
              进入地图
            </Link>
            <Link href="/archive" className="hover:text-amber-gold transition-colors">
              图像档案
            </Link>
          </div>
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} 线上图谱 · 学术研究项目
          </p>
        </div>
      </div>
    </footer>
  );
}
