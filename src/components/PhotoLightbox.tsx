'use client';

import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Photo } from '@/types';

interface Props {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const GRADIENTS: Record<string, string> = {
  '建筑外观': 'from-amber-gold/30 via-film-black to-dark-red/30',
  '展厅空间': 'from-film-black-lighter via-amber-gold/20 to-film-black',
  '技术器物': 'from-dark-red/30 via-film-black to-amber-gold/20',
  '场景复原': 'from-amber-gold/20 via-film-black-lighter to-dark-red/20',
  '互动装置': 'from-dark-red/20 via-amber-gold/20 to-film-black-lighter',
};

export default function PhotoLightbox({ photos, currentIndex, onClose, onNavigate }: Props) {
  const photo = photos[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < photos.length - 1)
        onNavigate(currentIndex + 1);
    },
    [currentIndex, photos.length, onClose, onNavigate]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-film-black/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-warm-white hover:text-amber-gold transition-colors p-2 z-10"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex - 1);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-white hover:text-amber-gold transition-colors p-2 z-10"
          aria-label="Previous"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {/* Image area */}
      <div
        className="max-w-4xl max-h-[80vh] w-full mx-12 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`w-full aspect-[16/10] rounded-xl overflow-hidden border border-film-black-lighter bg-linear-to-br ${
            GRADIENTS[photo.category] || 'from-film-black-lighter to-film-black'
          } flex items-center justify-center`}
        >
          <div className="text-center p-8">
            <p className="text-warm-white/80 font-serif text-xl mb-2">{photo.caption}</p>
            <p className="text-amber-gold/60 text-xs">{photo.category}</p>
          </div>
        </div>
        <p className="text-warm-white-dim mt-4 text-sm">{photo.caption}</p>
        <p className="text-amber-gold/60 text-xs mt-1">
          {photo.category} · {currentIndex + 1} / {photos.length}
        </p>
      </div>

      {/* Next */}
      {currentIndex < photos.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex + 1);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-white hover:text-amber-gold transition-colors p-2 z-10"
          aria-label="Next"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}
    </div>
  );
}
