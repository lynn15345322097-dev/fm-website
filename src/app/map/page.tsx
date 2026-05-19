'use client';

import dynamic from 'next/dynamic';
import { useState, useMemo } from 'react';
import { Search, MapPin, RotateCcw } from 'lucide-react';
import {
  getAllMuseums,
  getAllNatures,
  getAllProvinces,
  getAllRegions,
} from '@/lib/museums';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

export default function MapPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedNature, setSelectedNature] = useState('');
  const [visitedOnly, setVisitedOnly] = useState(false);

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
    <div className="relative h-[calc(100vh-4rem)] bg-stone-100">
      {/* Map */}
      <div className="absolute inset-0">
        <MapView museums={filtered} />
      </div>

      {/* Toggle sidebar button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-4 left-4 z-20 bg-white border border-stone-200 text-stone-800 px-3 py-2 rounded-lg text-sm shadow-sm hover:border-teal-300 transition-all"
      >
        {sidebarOpen ? '收起面板' : '展开筛选'}
      </button>

      {/* Sidebar */}
      <div
        className={`absolute top-0 left-0 h-full z-10 bg-white/95 backdrop-blur-md border-r border-stone-200 transition-all duration-300 shadow-xl ${
          sidebarOpen ? 'w-[23rem] translate-x-0' : 'w-[23rem] -translate-x-full'
        }`}
      >
        <div className="p-5 pt-16 h-full overflow-y-auto">
          <div className="mb-5">
            <p className="text-xs text-stone-500 mb-1">中国电影展示空间</p>
            <h1 className="text-xl font-semibold text-stone-950">地图点位</h1>
            <p className="text-sm text-stone-500 mt-2">
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
              className="w-full bg-stone-50 border border-stone-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-teal-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <label className="block">
              <span className="block text-xs text-stone-500 mb-1.5">地区</span>
              <select value={selectedRegion} onChange={(event) => setSelectedRegion(event.target.value)} className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-teal-500">
                <option value="">全部地区</option>
                {regions.map((region) => <option key={region} value={region}>{region}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="block text-xs text-stone-500 mb-1.5">省份</span>
              <select value={selectedProvince} onChange={(event) => setSelectedProvince(event.target.value)} className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-teal-500">
                <option value="">全部省份</option>
                {provinces.map((province) => <option key={province} value={province}>{province}</option>)}
              </select>
            </label>
          </div>

          <div className="mb-5">
            <label className="block">
              <span className="block text-xs text-stone-500 mb-1.5">性质</span>
              <select value={selectedNature} onChange={(event) => setSelectedNature(event.target.value)} className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-teal-500">
                <option value="">全部性质</option>
                {natures.map((nature) => <option key={nature} value={nature}>{nature}</option>)}
              </select>
            </label>
            <label className="mt-3 flex items-center gap-2 text-sm text-stone-700">
              <input type="checkbox" checked={visitedOnly} onChange={(event) => setVisitedOnly(event.target.checked)} className="h-4 w-4 rounded border-stone-300 text-teal-700" />
              只看已实地考察
            </label>
            <button onClick={resetFilters} className="mt-3 inline-flex items-center gap-2 text-xs text-teal-700 hover:text-teal-900">
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
                  className="block p-3 rounded-lg bg-stone-50 border border-stone-200 hover:border-teal-300 hover:bg-white transition-all group"
                >
                  <p className="text-sm font-medium text-stone-950 group-hover:text-teal-800 transition-colors mb-1">
                    {museum.name}
                  </p>
                  <div className="flex items-center gap-1 text-stone-500 text-xs">
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
