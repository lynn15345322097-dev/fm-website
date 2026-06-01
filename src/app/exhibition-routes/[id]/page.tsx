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
    <div className="min-h-screen bg-[#f5f0e8]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/exhibition-routes"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-dark-red transition-colors hover:text-amber-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          返回展线列表
        </Link>

        <header className="mb-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="mb-3 text-xs tracking-[0.16em] text-amber-gold/70">
            CURATED RESEARCH ROUTE
          </p>
          <h1 className="font-serif text-2xl leading-tight text-stone-950 md:text-3xl">
            {route.title}
          </h1>
          <p className="mt-2 text-xs text-stone-500">{route.subtitle}</p>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-stone-600">
            {route.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-stone-600">
              {route.chapters.length} 个章节
            </span>
            <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-stone-600">
              {routeMuseums.length} 个关联空间
            </span>
          </div>
        </header>

        {/* Route Map */}
        <section className="mb-8 rounded-2xl border border-stone-200 overflow-hidden shadow-sm" style={{ height: 380 }}>
          <RouteMapView routeMuseums={routeMuseums} routeIndex={0} />
        </section>

        <section className="space-y-6">
          {route.chapters.map((chapter, index) => {
            const museums = getMuseumsByIds(chapter.museumIds);
            return (
              <article
                key={chapter.title}
                className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
              >
                <div className="grid gap-5 lg:grid-cols-[240px_1fr]">
                  <div>
                    <p className="mb-2 font-serif text-3xl text-amber-gold/30">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h2 className="font-serif text-xl text-stone-950">
                      {chapter.title}
                    </h2>
                    <p className="mt-2 text-xs leading-6 text-stone-500">
                      {chapter.subtitle}
                    </p>
                  </div>

                  <div>
                    <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                      <div className="mb-2 flex items-center gap-2 text-xs text-amber-gold">
                        <Search className="h-3.5 w-3.5" />
                        研究问题
                      </div>
                      <p className="text-sm leading-7 text-stone-700">
                        {chapter.researchQuestion}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {chapter.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-800"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {museums.map((museum) => (
                        <div
                          key={museum.id}
                          className="rounded-xl border border-stone-200 bg-stone-50 p-4"
                        >
                          <p className="text-sm font-medium text-stone-900">
                            {museum.name}
                          </p>
                          <p className="mt-1 text-xs text-stone-500">
                            {museum.province} · {museum.city} · {museum.nature}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Link
                              href={`/museum/${museum.id}`}
                              className="inline-flex items-center gap-1 rounded-md border border-amber-gold/50 px-2.5 py-1.5 text-xs text-dark-red hover:bg-amber-gold/10 transition-colors"
                            >
                              进入详情
                              <ArrowRight className="h-3 w-3" />
                            </Link>
                            <Link
                              href="/map"
                              className="inline-flex items-center gap-1 rounded-md border border-stone-300 px-2.5 py-1.5 text-xs text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors"
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

        <section className="mt-8 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="font-serif text-lg text-dark-red">展线导言</h2>
          <div className="mt-3 space-y-3">
            {route.content.split('\n\n').slice(0, 3).map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-sm leading-7 text-stone-600">
                {paragraph.replace(/\*\*/g, '')}
              </p>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
