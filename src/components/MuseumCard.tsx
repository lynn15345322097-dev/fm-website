import type { Museum } from '@/types';
import Link from 'next/link';
import { MapPin, Tag } from 'lucide-react';

interface Props {
  museum: Museum;
}

export default function MuseumCard({ museum }: Props) {
  return (
    <Link
      href={`/museum/${museum.id}`}
      className="group block bg-film-black-light border border-film-black-lighter rounded-xl overflow-hidden hover:border-amber-gold/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-gold/5"
    >
      {/* Gradient placeholder banner */}
      <div className="h-40 bg-linear-to-br from-film-black-lighter via-film-black-light to-dark-red/20 flex items-center justify-center">
        <span className="font-serif text-warm-white-dim/40 text-lg tracking-wider px-4 text-center">
          {museum.name}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-serif text-lg text-warm-white group-hover:text-amber-gold transition-colors mb-2">
          {museum.name}
        </h3>

        <div className="flex items-center gap-1 text-warm-white-dim/70 text-xs mb-3">
          <MapPin className="w-3 h-3" />
          <span>{museum.city}</span>
          <span className="mx-2">·</span>
          <span>{museum.type}</span>
        </div>

        <p className="text-warm-white-dim/80 text-sm leading-relaxed line-clamp-2 mb-4">
          {museum.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {museum.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-film-black-lighter text-warm-white-dim/60 text-xs"
            >
              <Tag className="w-2.5 h-2.5" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
