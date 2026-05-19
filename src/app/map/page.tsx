'use client';

import dynamic from 'next/dynamic';
import { useState, useMemo } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { getAllMuseums, getAllCities, getAllTags } from '@/lib/museums';
import type { Museum } from '@/types';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

export default function MapPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allMuseums = useMemo(() => getAllMuseums(), []);
  const cities = useMemo(() => getAllCities(), []);
  const tags = useMemo(() => getAllTags(), []);

  const filtered = useMemo(() => {
    return allMuseums.filter((m) => {
      if (search && !m.name.includes(search) && !m.city.includes(search)) return false;
      if (selectedCity && m.city !== selectedCity) return false;
      if (selectedTag && !m.tags.includes(selectedTag)) return false;
      return true;
    });
  }, [allMuseums, search, selectedCity, selectedTag]);

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      {/* Map */}
      <div className="absolute inset-0">
        <MapView />
      </div>

      {/* Toggle sidebar button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-4 left-4 z-20 bg-film-black-light border border-film-black-lighter text-warm-white px-3 py-2 rounded-lg text-sm hover:border-amber-gold/40 transition-all"
      >
        {sidebarOpen ? '收起面板' : '展开筛选'}
      </button>

      {/* Sidebar */}
      <div
        className={`absolute top-0 left-0 h-full z-10 bg-film-black/90 backdrop-blur-md border-r border-film-black-lighter transition-all duration-300 ${
          sidebarOpen ? 'w-80 translate-x-0' : 'w-80 -translate-x-full'
        }`}
      >
        <div className="p-5 pt-16 h-full overflow-y-auto">
          {/* Search */}
          <div className="relative mb-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-white-dim/50" />
            <input
              type="text"
              placeholder="搜索博物馆或城市..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-film-black border border-film-black-lighter rounded-lg pl-10 pr-4 py-2.5 text-sm text-warm-white placeholder:text-warm-white-dim/30 focus:outline-none focus:border-amber-gold/40 transition-colors"
            />
          </div>

          {/* City filter */}
          <div className="mb-5">
            <p className="text-xs text-warm-white-dim/50 uppercase tracking-wider mb-2">
              按城市筛选
            </p>
            <div className="flex flex-wrap gap-1.5">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(selectedCity === city ? null : city)}
                  className={`px-2.5 py-1 rounded text-xs transition-all ${
                    selectedCity === city
                      ? 'bg-amber-gold text-film-black'
                      : 'bg-film-black-lighter text-warm-white-dim hover:text-warm-white'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Tag filter */}
          <div className="mb-5">
            <p className="text-xs text-warm-white-dim/50 uppercase tracking-wider mb-2">
              按标签筛选
            </p>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`px-2.5 py-1 rounded text-xs transition-all ${
                    selectedTag === tag
                      ? 'bg-dark-red text-warm-white'
                      : 'bg-film-black-lighter text-warm-white-dim hover:text-warm-white'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div>
            <p className="text-xs text-warm-white-dim/50 uppercase tracking-wider mb-2">
              显示 {filtered.length} 个展示空间
            </p>
            <div className="space-y-2">
              {filtered.map((museum) => (
                <a
                  key={museum.id}
                  href={`/museum/${museum.id}`}
                  className="block p-3 rounded-lg bg-film-black-light border border-film-black-lighter hover:border-amber-gold/30 transition-all group"
                >
                  <p className="text-sm text-warm-white group-hover:text-amber-gold transition-colors mb-1">
                    {museum.name}
                  </p>
                  <div className="flex items-center gap-1 text-warm-white-dim/50 text-xs">
                    <MapPin className="w-3 h-3" />
                    <span>{museum.city}</span>
                    <span className="mx-1">·</span>
                    <span>{museum.type}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
