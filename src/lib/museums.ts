import museumsData from '../../data/museums.json';
import type { Museum } from '@/types';

const museums: Museum[] = museumsData as Museum[];

export function getAllMuseums(): Museum[] {
  return museums;
}

export function getMuseumById(id: string): Museum | undefined {
  return museums.find((m) => m.id === id);
}

export function getMuseumsByCity(city: string): Museum[] {
  return museums.filter((m) => m.city === city);
}

export function getMuseumsByIds(ids: string[]): Museum[] {
  return ids
    .map((id) => getMuseumById(id))
    .filter((m): m is Museum => m !== undefined);
}

export function getAllCities(): string[] {
  return [...new Set(museums.map((m) => m.city))].sort();
}

export function getAllRegions(): string[] {
  return [...new Set(museums.map((m) => m.region))].sort();
}

export function getAllProvinces(): string[] {
  return [...new Set(museums.map((m) => m.province))].sort();
}

export function getAllNatures(): string[] {
  return [...new Set(museums.map((m) => m.nature))].sort();
}

export function getAllTypes(): string[] {
  return [...new Set(museums.map((m) => m.type))].sort();
}

export function getAllTags(): string[] {
  return [...new Set(museums.flatMap((m) => m.tags))].sort();
}

// ============================================================
// GeoJSON conversion
// museums.json coordinates are [lat, lng]; GeoJSON uses [lng, lat]
// ============================================================

export interface MuseumGeoJSONFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  properties: {
    id: string;
    name: string;
    nameEn: string;
    region: string;
    province: string;
    city: string;
    type: string;
    nature: string;
    visited: boolean;
    tags: string[];
    address: string;
  };
}

export interface MuseumGeoJSON {
  type: 'FeatureCollection';
  features: MuseumGeoJSONFeature[];
}

export function museumsToGeoJSON(museumList?: Museum[]): MuseumGeoJSON {
  const list = museumList ?? museums;
  return {
    type: 'FeatureCollection',
    features: list.map((m) => ({
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [m.coordinates[1], m.coordinates[0]], // [lat, lng] → [lng, lat]
      },
      properties: {
        id: m.id,
        name: m.name,
        nameEn: m.nameEn,
        region: m.region,
        province: m.province,
        city: m.city,
        type: m.type,
        nature: m.nature,
        visited: m.visited ?? false,
        tags: m.tags,
        address: m.address,
      },
    })),
  };
}

// ============================================================
// Spatial analysis helpers
// ============================================================

export interface ProvinceStat {
  province: string;
  count: number;
  visited: number;
}

export interface RegionStat {
  region: string;
  count: number;
  visited: number;
}

export interface TypeStat {
  type: string;
  count: number;
}

export interface NatureStat {
  nature: string;
  count: number;
}

export interface SpatialStats {
  totalCount: number;
  visitedCount: number;
  provinceStats: ProvinceStat[];
  regionStats: RegionStat[];
  typeStats: TypeStat[];
  natureStats: NatureStat[];
}

export function getSpatialStats(): SpatialStats {
  const totalCount = museums.length;
  const visitedCount = museums.filter((m) => m.visited).length;

  // Province stats
  const provinceMap = new Map<string, { count: number; visited: number }>();
  for (const m of museums) {
    const entry = provinceMap.get(m.province) ?? { count: 0, visited: 0 };
    entry.count++;
    if (m.visited) entry.visited++;
    provinceMap.set(m.province, entry);
  }
  const provinceStats: ProvinceStat[] = Array.from(provinceMap.entries())
    .map(([province, data]) => ({ province, ...data }))
    .sort((a, b) => b.count - a.count);

  // Region stats
  const regionMap = new Map<string, { count: number; visited: number }>();
  for (const m of museums) {
    const entry = regionMap.get(m.region) ?? { count: 0, visited: 0 };
    entry.count++;
    if (m.visited) entry.visited++;
    regionMap.set(m.region, entry);
  }
  const regionStats: RegionStat[] = Array.from(regionMap.entries())
    .map(([region, data]) => ({ region, ...data }));

  // Type stats
  const typeMap = new Map<string, number>();
  for (const m of museums) {
    typeMap.set(m.type, (typeMap.get(m.type) ?? 0) + 1);
  }
  const typeStats: TypeStat[] = Array.from(typeMap.entries())
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);

  // Nature stats
  const natureMap = new Map<string, number>();
  for (const m of museums) {
    natureMap.set(m.nature, (natureMap.get(m.nature) ?? 0) + 1);
  }
  const natureStats: NatureStat[] = Array.from(natureMap.entries())
    .map(([nature, count]) => ({ nature, count }))
    .sort((a, b) => b.count - a.count);

  return { totalCount, visitedCount, provinceStats, regionStats, typeStats, natureStats };
}

// ============================================================
// Marker color scheme by spatial type
// ============================================================

export const TYPE_COLORS: Record<string, string> = {
  '国家级专题博物馆': '#8b1a1a',
  '省级电影博物馆': '#d4a04a',
  '市级电影博物馆': '#2563eb',
  '专题博物馆': '#2563eb',
  '电影资料馆/影像档案': '#7c3aed',
  '电影制片厂/影视基地': '#ea580c',
  '民间收藏馆': '#16a34a',
  '高校电影博物馆': '#0891b2',
  '影视文化中心': '#db2777',
};

export function getTypeColor(type: string): string {
  return TYPE_COLORS[type] ?? '#78716c';
}
