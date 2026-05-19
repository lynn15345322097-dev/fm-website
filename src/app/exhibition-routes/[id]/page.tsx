import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Map, ArrowLeft } from 'lucide-react';
import { getExhibitionRouteById } from '@/data/exhibitionRoutes';
import { getMuseumsByIds } from '@/lib/museums';
import MuseumCard from '@/components/MuseumCard';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ExhibitionRouteDetailPage({ params }: Props) {
  const { id } = await params;
  const route = getExhibitionRouteById(id);

  if (!route) {
    notFound();
  }

  const routeMuseums = getMuseumsByIds(route.museums);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back link */}
      <Link
        href="/exhibition-routes"
        className="inline-flex items-center gap-1.5 text-warm-white-dim/50 hover:text-amber-gold text-sm transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        返回展线列表
      </Link>

      {/* Header */}
      <div className="mb-10">
        <h1 className="font-serif text-3xl md:text-4xl text-warm-white mb-3">
          {route.title}
        </h1>
        <p className="text-amber-gold/60 text-sm mb-4">{route.subtitle}</p>
        <p className="text-warm-white-dim/70 leading-relaxed">{route.summary}</p>
      </div>

      {/* Content */}
      <div className="mb-12">
        {route.content.split('\n\n').map((paragraph, i) => {
          if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
            return (
              <h2 key={i} className="font-serif text-xl text-amber-gold mt-8 mb-4">
                {paragraph.replace(/\*\*/g, '')}
              </h2>
            );
          }
          return (
            <p key={i} className="text-warm-white-dim/80 leading-relaxed mb-4">
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* Associated museums */}
      <section className="border-t border-film-black-lighter pt-10">
        <h2 className="font-serif text-xl text-amber-gold mb-6">
          途经展示空间
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {routeMuseums.map((m) => (
            <MuseumCard key={m.id} museum={m} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/map`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-dark-red hover:bg-dark-red-hover text-warm-white rounded-lg text-sm transition-all"
          >
            <Map className="w-4 h-4" />
            在地图上查看全部点位
          </Link>
        </div>
      </section>
    </div>
  );
}
