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

export function getAllTags(): string[] {
  return [...new Set(museums.flatMap((m) => m.tags))].sort();
}
