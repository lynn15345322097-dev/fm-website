import { notFound } from 'next/navigation';
import { MapPin, Tag } from 'lucide-react';
import { getMuseumById, getMuseumsByCity } from '@/lib/museums';
import PhotoGallery from '@/components/PhotoGallery';
import MuseumCard from '@/components/MuseumCard';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const museum = getMuseumById(id);
  if (!museum) return { title: '未找到' };
  return {
    title: `${museum.name} - 中国电影展示空间线上图谱`,
    description: museum.description,
  };
}

export default async function MuseumDetailPage({ params }: Props) {
  const { id } = await params;
  const museum = getMuseumById(id);

  if (!museum) {
    notFound();
  }

  const relatedMuseums = getMuseumsByCity(museum.city).filter(
    (m) => m.id !== museum.id
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header banner */}
      <div className="h-56 md:h-72 rounded-2xl bg-linear-to-br from-film-black-lighter via-dark-red/10 to-film-black-light border border-film-black-lighter flex items-center justify-center mb-8">
        <div className="text-center">
          <h1 className="font-serif text-3xl md:text-4xl text-warm-white mb-2">
            {museum.name}
          </h1>
          <p className="text-warm-white-dim/60 text-sm">{museum.nameEn}</p>
        </div>
      </div>

      {/* Info bar */}
      <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-film-black-lighter">
        <div className="flex items-center gap-1.5 text-warm-white-dim/70 text-sm">
          <MapPin className="w-4 h-4 text-amber-gold" />
          <span>{museum.city}</span>
        </div>
        <span className="text-warm-white-dim/30">|</span>
        <span className="text-warm-white-dim/70 text-sm">{museum.type}</span>
        <span className="text-warm-white-dim/30">|</span>
        <div className="flex flex-wrap gap-2">
          {museum.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-film-black-lighter text-warm-white-dim/60 text-xs"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <section>
            <h2 className="font-serif text-xl text-amber-gold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-amber-gold rounded-full" />
              简介
            </h2>
            <p className="text-warm-white-dim/80 leading-relaxed">{museum.description}</p>
          </section>

          {/* Space observation */}
          <section>
            <h2 className="font-serif text-xl text-amber-gold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-amber-gold rounded-full" />
              空间观察
            </h2>
            <p className="text-warm-white-dim/80 leading-relaxed">{museum.spaceObservation}</p>
          </section>

          {/* Exhibition analysis */}
          <section>
            <h2 className="font-serif text-xl text-amber-gold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-amber-gold rounded-full" />
              展陈分析
            </h2>
            <p className="text-warm-white-dim/80 leading-relaxed">{museum.exhibitionAnalysis}</p>
          </section>
        </div>

        {/* Sidebar info */}
        <div className="space-y-6">
          <div className="bg-film-black-light border border-film-black-lighter rounded-xl p-5">
            <h3 className="text-sm text-warm-white-dim/50 uppercase tracking-wider mb-3">
              基本信息
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-warm-white-dim/40">中文名称</p>
                <p className="text-sm text-warm-white">{museum.name}</p>
              </div>
              <div>
                <p className="text-xs text-warm-white-dim/40">英文名称</p>
                <p className="text-sm text-warm-white">{museum.nameEn}</p>
              </div>
              <div>
                <p className="text-xs text-warm-white-dim/40">城市</p>
                <p className="text-sm text-warm-white">{museum.city}</p>
              </div>
              <div>
                <p className="text-xs text-warm-white-dim/40">类型</p>
                <p className="text-sm text-warm-white">{museum.type}</p>
              </div>
              <div>
                <p className="text-xs text-warm-white-dim/40">坐标</p>
                <p className="text-sm text-warm-white">
                  {museum.coordinates[0].toFixed(4)}°, {museum.coordinates[1].toFixed(4)}°
                </p>
              </div>
            </div>
          </div>

          <a
            href={`/map`}
            className="block text-center w-full px-4 py-3 bg-dark-red hover:bg-dark-red-hover text-warm-white rounded-lg text-sm transition-all"
          >
            在地图上查看
          </a>
        </div>
      </div>

      {/* Photo gallery */}
      <section className="mb-12">
        <h2 className="font-serif text-xl text-amber-gold mb-6 flex items-center gap-2">
          <span className="w-1 h-5 bg-amber-gold rounded-full" />
          照片墙
        </h2>
        <PhotoGallery photos={museum.photos} />
      </section>

      {/* Related museums */}
      {relatedMuseums.length > 0 && (
        <section>
          <h2 className="font-serif text-xl text-amber-gold mb-6 flex items-center gap-2">
            <span className="w-1 h-5 bg-amber-gold rounded-full" />
            同城展示空间
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedMuseums.map((m) => (
              <MuseumCard key={m.id} museum={m} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
