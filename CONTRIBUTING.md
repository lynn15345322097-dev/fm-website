# 贡献指南

欢迎为中国电影展示空间线上图谱项目做出贡献。本项目是一个数字人文研究项目，旨在通过田野调研、GIS 空间制图和照片元数据归档，建立中国电影博物馆及相关展示空间的开放资料库。

## 贡献方式

- **数据贡献**：补充博物馆信息、修正坐标数据、添加展览记录
- **照片贡献**：提交田野考察照片及元数据
- **文献贡献**：补充参考文献和学术资料
- **代码贡献**：改进网站功能、修复 bug
- **勘误**：指出数据错误或不准确的信息

## 提交前检查

```bash
# 1. 运行数据校验脚本
node scripts/validate-data.js

# 2. 确保构建通过
npm run build
```

## 数据提交规范

### ID 命名

- 博物馆 ID：`{拼音缩写}-museum`，例如 `cn-film-museum`
- 展览 ID：语义化英文短语，例如 `film-into-museum`
- 照片 ID：`photo_{museum_id}_{分类}_{序号}`，例如 `photo_cn_film_museum_projector_001`

### 坐标

- **没有核验的坐标必须写为 `null`**。
- `geo.coordinate_source` 必须标注坐标来源：`gps_field_measurement`（GPS 实测）、`geocoding_from_address`（地址反查）、`manual_estimation`（人工估计）、`third_party_source`（第三方来源）、`pending_verification`（待核实）。
- `geo.coordinate_system` 必须标注坐标系：`WGS84`、`GCJ02`、`BD09`、`unknown`。

### 照片

- 每张照片必须填写完整的 `rights` 结构（photographer_copyright、institutional_restriction、personality_rights）。
- `visibility` 默认值为 `public_thumbnail_only`，不要默认设为 `public`。
- 照片版权（photographer_copyright）不等于展品版权（institutional_restriction），两项都需要填写。

### 内容

- **禁止**复制粘贴博物馆官网、微信公众号、百度百科等平台的大段文本。
- 展陈分析、空间观察等内容应为原创田野记录或基于可核验来源的综述。
- 引用他人研究成果时，必须在 `references` 中标注来源。

### 参考文献

- 只允许添加真实、可核验的参考文献。
- 田野记录请使用 `type: "document"`，不要虚构为 `book` 或 `article-journal`。
- 不要虚构出版社、期刊名、论文标题或作者。

## 提交 PR

1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/your-feature`
3. 提交更改：`git commit -m "描述你的更改"`
4. 运行 `node scripts/validate-data.js` 确保数据完整性
5. 推送到你的 fork：`git push origin feature/your-feature`
6. 创建 Pull Request

## 行为准则

- 尊重田野考察对象的隐私和机构规定
- 拍摄照片时遵守博物馆的拍摄政策
- 不发布可能侵犯他人肖像权的照片（未经授权）
- 学术讨论保持专业和建设性
