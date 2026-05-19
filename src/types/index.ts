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
}

export const PHOTO_CATEGORIES = [
  '建筑外观',
  '展厅空间',
  '技术器物',
  '场景复原',
  '互动装置',
] as const;
