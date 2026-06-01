import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2, MapPin, Tag, Camera, ImageIcon } from 'lucide-react';
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

  const photoCategories = [...new Set(museum.photos.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href="/map"
          className="mb-6 inline-flex items-center gap-2 text-sm text-dark-red hover:text-amber-gold transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          返回地图
        </Link>

        {/* ======== Top header ======== */}
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              <p className="mb-3 text-xs tracking-[0.12em] text-amber-gold/70 uppercase">
                {museum.region} / {museum.province} / {museum.city}
              </p>
              <h1 className="font-serif text-3xl font-semibold leading-[1.2] text-stone-950 md:text-4xl">
                {museum.name}
              </h1>
              {museum.nameEn && (
                <p className="mt-3 text-sm text-stone-500 md:text-base">{museum.nameEn}</p>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-amber-gold/30 bg-amber-100 px-2.5 py-1 text-xs text-amber-800">
                  {museum.nature}
                </span>
                {museum.visited && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-green-300 bg-green-50 px-2.5 py-1 text-xs text-green-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    已实地考察
                  </span>
                )}
                {museum.tags.slice(0, 10).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-1 text-xs text-stone-600"
                  >
                    <Tag className="h-3.5 w-3.5" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Basic info */}
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
              <h2 className="mb-4 text-sm font-semibold text-stone-900">基本信息</h2>
              <dl className="space-y-3 text-xs">
                <div>
                  <dt className="text-stone-500">地址</dt>
                  <dd className="mt-1 text-stone-800">{museum.address}</dd>
                </div>
                <div>
                  <dt className="text-stone-500">类型</dt>
                  <dd className="mt-1 text-stone-800">{museum.type}</dd>
                </div>
                <div>
                  <dt className="text-stone-500">坐标</dt>
                  <dd className="mt-1 text-stone-800">
                    {museum.coordinates[0].toFixed(4)}, {museum.coordinates[1].toFixed(4)}
                  </dd>
                </div>
              </dl>
              <Link
                href="/map"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-dark-red px-4 py-2.5 text-xs font-medium text-white hover:bg-dark-red-hover transition-colors"
              >
                <MapPin className="h-4 w-4" />
                在地图中查看
              </Link>
            </div>
          </div>
        </section>

        {/* ======== Body: content + sidebar ======== */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
          {/* Left: main content */}
          <div className="space-y-4">
            {[
              ['简介', museum.description],
              ['空间观察', museum.spaceObservation],
              ['展陈分析', museum.exhibitionAnalysis],
            ].map(([title, text]) => (
              <section key={title} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <h2 className="mb-3 text-lg font-semibold text-stone-950">{title}</h2>
                <p className="text-sm leading-7 text-stone-700 md:text-base">{text}</p>
              </section>
            ))}
          </div>

          {/* Right: sidebar */}
          <aside className="space-y-4">
            {/* Field status */}
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-stone-900">田野状态</h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">实地考察</span>
                  <span className={museum.visited ? 'text-green-700 font-medium' : 'text-stone-400'}>
                    {museum.visited ? '已完成' : '未考察'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">照片档案</span>
                  <span className="text-stone-700 font-medium">{museum.photos.length} 张</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">照片分类</span>
                  <span className="text-stone-700 font-medium">{photoCategories.length} 类</span>
                </div>
              </div>
            </div>

            {/* Spatial tags */}
            {museum.tags.length > 0 && (
              <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <h3 className="mb-3 text-sm font-semibold text-stone-900">空间标签</h3>
                <div className="flex flex-wrap gap-1.5">
                  {museum.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2 py-1 text-xs text-stone-600"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Coordinates */}
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-stone-900">坐标信息</h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">经度</span>
                  <span className="text-stone-700 font-mono">{museum.coordinates[0].toFixed(4)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">纬度</span>
                  <span className="text-stone-700 font-mono">{museum.coordinates[1].toFixed(4)}</span>
                </div>
              </div>
              <Link
                href="/map"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <MapPin className="h-3.5 w-3.5" />
                在地图中定位
              </Link>
            </div>

            {/* Research tips */}
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-stone-900">研究提示</h3>
              <ul className="space-y-2.5 text-xs leading-6 text-stone-600">
                <li>观察空间入口与展厅动线如何组织电影史叙事。</li>
                <li>记录技术器物、场景复原和互动装置的比例。</li>
                <li>补充实地照片后，可进入图像档案分类展示。</li>
              </ul>
            </div>
          </aside>
        </div>

        {/* ======== Photo gallery (full width) ======== */}
        <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Camera className="h-4 w-4 text-amber-gold" />
            <h2 className="text-lg font-semibold text-stone-950">照片墙</h2>
          </div>
          <p className="mb-5 text-xs text-stone-500">
            {museum.photos.length > 0
              ? `${museum.photos.length} 张照片 · ${photoCategories.length} 个分类`
              : '暂未收录照片'}
          </p>
          <PhotoGallery photos={museum.photos} />
        </section>

        {/* ======== Related museums ======== */}
        {relatedMuseums.length > 0 && (
          <section className="mt-6">
            <h2 className="mb-4 text-lg font-semibold text-stone-950">同城展示空间</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedMuseums.map((m) => (
                <MuseumCard key={m.id} museum={m} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
