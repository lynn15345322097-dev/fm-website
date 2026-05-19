'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Film, Map, Route, ImageIcon, Info, Menu, X } from 'lucide-react';
import { useState } from 'react';

const NAV_ITEMS = [
  { href: '/', label: '首页', icon: Film },
  { href: '/map', label: '地图', icon: Map },
  { href: '/exhibition-routes', label: '展线', icon: Route },
  { href: '/archive', label: '图像档案', icon: ImageIcon },
  { href: '/about', label: '关于', icon: Info },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 text-stone-950 hover:text-teal-700 transition-colors"
          >
            <Film className="w-5 h-5" />
            <span className="text-lg font-semibold tracking-wide">线上图谱</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${
                    isActive
                      ? 'text-teal-800 bg-teal-50'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-stone-800 p-2 hover:text-teal-700 transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white/95 backdrop-blur-md">
          <div className="px-4 py-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    isActive
                      ? 'text-teal-800 bg-teal-50'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
