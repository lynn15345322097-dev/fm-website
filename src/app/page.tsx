import Link from 'next/link';
import { Map, Route, BarChart3, Camera, Server, Building2, CheckCircle2, Layers, ImageIcon } from 'lucide-react';
import { getSpatialStats } from '@/lib/museums';
import { PHOTO_CATEGORIES } from '@/types';

export default function HomePage() {
  const stats = getSpatialStats();

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* ======== Hero Section ======== */}
        <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:items-center">
          {/* Left */}
          <div>
            <p className="mb-3 text-xs tracking-[0.16em] text-amber-gold/70 uppercase">
              Digital Humanities / GIS Atlas
            </p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-950 leading-[1.15] mb-5">
              中国电影展示空间的
              <span className="block text-amber-700">线上图谱</span>
            </h1>
            <p className="text-sm md:text-base leading-7 text-stone-600 mb-8 max-w-xl">
              以 GIS 空间制图、田野图像与展陈分析为方法，整理中国电影博物馆、
              影像档案空间、制片厂旧址、技术收藏空间与地方电影展示空间。
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Link
                href="/map"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-dark-red hover:bg-dark-red-hover text-white rounded-lg transition-all duration-300 text-sm"
              >
                <Map className="w-4 h-4" />
                进入地图
              </Link>
              <Link
                href="/exhibition-routes"
                className="inline-flex items-center gap-2 px-6 py-2.5 border border-stone-300 text-stone-700 hover:bg-stone-100 rounded-lg transition-all duration-300 text-sm"
              >
                <Route className="w-4 h-4" />
                查看展线
              </Link>
            </div>
          </div>

          {/* Right: Data summary */}
          <div className="space-y-3">
            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-gold/10">
                  <Building2 className="h-5 w-5 text-amber-gold" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-950">{stats.totalCount}</p>
                  <p className="text-xs text-stone-500">展示空间</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100">
                  <CheckCircle2 className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-950">
                    {stats.visitedCount}
                    <span className="ml-1 text-sm font-normal text-stone-500">
                      / {((stats.visitedCount / stats.totalCount) * 100).toFixed(0)}%
                    </span>
                  </p>
                  <p className="text-xs text-stone-500">已实地考察</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100">
                  <Layers className="h-5 w-5 text-purple-700" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-950">{stats.typeStats.length}</p>
                  <p className="text-xs text-stone-500">空间类型</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
                  <ImageIcon className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-950">{PHOTO_CATEGORIES.length}</p>
                  <p className="text-xs text-stone-500">图像档案分类</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======== Method Cards ======== */}
        <div className="mt-16">
          <p className="mb-2 text-xs tracking-[0.16em] text-amber-gold/70 uppercase">
            Research Methods
          </p>
          <h2 className="font-serif text-2xl text-stone-950 md:text-3xl mb-6">
            研究方法
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            {/* GIS 空间制图 */}
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-gold/10">
                <Map className="h-5 w-5 text-amber-gold" />
              </div>
              <h3 className="font-serif text-lg text-stone-950 mb-2">GIS 空间制图</h3>
              <p className="text-sm leading-7 text-stone-600">
                通过地理信息系统测绘中国电影展示空间分布，分析区域密度、城市集聚与制片厂旧址转型，建立可查询的空间数据库。
              </p>
            </div>

            {/* 田野图像档案 */}
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                <Camera className="h-5 w-5 text-green-700" />
              </div>
              <h3 className="font-serif text-lg text-stone-950 mb-2">田野图像档案</h3>
              <p className="text-sm leading-7 text-stone-600">
                以建筑外观、展厅空间、技术器物、场景复原与互动装置为分类框架，建立可持续补充的视觉档案系统。
              </p>
            </div>

            {/* 电影技术遗产分析 */}
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
                <Server className="h-5 w-5 text-purple-700" />
              </div>
              <h3 className="font-serif text-lg text-stone-950 mb-2">电影技术遗产分析</h3>
              <p className="text-sm leading-7 text-stone-600">
                关注摄影机、放映机、胶片、剪辑台与影院空间等媒介基础设施，将技术物视为电影史的物质证据。
              </p>
            </div>
          </div>
        </div>

        {/* ======== Research Entry ======== */}
        <div className="mt-12 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg text-stone-950 mb-1">空间分析</h3>
              <p className="text-sm leading-7 text-stone-600 max-w-2xl">
                基于 GIS 方法对中国电影展示空间进行多维度统计分析，涵盖地理分布、区域格局、空间类型与机构性质等维度。
              </p>
            </div>
            <Link
              href="/spatial-analysis"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-dark-red px-5 py-2.5 text-sm font-medium text-white hover:bg-dark-red-hover transition-colors"
            >
              <BarChart3 className="h-4 w-4" />
              进入空间分析
            </Link>
          </div>
        </div>

        {/* Bottom footer note */}
        <p className="mt-10 text-xs text-stone-400 leading-6">
          本项目为数字人文（Digital Humanities）学术研究的一部分，所有数据仅用于非商业性知识展示。
          涉及 GIS 空间分析、田野调查与媒介考古学方法。
        </p>
      </div>
    </div>
  );
}
