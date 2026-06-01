'use client';

import dynamic from 'next/dynamic';
import { useState, useMemo } from 'react';
import { Search, MapPin, RotateCcw, Layers } from 'lucide-react';
import {
  getAllMuseums,
  getAllNatures,
  getAllProvinces,
  getAllRegions,
} from '@/lib/museums';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

type DisplayMode = 'normal' | 'cluster';

export default function MapPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedNature, setSelectedNature] = useState('');
  const [visitedOnly, setVisitedOnly] = useState(false);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('cluster');

  const allMuseums = useMemo(() => getAllMuseums(), []);
  const regions = useMemo(() => getAllRegions(), []);
  const provinces = useMemo(() => getAllProvinces(), []);
  const natures = useMemo(() => getAllNatures(), []);

  const filtered = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return allMuseums.filter((m) => {
      const haystack = [m.name, m.nameEn, m.region, m.province, m.city, m.address, m.nature, ...m.tags]
        .join(' ')
        .toLowerCase();
      if (normalized && !haystack.includes(normalized)) return false;
      if (selectedRegion && m.region !== selectedRegion) return false;
      if (selectedProvince && m.province !== selectedProvince) return false;
      if (selectedNature && m.nature !== selectedNature) return false;
      if (visitedOnly && !m.visited) return false;
      return true;
    });
  }, [allMuseums, search, selectedRegion, selectedProvince, selectedNature, visitedOnly]);

  const resetFilters = () => {
    setSearch('');
    setSelectedRegion('');
    setSelectedProvince('');
    setSelectedNature('');
    setVisitedOnly(false);
  };

  return (
    <div className="relative isolate h-[calc(100dvh-3.5rem)] overflow-hidden bg-[#f5f0e8]">
      {/* Map */}
      <div className="absolute inset-0 z-0">
        <MapView museums={filtered} mode={displayMode} showLegend />
      </div>

      {/* Display mode toggle */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1100] flex rounded-lg border border-amber-gold/40 bg-white/90 shadow-sm shadow-stone-300/40 backdrop-blur overflow-hidden">
        <button
          onClick={() => setDisplayMode('normal')}
          className={`px-4 py-2 text-sm transition-all ${displayMode === 'normal' ? 'bg-amber-gold text-white' : 'text-stone-600 hover:text-stone-900'}`}
        >
          普通点位
        </button>
        <button
          onClick={() => setDisplayMode('cluster')}
          className={`px-4 py-2 text-sm transition-all ${displayMode === 'cluster' ? 'bg-amber-gold text-white' : 'text-stone-600 hover:text-stone-900'}`}
        >
          聚类视图
        </button>
      </div>

      {/* Toggle sidebar button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-4 left-4 z-[1100] rounded-lg border border-amber-gold/40 bg-white/90 px-3 py-2 text-sm text-stone-800 shadow-sm shadow-stone-300/40 backdrop-blur hover:border-amber-gold transition-all"
      >
        {sidebarOpen ? '收起面板' : '展开筛选'}
      </button>

      {/* Sidebar */}
      <div
        className={`absolute top-0 left-0 h-full z-[1000] border-r border-amber-gold/25 bg-white/94 shadow-sm shadow-stone-300/30 backdrop-blur-md transition-all duration-300 ${
          sidebarOpen ? 'w-[20rem] translate-x-0' : 'w-[20rem] -translate-x-full'
        }`}
      >
        <div className="p-5 pt-16 h-full overflow-y-auto">
          <div className="mb-5">
            <p className="mb-1 text-xs tracking-[0.22em] text-amber-gold/70 uppercase">
              Archive Map
            </p>
            <h1 className="font-serif text-xl text-stone-950">地图点位</h1>
            <p className="mt-2 text-sm text-stone-600">
              显示 {filtered.length} / {allMuseums.length} 个展示空间
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="搜索名称、城市、地址或标签..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-stone-200 bg-white/80 py-2.5 pl-10 pr-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-gold/70 focus:outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <label className="block">
              <span className="block text-xs text-stone-500 mb-1.5">地区</span>
              <select value={selectedRegion} onChange={(event) => setSelectedRegion(event.target.value)} className="w-full rounded-lg border border-stone-200 bg-white/85 px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-gold/70">
                <option value="">全部地区</option>
                {regions.map((region) => <option key={region} value={region}>{region}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="block text-xs text-stone-500 mb-1.5">省份</span>
              <select value={selectedProvince} onChange={(event) => setSelectedProvince(event.target.value)} className="w-full rounded-lg border border-stone-200 bg-white/85 px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-gold/70">
                <option value="">全部省份</option>
                {provinces.map((province) => <option key={province} value={province}>{province}</option>)}
              </select>
            </label>
          </div>

          <div className="mb-5">
            <label className="block">
              <span className="block text-xs text-stone-500 mb-1.5">性质</span>
              <select value={selectedNature} onChange={(event) => setSelectedNature(event.target.value)} className="w-full rounded-lg border border-stone-200 bg-white/85 px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-gold/70">
                <option value="">全部性质</option>
                {natures.map((nature) => <option key={nature} value={nature}>{nature}</option>)}
              </select>
            </label>
            <label className="mt-3 flex items-center gap-2 text-sm text-stone-600">
              <input type="checkbox" checked={visitedOnly} onChange={(event) => setVisitedOnly(event.target.checked)} className="h-4 w-4 rounded border-stone-300 accent-amber-gold" />
              只看已实地考察
            </label>
            <button onClick={resetFilters} className="mt-3 inline-flex items-center gap-2 text-xs text-amber-gold/80 hover:text-amber-gold">
              <RotateCcw className="h-3.5 w-3.5" />
              重置筛选
            </button>
          </div>

          {/* Results */}
          <div>
            <div className="space-y-2">
              {filtered.map((museum) => (
                <a
                  key={museum.id}
                  href={`/museum/${museum.id}`}
                  className="group block rounded-lg border border-stone-200 bg-white/72 p-3 transition-all hover:border-amber-gold/50 hover:bg-white"
                >
                  <p className="mb-1 text-sm font-medium text-stone-900 transition-colors group-hover:text-dark-red">
                    {museum.name}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-stone-500">
                    <MapPin className="w-3 h-3" />
                    <span>{museum.province} · {museum.city}</span>
                    <span className="mx-1">·</span>
                    <span>{museum.nature}</span>
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
