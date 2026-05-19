import { Info, BookOpen, Database, User } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-gold/10 text-amber-gold text-xs tracking-wider mb-4">
          <Info className="w-3 h-3" />
          关于项目
        </div>
        <h1 className="font-serif text-3xl md:text-4xl text-warm-white mb-4">
          关于
        </h1>
        <p className="text-warm-white-dim/70 max-w-2xl mx-auto leading-relaxed">
          一个以数字人文方法研究中国电影展示空间的学术项目。
        </p>
      </div>

      <div className="space-y-10">
        {/* Section: 研究背景 */}
        <section className="bg-film-black-light border border-film-black-lighter rounded-xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-amber-gold" />
            <h2 className="font-serif text-xl text-warm-white">研究背景</h2>
          </div>
          <div className="space-y-4 text-warm-white-dim/80 leading-relaxed">
            <p>
              电影展示空间——包括电影博物馆、电影主题展览、影视基地等——是电影文化的重要组成部分。
              它们不仅保存和展示电影的物质遗产（设备、道具、服装、剧本），更通过空间叙事的方式
              向公众传递电影的历史、美学和技术知识。
            </p>
            <p>
              然而，中国的电影展示空间分布广泛、类型多样，目前尚缺乏一个系统的、可视化的知识平台
              来呈现这一文化图景。本项目尝试以数字地图和图像档案为媒介，构建一个关于
              中国电影展示空间的线上图谱，为人文学者、策展人和电影爱好者提供一个探索性的知识工具。
            </p>
            <p>
              本项目采用数字人文（Digital Humanities）的研究方法，将地理信息系统（GIS）、
              空间分析与电影史研究相结合，探索电影文化遗产的数字化展示与传播路径。
            </p>
          </div>
        </section>

        {/* Section: 数据来源 */}
        <section className="bg-film-black-light border border-film-black-lighter rounded-xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-5 h-5 text-amber-gold" />
            <h2 className="font-serif text-xl text-warm-white">数据来源</h2>
          </div>
          <div className="space-y-4 text-warm-white-dim/80 leading-relaxed">
            <p>本项目的博物馆信息与影像资料来源于以下渠道：</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>各博物馆官方公开信息与展览资料</li>
              <li>学术文献与研究出版物中的相关论述</li>
              <li>实地考察与田野调查记录</li>
              <li>网络开放数据与数字档案</li>
            </ul>
            <p className="text-sm text-warm-white-dim/50 mt-4">
              本项目为学术研究用途，所有数据仅用于非商业性的知识展示与传播。
              如涉及版权问题，请联系项目维护者进行处理。
            </p>
          </div>
        </section>

        {/* Section: 技术栈 */}
        <section className="bg-film-black-light border border-film-black-lighter rounded-xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-5 h-5 text-amber-gold" />
            <h2 className="font-serif text-xl text-warm-white">技术实现</h2>
          </div>
          <div className="space-y-4 text-warm-white-dim/80 leading-relaxed">
            <p>本项目基于以下技术构建：</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              {[
                { label: 'Next.js 16', desc: '应用框架' },
                { label: 'TypeScript', desc: '类型系统' },
                { label: 'Tailwind CSS v4', desc: '样式框架' },
                { label: 'Leaflet', desc: '地图可视化' },
                { label: 'React 19', desc: 'UI 框架' },
                { label: 'Lucide', desc: '图标库' },
              ].map((tech) => (
                <div
                  key={tech.label}
                  className="bg-film-black border border-film-black-lighter rounded-lg p-3 text-center"
                >
                  <p className="text-sm text-warm-white">{tech.label}</p>
                  <p className="text-xs text-warm-white-dim/40 mt-1">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: 作者 */}
        <section className="bg-film-black-light border border-film-black-lighter rounded-xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-amber-gold" />
            <h2 className="font-serif text-xl text-warm-white">关于作者</h2>
          </div>
          <div className="space-y-4 text-warm-white-dim/80 leading-relaxed">
            <p>
              本项目为数字人文方向的学术探索，旨在通过数字技术拓展电影史研究的边界。
              作者关注电影文化遗产的保护与传播，以及数字技术在人文研究中的创新应用。
            </p>
            <p className="text-sm text-warm-white-dim/50">
              如有任何问题或建议，欢迎通过项目 GitHub 仓库提交 Issue 或联系作者。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
