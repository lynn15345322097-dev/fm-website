# 数据模型说明

## 为什么拆分 museums / exhibitions / photos / references

本项目将数据拆分为四个独立文件，遵循数字人文项目的数据管理最佳实践：

1. **museums.json**：存放博物馆的空间基础信息（名称、行政区划、地理坐标、分类）。这些信息相对稳定，不会因展陈变化而频繁更新。

2. **exhibitions.json**：存放展览、展厅单元和策展研究路线。通过 `museum_ids` 关联博物馆。展览是时间敏感的（常设展、特展、已撤展），独立存储便于追踪变更。

3. **photos.json**：存放田野照片的元数据。照片具有独立的版权状态、拍摄时间和权限管理需求。每张照片通过 `museum_id` 和可选的 `exhibition_id` 关联上级对象。照片版权（摄影师权利）≠ 展品版权（博物馆/藏家权利），分层管理使权限边界清晰。

4. **categories.json**：存放分类体系（空间类型、性质、照片分类），作为受控词表供其他文件引用。

5. **references.csl.json**：存放参考文献的 CSL-JSON 格式数据，可通过 `references` 数组关联到照片或展览。

## ID 命名规则

所有 ID 采用语义化命名，格式为 `{类型缩写}_{名称}_{可选序号}`：

- 博物馆 ID：`{city}-{type}-museum` 或 `{name}-museum`，例如 `cn-film-museum`、`sh-film-museum`
- 展览 ID：`{主题关键词}`，例如 `film-into-museum`
- 照片 ID：`photo_{museum_id}_{categories}_{序号}`，例如 `photo_cn_film_museum_tech_artifact_001`
- 参考文献 ID：`ref_{类型}_{作者}_{序号}`，例如 `ref_fieldnote_liu_001`

语义化 ID 的优势：
- 可读性强，无需查表即可理解含义
- 适合 Git 版本控制（对比 UUID）
- 便于人工审核和数据纠错
- 适合小型到中型数据集（< 10,000 条记录）

## museum_id 和 exhibition_id 的关联方式

- `photos.json` 中每条记录必须包含 `museum_id`，引用 `museums.json` 中的 `id` 字段。
- `exhibition_id` 为可选字段，引用 `exhibitions.json` 中的 `id` 字段。
- `exhibitions.json` 中的 `museum_ids` 数组引用博物馆。
- 验证脚本 `scripts/validate-data.js` 会在每次提交前检查所有外键引用完整性。

## 照片文件与元数据的关系

`photos.json` 是照片档案目录，不等同于图片文件本身。项目允许先建立占位元数据，再逐步补充真实图片文件。

- 原始田野照片先放在 `field-photos/`，按场馆和分类整理。
- 审核通过、允许公开的图片再进入 `public/images/`。
- `filename` 和 `thumbnail` 字段表示发布后的相对路径；如果文件尚不存在，该记录应被视为“待入库元数据”。
- 当前网站可使用分类占位图块展示照片类别，避免在权利未确认前公开原图。
- 在真实图片发布前，`visibility` 应保持 `public_thumbnail_only`、`restricted`、`private` 或 `internal_research_only`，不应设为 `public`。

## references 数组的关联方式

`photos.json` 和 `exhibitions.json` 中的 `references` 字段为字符串数组，每个元素对应 `references.csl.json` 中的 `id` 字段。例如：

```json
"references": ["ref_fieldnote_liu_001", "ref_zhang_film_archive_2020"]
```

验证脚本会检查这些引用是否存在。

## 数据更新流程

1. 田野考察 → 将原始照片放入 `field-photos/` 对应场馆目录
2. 初步编目 → 更新/新增 `photos.json` 元数据
3. 权利核验 → 确认摄影师版权、馆方限制和肖像权
4. 图片发布 → 压缩生成公开图片与缩略图，放入 `public/images/`
5. 文献研究 → 更新 `references.csl.json`
6. 展陈变化 → 更新 `exhibitions.json`
7. 信息核实 → 更新 `museums.json` 中对应字段（如 geo.coordinate_source 从 pending_verification 改为 gps_field_measurement）
8. 运行 `node scripts/validate-data.js` 确保完整性
9. 提交 PR
