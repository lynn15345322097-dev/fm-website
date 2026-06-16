> ⚠️ **本项目已迁移 / Repository moved**
>
> 本仓库已停止更新，最新工作集中在 **影迹图谱 FilmGeo Atlas**：
> 👉 https://github.com/lynn15345322097-dev/film-on-display
>
> This repository is no longer maintained. Continued development of the
> China film exhibition spaces atlas has moved to **FilmGeo Atlas**:
> 👉 https://github.com/lynn15345322097-dev/film-on-display

---

# 中国电影展示空间线上图谱

Chinese Film Exhibition Spaces — Online Atlas & Open Archive

本项目以中国电影博物馆及相关展示空间为对象，通过田野调研、GIS 空间制图、展陈信息整理和照片元数据归档，建立一个可持续更新的线上展览与开放资料库。

## 项目定位

这是一个**数字人文研究项目**，而非商业产品。项目旨在：

- 系统记录中国电影博物馆、电影资料馆、制片厂旧址、民间收藏馆等展示空间的基础信息
- 通过 GIS 地图呈现电影展示空间的地理分布格局
- 归档田野考察照片及其元数据，建立可引用的视觉档案
- 提供策展研究路线，探索电影如何被空间化、博物馆化和遗产化

## 技术栈

- **前端框架**：Next.js 16 (App Router) + React 19
- **样式**：Tailwind CSS 4
- **地图**：Leaflet + react-leaflet 5 + MarkerCluster
- **图表**：ECharts + echarts-for-react
- **语言**：TypeScript
- **包管理**：npm

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器 (默认 http://localhost:3000)
npm run dev

# 构建生产版本
npm run build

# 数据校验
node scripts/validate-data.js
```

## 项目结构

```
fm-website/
├── data/                  # 结构化数据（博物馆、展览、照片、分类、参考文献）
│   ├── museums.json       # 博物馆基础信息
│   ├── exhibitions.json   # 展览与策展研究路线
│   ├── photos.json        # 田野照片元数据
│   ├── categories.json    # 分类体系
│   ├── references.csl.json
│   └── schema/            # JSON Schema 定义
├── src/
│   ├── app/               # Next.js App Router 页面
│   ├── components/        # React 组件
│   ├── lib/               # 数据访问层
│   └── types/             # TypeScript 类型定义
├── public/
│   └── geojson/           # 中国省级行政区划 GeoJSON
├── references/            # 参考文献（BibTeX + Markdown）
├── docs/                  # 数据模型与权利说明文档
├── scripts/
│   └── validate-data.js   # 数据完整性校验
├── field-photos/          # 田野照片原始文件（待入库）
├── LICENSE-CODE           # 代码许可 (MIT)
├── LICENSE-DATA           # 数据许可 (CC BY-NC-SA 4.0)
├── LICENSE-MEDIA          # 媒体文件许可说明
└── CONTRIBUTING.md        # 贡献指南
```

## 数据覆盖

- **博物馆记录**：36 条
- **已实地考察**：17 处
- **照片元数据**：187 条（分类：建筑外观、展厅空间、技术器物、场景复原、互动装置；当前为待入库占位元数据）
- **策展研究路线**：3 条
- **覆盖地区**：华北、东北、华东、华中、华南、西南、西北、港澳台

## 田野照片入库规则

- `field-photos/` 是原始田野照片暂存区，不等于线上公开图片库。
- `data/photos.json` 记录照片元数据、权利状态和可见性；当前 187 条记录用于预留档案结构，实际图片文件尚未批量发布。
- 只有完成筛选、压缩、命名、权利核验后的图片，才应放入 `public/images/` 并在 `data/photos.json` 中更新 `filename` 和 `thumbnail`。
- 默认可见性为 `public_thumbnail_only`。除非摄影师版权、馆方限制和肖像权均已确认，否则不要设为 `public`。
- 网站在没有真实图片文件时会使用分类占位图块，避免误把未授权照片公开。

## 许可与授权

本项目采用**分层授权**：

- **代码**：MIT License（见 `LICENSE-CODE`）
- **数据**：CC BY-NC-SA 4.0（见 `LICENSE-DATA`）
- **照片/媒体**：逐张授权，以 `data/photos.json` 中每条记录的 `rights` 和 `visibility` 字段为准（见 `LICENSE-MEDIA`）

重要说明：
- 照片不默认公开。每张照片的可见性（`visibility`）默认为 `public_thumbnail_only`。
- `photos.json` 中的占位元数据不代表对应图片文件已经公开发布。
- 照片版权（摄影师权利）≠ 展品版权（博物馆/馆方权利），详见 `docs/rights-and-licenses.md`。
- 坐标信息以 `geo.coordinate_source` 为准，标记为 `pending_verification` 的坐标尚未经过实地 GPS 核验。

## 致谢

本项目为中国电影展示空间田野调查的阶段性成果。感谢各博物馆、资料馆和研究机构的协助。

## 联系方式

项目维护者：Liu Xuan
