'use client';

import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import Link from 'next/link';
import { getAllMuseums } from '@/lib/museums';
import type { Museum } from '@/types';

import 'leaflet/dist/leaflet.css';

// Fix default marker icon paths
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function createCustomIcon() {
  return L.divIcon({
    className: 'custom-marker',
    html: '<div style="width:16px;height:16px;border-radius:50%;background:#d4a04a;border:3px solid #f5f0e8;box-shadow:0 0 12px rgba(212,160,74,0.6);"></div>',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -10],
  });
}

function FitBounds({ museums }: { museums: Museum[] }) {
  const map = useMap();
  useEffect(() => {
    if (museums.length > 0) {
      const bounds = L.latLngBounds(
        museums.map((m) => [m.coordinates[0], m.coordinates[1]] as L.LatLngTuple)
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, museums]);
  return null;
}

interface Props {
  museumId?: string;
  museumIds?: string[];
  museums?: Museum[];
}

export default function MapView({ museumId, museumIds, museums: providedMuseums }: Props) {
  const allMuseums = useMemo(() => getAllMuseums(), []);
  const museums = providedMuseums
    ? providedMuseums
    : museumIds
    ? allMuseums.filter((m) => museumIds.includes(m.id))
    : museumId
      ? allMuseums.filter((m) => m.id === museumId)
      : allMuseums;

  return (
    <MapContainer
      center={[35, 110]}
      zoom={4}
      className="w-full h-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <FitBounds museums={museums} />
      {museums.map((museum) => (
        <Marker
          key={museum.id}
          position={[museum.coordinates[0], museum.coordinates[1]]}
          icon={createCustomIcon()}
        >
          <Popup>
            <div className="min-w-[200px]">
              <h3 className="text-base font-semibold text-warm-white mb-1">
                {museum.name}
              </h3>
              <p className="text-warm-white-dim/70 text-xs mb-1">
                {museum.province} · {museum.city} · {museum.nature}
              </p>
              <p className="text-warm-white-dim/60 text-xs mb-3 line-clamp-2">
                {museum.description}
              </p>
              <Link
                href={`/museum/${museum.id}`}
                className="inline-block text-xs text-amber-gold hover:text-amber-gold-light transition-colors border border-amber-gold/40 px-3 py-1 rounded"
              >
                查看详情 →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
