import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2, MapPin, Tag } from 'lucide-react';
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
    <div className="bg-[#f5f0e8]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/map"
          className="mb-6 inline-flex items-center gap-2 text-sm text-dark-red hover:text-amber-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          返回地图
        </Link>

        <section className="rounded-xl border border-amber-gold/25 bg-film-black-light p-5 shadow-xl shadow-black/15 md:p-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            <div>
              <p className="mb-3 text-xs tracking-[0.16em] text-amber-gold/75 uppercase">
                {museum.region} / {museum.province} / {museum.city}
              </p>
              <h1 className="font-serif text-2xl font-semibold leading-[1.16] text-warm-white md:text-3xl">
                {museum.name}
              </h1>
              <p className="mt-3 text-sm text-warm-white-dim/75">{museum.nameEn}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-amber-gold/35 bg-amber-gold/10 px-2.5 py-1 text-xs text-amber-gold">
                  {museum.nature}
                </span>
                {museum.visited && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-dark-red/35 bg-dark-red/20 px-2.5 py-1 text-xs text-warm-white">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    已实地考察
                  </span>
                )}
                {museum.tags.slice(0, 8).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full border border-warm-white/10 bg-warm-white/8 px-2.5 py-1 text-xs text-warm-white-dim"
                  >
                    <Tag className="h-3.5 w-3.5" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <aside className="rounded-xl border border-amber-gold/20 bg-film-black/55 p-4">
              <h2 className="mb-4 text-sm font-semibold text-warm-white">基本信息</h2>
              <dl className="space-y-3 text-xs">
                <div>
                  <dt className="text-warm-white-dim/55">地址</dt>
                  <dd className="mt-1 text-warm-white">{museum.address}</dd>
                </div>
                <div>
                  <dt className="text-warm-white-dim/55">类型</dt>
                  <dd className="mt-1 text-warm-white">{museum.type}</dd>
                </div>
                <div>
                  <dt className="text-warm-white-dim/55">坐标</dt>
                  <dd className="mt-1 text-warm-white">
                    {museum.coordinates[0].toFixed(4)}, {museum.coordinates[1].toFixed(4)}
                  </dd>
                </div>
              </dl>
              <Link
                href="/map"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-dark-red px-4 py-2.5 text-xs font-medium text-warm-white hover:bg-dark-red-hover"
              >
                <MapPin className="h-4 w-4" />
                在地图中查看
              </Link>
            </aside>
          </div>
        </section>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <main className="space-y-5 lg:col-span-2">
            {[
              ['简介', museum.description],
              ['空间观察', museum.spaceObservation],
              ['展陈分析', museum.exhibitionAnalysis],
            ].map(([title, text]) => (
              <section key={title} className="rounded-xl border border-stone-200 bg-white/92 p-5 shadow-sm">
                <h2 className="mb-3 text-lg font-semibold text-stone-950">{title}</h2>
                <p className="text-sm leading-7 text-stone-700">{text}</p>
              </section>
            ))}
          </main>

          <aside className="rounded-xl border border-amber-gold/20 bg-film-black-light p-5 shadow-sm">
            <h2 className="mb-3 text-base font-semibold text-warm-white">研究提示</h2>
            <ul className="space-y-3 text-xs leading-6 text-warm-white-dim">
              <li>观察空间入口与展厅动线如何组织电影史叙事。</li>
              <li>记录技术器物、场景复原和互动装置的比例。</li>
              <li>补充实地照片后，可进入图像档案分类展示。</li>
            </ul>
          </aside>
        </div>

        <section className="mt-6 rounded-xl border border-stone-200 bg-white/92 p-5 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-stone-950">照片墙</h2>
          <PhotoGallery photos={museum.photos} />
        </section>

        {relatedMuseums.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-5 text-lg font-semibold text-stone-950">同城展示空间</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
