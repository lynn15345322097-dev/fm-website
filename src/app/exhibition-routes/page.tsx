import Link from 'next/link';
import { Route, ArrowRight } from 'lucide-react';
import { getAllExhibitionRoutes } from '@/data/exhibitionRoutes';
import { getMuseumsByIds } from '@/lib/museums';

export default function ExhibitionRoutesPage() {
  const routes = getAllExhibitionRoutes();

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-gold/25 bg-amber-gold/10 px-3 py-1 text-xs tracking-[0.16em] text-amber-gold">
            <Route className="w-3 h-3" />
            策展路线
          </div>
          <h1 className="font-serif text-3xl text-stone-950">
            展线
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-sm leading-7 text-stone-600">
            三条主题展线，从不同维度串联中国电影展示空间。
            每一条展线都是一次关于电影文化遗产的策展叙事。
          </p>
        </div>

        {/* Routes */}
        <div className="space-y-6">
          {routes.map((route, index) => {
            const routeMuseums = getMuseumsByIds(route.museums);
            return (
              <Link
                key={route.id}
                href={`/exhibition-routes/${route.id}`}
                className="group block rounded-2xl border border-stone-200 bg-white shadow-sm hover:border-amber-gold/40 hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Number indicator */}
                  <div className="flex items-center justify-center bg-stone-50 p-6 md:w-24 md:p-0 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
                    <span className="font-serif text-4xl text-amber-gold/30">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 md:py-5 md:pr-5">
                    <h2 className="font-serif text-lg text-stone-950 group-hover:text-dark-red transition-colors mb-1.5">
                      {route.title}
                    </h2>
                    <p className="text-xs text-amber-gold/80 mb-2.5">{route.subtitle}</p>
                    <p className="text-stone-600 text-xs leading-6 mb-4 line-clamp-2">
                      {route.summary}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-stone-500">
                          {route.chapters.length} 个章节
                        </span>
                        <span className="text-stone-300">·</span>
                        <span className="text-xs text-stone-500">
                          途经 {routeMuseums.length} 个展示空间
                        </span>
                        <span className="text-stone-300">·</span>
                        <div className="flex -space-x-2">
                          {routeMuseums.slice(0, 4).map((m) => (
                            <div
                              key={m.id}
                              className="w-6 h-6 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center"
                              title={m.name}
                            >
                              <span className="text-[8px] text-stone-500">
                                {m.city.charAt(0)}
                              </span>
                            </div>
                          ))}
                          {routeMuseums.length > 4 && (
                            <div className="w-6 h-6 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center">
                              <span className="text-[8px] text-stone-500">
                                +{routeMuseums.length - 4}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-amber-gold/40 group-hover:text-amber-gold transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
