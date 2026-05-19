'use client';

import { useState } from 'react';
import type { Photo } from '@/types';
import { PHOTO_CATEGORIES } from '@/types';
import PhotoLightbox from './PhotoLightbox';

interface Props {
  photos: Photo[];
}

const GRADIENTS: Record<string, string> = {
  '建筑外观': 'from-amber-gold/20 via-film-black-light to-dark-red/20',
  '展厅空间': 'from-film-black-lighter via-amber-gold/10 to-film-black-light',
  '技术器物': 'from-dark-red/20 via-film-black-light to-amber-gold/10',
  '场景复原': 'from-amber-gold/10 via-film-black-lighter to-dark-red/10',
  '互动装置': 'from-dark-red/10 via-amber-gold/10 to-film-black-lighter',
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
                : 'bg-film-black-lighter text-warm-white-dim hover:text-warm-white hover:bg-film-black-light'
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
              className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-film-black-lighter hover:border-amber-gold/40 transition-all duration-300"
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
                <span className="text-warm-white-dim/60 text-xs text-center line-clamp-2">
                  {photo.caption}
                </span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-film-black/0 group-hover:bg-film-black/40 transition-all duration-300 flex items-center justify-center">
                <span className="text-warm-white/0 group-hover:text-warm-white text-sm transition-all duration-300">
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
