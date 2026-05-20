import Link from 'next/link';
import { Camera, Layers3, Map, Route, Search, Server, Workflow } from 'lucide-react';

const methods = [
  {
    title: 'GIS 空间制图',
    icon: Map,
    summary:
      '通过地图观察电影展示空间的区域分布、城市集聚、制片厂旧址转型和保护盲区。',
    points: ['区域分布与空间密度', '国家机构、地方馆与民间收藏的层级关系', '电影工业基地和城市文化中心的地理关联'],
  },
  {
    title: '田野摄影',
    icon: Camera,
    summary:
      '以建筑外观、展厅空间、技术器物、图文展板和互动装置为照片分类，建立可持续补充的图像档案。',
    points: ['记录入口、展线、展柜、说明文字和观众动线', '区分建筑外观、展厅空间、技术器物、场景复原、互动装置', '为后续比较不同场馆的展示策略提供视觉证据'],
  },
  {
    title: '展陈分析',
    icon: Layers3,
    summary:
      '从空间动线、展柜组织、说明文字、场景复原和观众互动等维度观察电影如何被转化为展览。',
    points: ['分析时间线叙事、专题模块和沉浸式装置', '关注文字、影像、器物和空间之间的组织关系', '比较国家馆、地方馆、旧址馆与民间收藏空间的展示差异'],
  },
  {
    title: '技术遗产分类',
    icon: Server,
    summary:
      '关注摄影机、放映机、胶片、剪辑台、录音设备、影院空间和电影厂旧址等电影媒介基础设施。',
    points: ['将技术物视为电影史的物质证据', '区分器物陈列、原址展示、互动体验和技术谱系', '观察技术设备如何从生产工具转化为公共记忆'],
  },
  {
    title: '媒介地理考察',
    icon: Workflow,
    summary:
      '把电影史从文本、作者和产业研究扩展为空间、地方记忆和媒介基础设施研究。',
    points: ['从城市、厂区、影院、档案库和乡村放映点理解电影文化', '关注地方影人、基层放映和非制度化收藏', '把地图、照片、展陈文本和田野笔记共同作为研究材料'],
  },
];

export default function MethodPage() {
  return (
    <div className="min-h-screen bg-film-black text-warm-white">
      <section className="relative overflow-hidden border-b border-amber-gold/15 px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(139,26,26,0.28),transparent_28%),radial-gradient(circle_at_78%_10%,rgba(212,160,74,0.12),transparent_24%)]" />
        <div className="relative mx-auto max-w-5xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-gold/25 bg-amber-gold/10 px-3 py-1 text-xs tracking-[0.22em] text-amber-gold">
            <Search className="h-3.5 w-3.5" />
            RESEARCH METHOD
          </div>
          <h1 className="font-serif text-4xl leading-tight md:text-6xl">
            研究方法
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-warm-white-dim/78 md:text-lg">
            这个网站不是普通展示页面，而是一个围绕中国电影展示空间展开的数字人文与博物馆研究项目。
            它把地图、田野照片、展陈观察和电影技术遗产分类组织在同一个档案系统中。
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
        {methods.map((method, index) => (
          <article
            key={method.title}
            className="rounded-2xl border border-film-black-lighter bg-film-black-light/72 p-6 shadow-xl shadow-black/20"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs text-amber-gold/60">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="font-serif text-2xl text-warm-white">{method.title}</h2>
              </div>
              <div className="rounded-xl border border-amber-gold/25 bg-amber-gold/10 p-3 text-amber-gold">
                <method.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="leading-7 text-warm-white-dim/78">{method.summary}</p>
            <ul className="mt-5 space-y-3">
              {method.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-6 text-warm-white-dim/70">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-dark-red" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-amber-gold/20 bg-linear-to-br from-amber-gold/10 via-film-black-light to-dark-red/15 p-6 md:p-8">
          <h2 className="font-serif text-2xl text-warm-white">从地图进入研究现场</h2>
          <p className="mt-3 max-w-3xl leading-7 text-warm-white-dim/75">
            后续田野照片、场馆笔记和展陈分析会继续接入同一套数据结构，使每一个点位既是地图坐标，也是一个可阅读、可比较、可追踪的研究样本。
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/map"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-dark-red px-5 py-3 text-sm font-medium text-warm-white hover:bg-dark-red-hover"
            >
              <Map className="h-4 w-4" />
              进入地图
            </Link>
            <Link
              href="/exhibition-routes"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-gold/35 px-5 py-3 text-sm font-medium text-amber-gold hover:bg-amber-gold/10"
            >
              <Route className="h-4 w-4" />
              查看展线
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
