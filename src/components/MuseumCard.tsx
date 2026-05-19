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
      className="group block overflow-hidden rounded-xl border border-stone-200 bg-white transition-all duration-300 hover:border-teal-300 hover:shadow-lg hover:shadow-stone-200/70"
    >
      {/* Gradient placeholder banner */}
      <div className="flex h-36 items-center justify-center bg-linear-to-br from-stone-100 via-white to-teal-50">
        <span className="px-4 text-center text-lg font-semibold tracking-wide text-stone-400">
          {museum.name}
        </span>
      </div>

      <div className="p-5">
        <h3 className="mb-2 text-lg font-semibold text-stone-950 transition-colors group-hover:text-teal-800">
          {museum.name}
        </h3>

        <div className="mb-3 flex items-center gap-1 text-xs text-stone-500">
          <MapPin className="w-3 h-3" />
          <span>{museum.province} · {museum.city}</span>
          <span className="mx-2">·</span>
          <span>{museum.nature}</span>
        </div>

        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-stone-600">
          {museum.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {museum.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-600"
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
