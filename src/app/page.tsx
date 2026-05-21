import Link from 'next/link';
import { ArrowDown, Map, Route } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-film-black">
      {/* Film projection beam effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full bg-radial from-amber-gold/8 via-amber-gold/3 to-transparent animate-beam" />
        <div
          className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-radial from-dark-red/10 via-dark-red/3 to-transparent animate-beam"
          style={{ animationDelay: '2s' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[300px] bg-linear-to-b from-transparent via-amber-gold/20 to-transparent animate-flicker" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[300px] bg-linear-to-b from-transparent via-amber-gold/10 to-transparent animate-flicker"
          style={{ transform: 'translate(-50%, -50%) rotate(15deg)', transformOrigin: 'bottom center' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[300px] bg-linear-to-b from-transparent via-amber-gold/10 to-transparent animate-flicker"
          style={{ transform: 'translate(-50%, -50%) rotate(-15deg)', transformOrigin: 'bottom center' }}
        />
      </div>

      {/* Film sprocket holes decoration */}
      <div className="absolute left-4 md:left-12 top-1/4 bottom-1/4 w-[4px] flex flex-col gap-4 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="w-full aspect-square rounded-sm bg-amber-gold/60" />
        ))}
      </div>
      <div className="absolute right-4 md:right-12 top-1/4 bottom-1/4 w-[4px] flex flex-col gap-4 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="w-full aspect-square rounded-sm bg-amber-gold/60" />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <div className="mb-4">
          <span className="inline-block text-xs tracking-[0.3em] text-amber-gold/60 uppercase">
            An Online Atlas of Chinese Film Exhibition Spaces
          </span>
        </div>
        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-warm-white leading-[1.12] mb-6 tracking-normal">
          中国电影展示空间的
          <span className="block text-amber-gold">线上图谱</span>
        </h1>
        <p className="text-warm-white-dim/80 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          以数字地图为媒介，串联中国电影博物馆与展示空间，
          构建一部关于电影文化遗产的时空档案。
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/map"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-dark-red hover:bg-dark-red-hover text-warm-white rounded-lg transition-all duration-300 text-sm tracking-wide shadow-lg shadow-dark-red/20 hover:shadow-dark-red/40"
          >
            <Map className="w-4 h-4" />
            进入地图
          </Link>
          <Link
            href="/exhibition-routes"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-amber-gold/40 text-warm-white hover:bg-amber-gold/10 rounded-lg transition-all duration-300 text-sm tracking-wide"
          >
            <Route className="w-4 h-4" />
            查看展线
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-warm-white-dim/40">
        <span className="text-xs tracking-wider">向下滚动</span>
        <ArrowDown className="w-4 h-4 animate-float" />
      </div>
    </div>
  );
}
