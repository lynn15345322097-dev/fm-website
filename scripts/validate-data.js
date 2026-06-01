#!/usr/bin/env node

/**
 * validate-data.js — 数据完整性校验脚本
 *
 * 检查：
 * 1. JSON 是否可解析
 * 2. exhibitions 中的 museum_id 是否存在
 * 3. photos 中的 museum_id 和 exhibition_id 是否存在
 * 4. photos 是否填写完整 rights
 * 5. visibility 是否属于允许值
 * 6. references 是否存在于 references.csl.json
 * 7. geo.latitude/longitude 为 null 时，coordinate_source 是否为 pending_verification
 *
 * 用法：node scripts/validate-data.js
 */

const fs = require('node:fs');
const path = require('node:path');

const DATA_DIR = path.join(__dirname, '..', 'data');

let errors = 0;
let warnings = 0;

function err(msg) {
  console.error('  ERROR: ' + msg);
  errors++;
}

function warn(msg) {
  console.warn('  WARN: ' + msg);
  warnings++;
}

function loadJSON(filepath) {
  try {
    const raw = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    err('Cannot parse ' + path.relative(process.cwd(), filepath) + ': ' + e.message);
    return null;
  }
}

// ============================================================
// 1. Load all data files
// ============================================================

console.log('\n=== 数据完整性校验 ===\n');

const museums = loadJSON(path.join(DATA_DIR, 'museums.json'));
const exhibitions = loadJSON(path.join(DATA_DIR, 'exhibitions.json'));
const photos = loadJSON(path.join(DATA_DIR, 'photos.json'));
const categories = loadJSON(path.join(DATA_DIR, 'categories.json'));
const references = loadJSON(path.join(DATA_DIR, 'references.csl.json'));

if (!museums || !exhibitions || !photos || !categories || !references) {
  console.error('\n校验失败：部分 JSON 文件无法解析。');
  process.exit(1);
}

const museumIds = new Set(museums.map((m) => m.id));
const exhibitionIds = new Set(exhibitions.map((e) => e.id));
const referenceIds = new Set(references.map((r) => r.id));
const PUBLIC_IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

const VALID_VISIBILITY = ['public', 'public_thumbnail_only', 'restricted', 'private', 'internal_research_only'];
const VALID_COORD_SOURCES = ['gps_field_measurement', 'geocoding_from_address', 'manual_estimation', 'third_party_source', 'pending_verification'];
const VALID_COORD_SYSTEMS = ['WGS84', 'GCJ02', 'BD09', 'unknown'];

function publicAssetExists(relativePath) {
  if (!relativePath || typeof relativePath !== 'string') return false;
  return fs.existsSync(path.join(PUBLIC_IMAGES_DIR, relativePath));
}

console.log('已加载：');
console.log('  - museums.json:     ' + museums.length + ' 条记录');
console.log('  - exhibitions.json: ' + exhibitions.length + ' 条记录');
console.log('  - photos.json:      ' + photos.length + ' 条记录');
console.log('  - categories.json:  已加载');
console.log('  - references.csl.json: ' + references.length + ' 条记录');
console.log('');

// ============================================================
// 2. Validate museums
// ============================================================

console.log('--- 校验 museums.json ---');

museums.forEach((m, idx) => {
  const prefix = 'museums[' + idx + '] (' + m.id + ')';

  // Required fields
  if (!m.id) err(prefix + ': 缺少 id');
  if (typeof m.id !== 'string' || !/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(m.id)) {
    err(prefix + ': id 格式不正确（应为语义化 ID，如 cn-film-museum）');
  }
  if (!m.name_zh) err(prefix + ': 缺少 name_zh');

  // administrative_division
  if (!m.administrative_division) {
    err(prefix + ': 缺少 administrative_division');
  } else {
    if (!m.administrative_division.region) err(prefix + ': 缺少 administrative_division.region');
    if (!m.administrative_division.province) err(prefix + ': 缺少 administrative_division.province');
    if (!m.administrative_division.city) err(prefix + ': 缺少 administrative_division.city');
  }

  // geo
  if (!m.geo) {
    err(prefix + ': 缺少 geo');
  } else {
    if (!VALID_COORD_SYSTEMS.includes(m.geo.coordinate_system)) {
      err(prefix + ': geo.coordinate_system 值无效: ' + m.geo.coordinate_system);
    }
    if (!VALID_COORD_SOURCES.includes(m.geo.coordinate_source)) {
      err(prefix + ': geo.coordinate_source 值无效: ' + m.geo.coordinate_source);
    }

    const lat = m.geo.latitude;
    const lng = m.geo.longitude;

    if (lat === null || lng === null) {
      // Null coordinates are allowed only with proper source marking
      if (m.geo.coordinate_source !== 'pending_verification' && m.geo.coordinate_system !== 'unknown') {
        warn(prefix + ': 坐标为 null，但 coordinate_source 不是 pending_verification');
      }
    } else {
      if (typeof lat !== 'number' || typeof lng !== 'number') {
        err(prefix + ': geo.latitude/longitude 应为 number 或 null');
      }
      // Range check for China region
      if (lat < 18 || lat > 54) warn(prefix + ': latitude ' + lat + ' 可能超出中国范围');
      if (lng < 73 || lng > 136) warn(prefix + ': longitude ' + lng + ' 可能超出中国范围');
    }
  }

  // classification
  if (!m.classification) {
    err(prefix + ': 缺少 classification');
  } else {
    if (!m.classification.type && m.classification.type !== '') err(prefix + ': 缺少 classification.type');
    if (!m.classification.nature && m.classification.nature !== '') err(prefix + ': 缺少 classification.nature');
  }

  // Backwards compatibility: check old flat fields
  if (!m.name) warn(prefix + ': 缺少旧字段 name（可能影响前端兼容性）');
  if (m.coordinates && !Array.isArray(m.coordinates)) err(prefix + ': coordinates 应为数组');
});

// ============================================================
// 3. Validate exhibitions
// ============================================================

console.log('--- 校验 exhibitions.json ---');

exhibitions.forEach((e, idx) => {
  const prefix = 'exhibitions[' + idx + '] (' + (e.id || '?') + ')';

  if (!e.id) err(prefix + ': 缺少 id');
  if (!e.title_zh) err(prefix + ': 缺少 title_zh');
  if (!e.type) err(prefix + ': 缺少 type');
  if (!Array.isArray(e.museum_ids)) err(prefix + ': museum_ids 应为数组');

  // Check museum_id references
  if (Array.isArray(e.museum_ids)) {
    e.museum_ids.forEach((mid) => {
      if (!museumIds.has(mid)) {
        err(prefix + ': museum_id "' + mid + '" 在 museums.json 中不存在');
      }
    });
  }

  // Check chapters
  if (e.chapters && Array.isArray(e.chapters)) {
    e.chapters.forEach((ch, chi) => {
      const chPrefix = prefix + '.chapters[' + chi + '] (' + (ch.title_zh || '?') + ')';
      if (!ch.title_zh) err(chPrefix + ': 缺少 title_zh');
      if (!Array.isArray(ch.museum_ids)) err(chPrefix + ': museum_ids 应为数组');

      if (Array.isArray(ch.museum_ids)) {
        ch.museum_ids.forEach((mid) => {
          if (!museumIds.has(mid)) {
            err(chPrefix + ': museum_id "' + mid + '" 在 museums.json 中不存在');
          }
        });
      }
    });
  }
});

// ============================================================
// 4. Validate photos
// ============================================================

console.log('--- 校验 photos.json ---');

let publishedOriginals = 0;
let publishedThumbnails = 0;

photos.forEach((p, idx) => {
  const prefix = 'photos[' + idx + '] (' + (p.id || '?') + ')';

  if (!p.id) err(prefix + ': 缺少 id');
  if (!p.museum_id) {
    err(prefix + ': 缺少 museum_id');
  } else if (!museumIds.has(p.museum_id)) {
    err(prefix + ': museum_id "' + p.museum_id + '" 在 museums.json 中不存在');
  }

  // exhibition_id is optional, but if present must exist
  if (p.exhibition_id && !exhibitionIds.has(p.exhibition_id)) {
    err(prefix + ': exhibition_id "' + p.exhibition_id + '" 在 exhibitions.json 中不存在');
  }

  // Visibility
  if (!p.visibility) {
    err(prefix + ': 缺少 visibility');
  } else if (!VALID_VISIBILITY.includes(p.visibility)) {
    err(prefix + ': visibility 值无效: ' + p.visibility);
  }

  // Rights
  if (!p.rights) {
    err(prefix + ': 缺少 rights');
  } else {
    // photographer_copyright
    if (!p.rights.photographer_copyright) {
      err(prefix + ': 缺少 rights.photographer_copyright');
    } else {
      const pc = p.rights.photographer_copyright;
      if (!pc.holder) err(prefix + ': 缺少 rights.photographer_copyright.holder');
      if (!pc.license) err(prefix + ': 缺少 rights.photographer_copyright.license');
    }

    // institutional_restriction
    if (!p.rights.institutional_restriction) {
      err(prefix + ': 缺少 rights.institutional_restriction');
    } else {
      const ir = p.rights.institutional_restriction;
      if (!ir.status) err(prefix + ': 缺少 rights.institutional_restriction.status');
    }

    // personality_rights
    if (!p.rights.personality_rights) {
      err(prefix + ': 缺少 rights.personality_rights');
    } else {
      const pr = p.rights.personality_rights;
      if (typeof pr.contains_identifiable_person !== 'boolean') {
        err(prefix + ': rights.personality_rights.contains_identifiable_person 应为 boolean');
      }
    }
  }

  // references
  if (p.references && Array.isArray(p.references)) {
    p.references.forEach((refId) => {
      if (!referenceIds.has(refId)) {
        err(prefix + ': reference "' + refId + '" 在 references.csl.json 中不存在');
      }
    });
  }

  if (publicAssetExists(p.filename)) publishedOriginals++;
  if (publicAssetExists(p.thumbnail)) publishedThumbnails++;
});

console.log('');
console.log('--- 照片文件发布状态 ---');
console.log('  元数据记录：' + photos.length + ' 条');
console.log('  已发布原图：' + publishedOriginals + ' 个 public/images 文件');
console.log('  已发布缩略图：' + publishedThumbnails + ' 个 public/images 文件');
console.log('  待入库元数据：' + (photos.length - publishedThumbnails) + ' 条');
console.log('  说明：缺少 public/images 文件不计为错误；当前允许先建立照片元数据，再完成图片筛选、压缩和权利核验。');

// ============================================================
// 5. Summary
// ============================================================

console.log('\n=== 校验结果 ===');
console.log('错误 (ERROR):   ' + errors);
console.log('警告 (WARNING): ' + warnings);

if (errors > 0) {
  console.log('\n存在 ' + errors + ' 个错误，请修复后再提交。');
  process.exit(1);
} else if (warnings > 0) {
  console.log('\n校验通过（有 ' + warnings + ' 个警告）。');
  process.exit(0);
} else {
  console.log('\n校验通过，无错误无警告。');
  process.exit(0);
}
