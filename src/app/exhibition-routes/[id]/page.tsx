import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Map, Search } from 'lucide-react';
import { getExhibitionRouteById } from '@/data/exhibitionRoutes';
import { getMuseumsByIds } from '@/lib/museums';
import RouteMapView from './RouteMapView';

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
    <div className="min-h-screen bg-film-black text-warm-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/exhibition-routes"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-warm-white-dim/55 transition-colors hover:text-amber-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          返回展线列表
        </Link>

        <header className="mb-10 rounded-2xl border border-amber-gold/15 bg-linear-to-br from-film-black-light via-film-black to-dark-red/15 p-6 md:p-8">
          <p className="mb-3 text-xs tracking-[0.22em] text-amber-gold/70">
            CURATED RESEARCH ROUTE
          </p>
          <h1 className="font-serif text-3xl leading-tight text-warm-white md:text-5xl">
            {route.title}
          </h1>
          <p className="mt-3 text-sm text-amber-gold/70">{route.subtitle}</p>
          <p className="mt-5 max-w-4xl leading-8 text-warm-white-dim/78">
            {route.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs text-warm-white-dim/60">
            <span className="rounded-full border border-film-black-lighter bg-film-black-light px-3 py-1">
              {route.chapters.length} 个章节
            </span>
            <span className="rounded-full border border-film-black-lighter bg-film-black-light px-3 py-1">
              {routeMuseums.length} 个关联空间
            </span>
          </div>
        </header>

        {/* Route Map */}
        <section className="mb-10 rounded-2xl border border-amber-gold/15 bg-film-black-light/50 overflow-hidden" style={{ height: 420 }}>
          <RouteMapView routeMuseums={routeMuseums} routeIndex={0} />
        </section>

        <section className="space-y-6">
          {route.chapters.map((chapter, index) => {
            const museums = getMuseumsByIds(chapter.museumIds);
            return (
              <article
                key={chapter.title}
                className="rounded-2xl border border-film-black-lighter bg-film-black-light/70 p-5 shadow-xl shadow-black/20 md:p-6"
              >
                <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
                  <div>
                    <p className="mb-3 font-serif text-4xl text-amber-gold/30">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h2 className="font-serif text-2xl text-warm-white">
                      {chapter.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-warm-white-dim/65">
                      {chapter.subtitle}
                    </p>
                  </div>

                  <div>
                    <div className="rounded-xl border border-amber-gold/15 bg-film-black/55 p-4">
                      <div className="mb-2 flex items-center gap-2 text-sm text-amber-gold">
                        <Search className="h-4 w-4" />
                        研究问题
                      </div>
                      <p className="leading-7 text-warm-white-dim/82">
                        {chapter.researchQuestion}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {chapter.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded-full bg-amber-gold/10 px-3 py-1 text-xs text-amber-gold/85"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {museums.map((museum) => (
                        <div
                          key={museum.id}
                          className="rounded-xl border border-film-black-lighter bg-film-black p-4"
                        >
                          <p className="text-sm font-medium text-warm-white">
                            {museum.name}
                          </p>
                          <p className="mt-1 text-xs text-warm-white-dim/55">
                            {museum.province} · {museum.city} · {museum.nature}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Link
                              href={`/museum/${museum.id}`}
                              className="inline-flex items-center gap-1 rounded-md border border-amber-gold/25 px-2.5 py-1.5 text-xs text-amber-gold hover:bg-amber-gold/10"
                            >
                              进入详情
                              <ArrowRight className="h-3 w-3" />
                            </Link>
                            <Link
                              href="/map"
                              className="inline-flex items-center gap-1 rounded-md border border-dark-red/45 px-2.5 py-1.5 text-xs text-warm-white-dim hover:bg-dark-red/20 hover:text-warm-white"
                            >
                              <Map className="h-3 w-3" />
                              地图定位
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <section className="mt-10 rounded-2xl border border-film-black-lighter bg-film-black-light/60 p-6">
          <h2 className="font-serif text-xl text-amber-gold">展线导言</h2>
          <div className="mt-4 space-y-4">
            {route.content.split('\n\n').slice(0, 3).map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="leading-8 text-warm-white-dim/72">
                {paragraph.replace(/\*\*/g, '')}
              </p>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
