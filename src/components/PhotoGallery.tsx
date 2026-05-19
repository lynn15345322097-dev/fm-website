'use client';

import { useState } from 'react';
import type { Photo } from '@/types';
import { PHOTO_CATEGORIES } from '@/types';
import PhotoLightbox from './PhotoLightbox';

interface Props {
  photos: Photo[];
}

const GRADIENTS: Record<string, string> = {
  '建筑外观': 'from-stone-100 via-white to-teal-50',
  '展厅空间': 'from-slate-100 via-white to-stone-100',
  '技术器物': 'from-amber-50 via-white to-stone-100',
  '场景复原': 'from-teal-50 via-white to-amber-50',
  '互动装置': 'from-stone-100 via-white to-cyan-50',
};

const CATEGORY_ICONS: Record<string, string> = {
  '建筑外观': '🏛',
  '展厅空间': '🪟',
  '技术器物': '⚙',
  '场景复原': '🎬',
  '互动装置': '🕹',
};

export default function PhotoGallery({ photos }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>(PHOTO_CATEGORIES[0]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = photos.filter((p) => p.category === activeCategory);
  const allPhotosByCategory = activeCategory === '全部'
    ? photos
    : filtered;

  const categoriesForDisplay = ['全部', ...PHOTO_CATEGORIES] as const;

  const displayed =
    activeCategory === '全部'
      ? photos
      : filtered;

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categoriesForDisplay.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              activeCategory === cat
                ? 'bg-amber-gold text-film-black font-medium'
                : 'bg-stone-100 text-stone-600 hover:text-stone-950 hover:bg-stone-200'
            }`}
          >
            {cat !== '全部' && <span className="mr-1.5">{CATEGORY_ICONS[cat]}</span>}
            {cat}
          </button>
        ))}
      </div>

      {/* Photo grid */}
      {displayed.length === 0 ? (
        <p className="text-warm-white-dim/60 text-center py-12">
          该分类暂无图片
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayed.map((photo, idx) => (
            <button
              key={`${photo.category}-${idx}`}
              onClick={() => setLightboxIndex(photos.indexOf(photo))}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-stone-200 transition-all duration-300 hover:border-teal-300"
            >
              <div
                className={`absolute inset-0 bg-linear-to-br ${
                  GRADIENTS[photo.category] || 'from-film-black-lighter to-film-black-light'
                }`}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <span className="text-3xl mb-2 opacity-50">
                  {CATEGORY_ICONS[photo.category] || '📷'}
                </span>
                <span className="line-clamp-2 text-center text-xs text-stone-600">
                  {photo.caption}
                </span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-white/0 transition-all duration-300 group-hover:bg-white/75">
                <span className="text-sm text-stone-950/0 transition-all duration-300 group-hover:text-stone-950">
                  点击查看
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
