import Link from 'next/link';
import { Route, ArrowRight } from 'lucide-react';
import { getAllExhibitionRoutes } from '@/data/exhibitionRoutes';
import { getMuseumsByIds } from '@/lib/museums';

export default function ExhibitionRoutesPage() {
  const routes = getAllExhibitionRoutes();

  return (
    <div className="min-h-screen bg-film-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-gold/10 text-amber-gold text-xs tracking-wider mb-4">
          <Route className="w-3 h-3" />
          策展路线
        </div>
        <h1 className="font-serif text-3xl md:text-4xl text-warm-white mb-4">
          展线
        </h1>
        <p className="text-warm-white-dim/70 max-w-2xl mx-auto leading-relaxed">
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
              className="group block bg-film-black-light border border-film-black-lighter rounded-xl overflow-hidden hover:border-amber-gold/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-gold/5"
            >
              <div className="flex flex-col md:flex-row">
                {/* Number indicator */}
                <div className="md:w-24 flex items-center justify-center bg-linear-to-b from-amber-gold/10 to-transparent p-6 md:p-0">
                  <span className="font-serif text-4xl text-amber-gold/30">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 md:py-6 md:pr-6">
                  <h2 className="font-serif text-xl text-warm-white group-hover:text-amber-gold transition-colors mb-2">
                    {route.title}
                  </h2>
                  <p className="text-sm text-amber-gold/60 mb-3">{route.subtitle}</p>
                  <p className="text-warm-white-dim/70 text-sm leading-relaxed mb-4 line-clamp-2">
                    {route.summary}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-warm-white-dim/40">
                        {route.chapters.length} 个章节
                      </span>
                      <span className="text-warm-white-dim/20">·</span>
                      <span className="text-xs text-warm-white-dim/40">
                        途经 {routeMuseums.length} 个展示空间
                      </span>
                      <span className="text-warm-white-dim/20">·</span>
                      <div className="flex -space-x-2">
                        {routeMuseums.slice(0, 4).map((m) => (
                          <div
                            key={m.id}
                            className="w-6 h-6 rounded-full bg-linear-to-br from-film-black-lighter to-dark-red/30 border border-film-black-lighter flex items-center justify-center"
                            title={m.name}
                          >
                            <span className="text-[8px] text-warm-white-dim/60">
                              {m.city.charAt(0)}
                            </span>
                          </div>
                        ))}
                        {routeMuseums.length > 4 && (
                          <div className="w-6 h-6 rounded-full bg-film-black-lighter border border-film-black-lighter flex items-center justify-center">
                            <span className="text-[8px] text-warm-white-dim/40">
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
