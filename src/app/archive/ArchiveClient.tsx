'use client';

import { useState, useMemo } from 'react';
import { ImageIcon } from 'lucide-react';
import type { Photo } from '@/types';
import { PHOTO_CATEGORIES } from '@/types';
import Link from 'next/link';
import PhotoLightbox from '@/components/PhotoLightbox';

interface PhotoWithMeta extends Photo {
  museumName: string;
  museumId: string;
}

interface Props {
  photos: PhotoWithMeta[];
}

const GRADIENTS: Record<string, string> = {
  '建筑外观': 'from-stone-100 via-white to-amber-50',
  '展厅空间': 'from-slate-100 via-white to-stone-100',
  '技术器物': 'from-amber-50 via-white to-stone-100',
  '场景复原': 'from-stone-100 via-white to-amber-50',
  '互动装置': 'from-stone-100 via-white to-red-50',
};

const CATEGORY_DESCRIPTION: Record<string, string> = {
  '建筑外观': '博物馆建筑的外立面设计与城市空间关系',
  '展厅空间': '展厅内部的动线设计与空间氛围',
  '技术器物': '电影摄影、放映、剪辑等设备的陈列',
  '场景复原': '经典电影场景的实景复原与空间再现',
  '互动装置': '观众可参与的互动体验装置与技术',
};

export default function ArchiveClient({ photos }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('全部');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categoriesForDisplay = ['全部', ...PHOTO_CATEGORIES] as const;

  const displayed = useMemo(() => {
    if (activeCategory === '全部') return photos;
    return photos.filter((p) => p.category === activeCategory);
  }, [photos, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-gold/10 text-amber-gold text-xs tracking-[0.16em] mb-4">
          <ImageIcon className="w-3 h-3" />
          视觉档案
        </div>
        <h1 className="text-3xl text-stone-950 font-semibold mb-4">
          图像档案
        </h1>
        <p className="text-stone-600 max-w-2xl mx-auto text-sm leading-7">
          按类别浏览所有博物馆的影像资料，从建筑外观到互动装置，
          构建中国电影展示空间的视觉知识库。
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {categoriesForDisplay.map((cat) => {
          const count =
            cat === '全部'
              ? photos.length
              : photos.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                activeCategory === cat
                  ? 'bg-dark-red text-white font-medium'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-950 hover:bg-stone-200'
              }`}
            >
              {cat}
              <span className="ml-1.5 opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Category description */}
      {activeCategory !== '全部' && (
        <p className="text-center text-stone-500 text-sm mb-8">
          {CATEGORY_DESCRIPTION[activeCategory]}
        </p>
      )}

      {/* Photo grid */}
      {displayed.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-stone-400">该分类暂无图片</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {displayed.map((photo, idx) => (
            <button
              key={`${photo.museumId}-${idx}`}
              onClick={() => setLightboxIndex(photos.indexOf(photo))}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-stone-200 hover:border-amber-gold/50 transition-all duration-300 text-left"
            >
              <div
                className={`absolute inset-0 bg-linear-to-br ${
                  GRADIENTS[photo.category] || 'from-film-black-lighter to-film-black-light'
                }`}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <span className="text-stone-600 text-xs text-center line-clamp-2 mb-1">
                  {photo.caption}
                </span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/75 transition-all duration-300 flex flex-col items-center justify-center p-4">
                <span className="text-stone-950/0 group-hover:text-stone-950 text-sm transition-all duration-300 mb-1">
                  点击查看
                </span>
                <span className="text-dark-red/0 group-hover:text-dark-red text-xs transition-all duration-300">
                  {photo.museumName}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
