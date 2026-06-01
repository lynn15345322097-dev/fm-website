// ============================================================
// Existing types — kept for backwards compatibility with UI
// ============================================================

export interface Photo {
  url: string;
  caption: string;
  category: '建筑外观' | '展厅空间' | '技术器物' | '场景复原' | '互动装置';
}

export interface Museum {
  id: string;
  name: string;
  nameEn: string;
  region: string;
  province: string;
  city: string;
  address: string;
  type: string;
  nature: string;
  visited?: boolean;
  tags: string[];
  categories?: string[];
  coordinates: [number, number];
  description: string;
  spaceObservation: string;
  exhibitionAnalysis: string;
  photos: Photo[];
}

export interface ExhibitionRoute {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  museums: string[];
  content: string;
  chapters: ExhibitionRouteChapter[];
}

export interface ExhibitionRouteChapter {
  title: string;
  subtitle: string;
  researchQuestion: string;
  museumIds: string[];
  keywords: string[];
}

export const PHOTO_CATEGORIES = [
  '建筑外观',
  '展厅空间',
  '技术器物',
  '场景复原',
  '互动装置',
] as const;

// ============================================================
// New types — for data/photos.json, data/exhibitions.json
// ============================================================

export interface AdministrativeDivision {
  region: string;
  province: string;
  city: string;
  address: string;
}

export interface GeoInfo {
  latitude: number | null;
  longitude: number | null;
  coordinate_system: 'WGS84' | 'GCJ02' | 'BD09' | 'unknown';
  coordinate_source: 'gps_field_measurement' | 'geocoding_from_address' | 'manual_estimation' | 'third_party_source' | 'pending_verification';
}

export interface Classification {
  type: string;
  nature: string;
}

export interface AcademicContext {
  description: string;
  space_observation: string;
  exhibition_analysis: string;
}

/** Museum record in the v2 data format (data/museums.json) */
export interface MuseumRecord {
  id: string;
  name_zh: string;
  name_en: string | null;
  administrative_division: AdministrativeDivision;
  geo: GeoInfo;
  classification: Classification;
  academic_context: AcademicContext;
  visited?: boolean;
  tags: string[];
  categories?: string[];
  photos: Photo[];
  // Backwards-compatible flat fields
  name: string;
  nameEn: string;
  region: string;
  province: string;
  city: string;
  address: string;
  type: string;
  nature: string;
  coordinates: [number, number];
  description: string;
  spaceObservation: string;
  exhibitionAnalysis: string;
}

export interface PhotographerCopyright {
  holder: string;
  license: string;
  commercial_use: boolean;
  derivatives_allowed: boolean;
  attribution_required: boolean;
}

export interface InstitutionalRestriction {
  status: 'unrestricted' | 'attribution-only' | 'non-commercial-research-only' | 'restricted' | 'pending' | 'pending_verification';
  institution: string;
  download_allowed: boolean;
  notes: string;
}

export interface PersonalityRights {
  contains_identifiable_person: boolean;
  model_release: 'obtained' | 'not_obtained' | 'not_applicable' | 'pending_verification';
}

export interface PhotoRights {
  photographer_copyright: PhotographerCopyright;
  institutional_restriction: InstitutionalRestriction;
  personality_rights: PersonalityRights;
}

export interface PhotoMetadata {
  title_zh: string;
  object_type: string;
  tags: string[];
  photographer: string;
  shooting_date: string;
  description: string;
}

export type PhotoVisibility = 'public' | 'public_thumbnail_only' | 'restricted' | 'private' | 'internal_research_only';

/** Photo record in the v2 data format (data/photos.json) */
export interface PhotoRecord {
  id: string;
  museum_id: string;
  exhibition_id: string | null;
  filename: string;
  thumbnail: string;
  metadata: PhotoMetadata;
  rights: PhotoRights;
  visibility: PhotoVisibility;
  references: string[];
}

export interface ExhibitionChapter {
  title_zh: string;
  subtitle_zh: string;
  research_question: string;
  museum_ids: string[];
  keywords: string[];
}

/** Exhibition record in the v2 data format (data/exhibitions.json) */
export interface ExhibitionRecord {
  id: string;
  title_zh: string;
  subtitle_zh: string;
  summary_zh: string;
  content_zh: string;
  museum_ids: string[];
  type: 'permanent_exhibition' | 'temporary_exhibition' | 'gallery_unit' | 'curated_research_route' | 'pending_verification';
  chapters: ExhibitionChapter[];
}
