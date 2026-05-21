'use client';

import { useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import Link from 'next/link';
import { getAllMuseums, getTypeColor } from '@/lib/museums';
import type { Museum } from '@/types';

import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

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

function createColoredIcon(color: string, visited: boolean) {
  const opacity = visited ? 1 : 0.55;
  const borderStyle = visited ? `border: 2px solid ${color};` : `border: 1.5px dashed ${color};`;
  return L.divIcon({
    className: 'custom-marker',
    html: `<div class="custom-marker-dot" style="background:${color};opacity:${opacity};${borderStyle}"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -9],
  });
}

const ROUTE_COLORS = [
  '#d4a04a', '#8b1a1a', '#2563eb', '#16a34a', '#7c3aed',
  '#ea580c', '#0891b2', '#db2777', '#65a30d', '#c026d3',
];

// ============================================================
// MarkerClusterGroup: integrates leaflet.markercluster with react-leaflet v5
// ============================================================

function MarkerClusterGroup({ museums }: { museums: Museum[] }) {
  const map = useMap();
  const clusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);

  useEffect(() => {
    if (clusterGroupRef.current) {
      map.removeLayer(clusterGroupRef.current);
    }
    const clusterGroup = L.markerClusterGroup({
      chunkedLoading: true,
      maxClusterRadius: 60,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      iconCreateFunction: (cluster) => {
        const count = cluster.getChildCount();
        let sizeClass = 'marker-cluster-small';
        if (count >= 20) sizeClass = 'marker-cluster-large';
        else if (count >= 8) sizeClass = 'marker-cluster-medium';
        return L.divIcon({
          html: `<div><span>${count}</span></div>`,
          className: `marker-cluster ${sizeClass}`,
          iconSize: L.point(40, 40),
        });
      },
    });

    museums.forEach((museum) => {
      const color = getTypeColor(museum.type);
      const icon = createColoredIcon(color, museum.visited ?? false);
      const marker = L.marker([museum.coordinates[0], museum.coordinates[1]], { icon });

      const popupContent = `
        <div style="min-width:200px">
          <h3 style="font-size:14px;font-weight:600;color:#1c1917;margin-bottom:4px">${museum.name}</h3>
          <p style="font-size:12px;color:#57534e;margin-bottom:2px">${museum.province} · ${museum.city} · ${museum.type}</p>
          <p style="font-size:12px;color:#78716c;margin-bottom:8px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">${museum.description}</p>
          <a href="/museum/${museum.id}" style="display:inline-block;font-size:12px;color:#8b1a1a;text-decoration:none;border:1px solid rgba(212,160,74,0.5);padding:4px 12px;border-radius:4px;transition:all 0.2s">查看详情 →</a>
        </div>`;
      marker.bindPopup(popupContent);
      clusterGroup.addLayer(marker);
    });

    map.addLayer(clusterGroup);
    clusterGroupRef.current = clusterGroup;

    return () => {
      map.removeLayer(clusterGroup);
    };
  }, [map, museums]);

  return null;
}

// ============================================================
// RoutePolyline: draws lines connecting museums in route order
// ============================================================

function RoutePolyline({
  museums,
  routeIndex,
}: {
  museums: Museum[];
  routeIndex: number;
}) {
  const color = ROUTE_COLORS[routeIndex % ROUTE_COLORS.length];
  const positions: [number, number][] = museums.map(
    (m) => [m.coordinates[0], m.coordinates[1]]
  );
  return (
    <Polyline
      positions={positions}
      pathOptions={{ color, weight: 3, opacity: 0.7, dashArray: '8 4' }}
    />
  );
}

// ============================================================
// FitBounds
// ============================================================

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

// ============================================================
// MapLegend
// ============================================================

export function MapLegend({
  types,
  typeColors,
}: {
  types: string[];
  typeColors: Record<string, string>;
}) {
  return (
    <div className="absolute bottom-6 right-4 z-20 rounded-lg border border-stone-200 bg-white/90 p-3 shadow-lg shadow-stone-300/30 backdrop-blur text-xs">
      <p className="mb-2 font-medium text-stone-700">图例</p>
      <div className="space-y-1.5">
        {types.map((type) => (
          <div key={type} className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: typeColors[type] ?? '#78716c' }}
            />
            <span className="text-stone-600">{type}</span>
          </div>
        ))}
        <div className="mt-2 border-t border-stone-150 pt-2">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full border-2 border-solid border-stone-500 bg-stone-500" />
            <span className="text-stone-600">已实地考察</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-block h-2.5 w-2.5 rounded-full border-[1.5px] border-dashed border-stone-400 bg-stone-400/50" />
            <span className="text-stone-600">未实地考察</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MapView
// ============================================================

interface Props {
  museumId?: string;
  museumIds?: string[];
  museums?: Museum[];
  mode?: 'normal' | 'cluster' | 'route';
  showLegend?: boolean;
  routeIndex?: number;
}

export default function MapView({
  museumId,
  museumIds,
  museums: providedMuseums,
  mode = 'normal',
  showLegend = false,
  routeIndex = 0,
}: Props) {
  const allMuseums = useMemo(() => getAllMuseums(), []);
  const museums = providedMuseums
    ? providedMuseums
    : museumIds
      ? allMuseums.filter((m) => museumIds.includes(m.id))
      : museumId
        ? allMuseums.filter((m) => m.id === museumId)
        : allMuseums;

  const types = useMemo(() => {
    return [...new Set(museums.map((m) => m.type))].sort();
  }, [museums]);

  const typeColors = useMemo(() => {
    const map: Record<string, string> = {};
    for (const t of types) {
      map[t] = getTypeColor(t);
    }
    return map;
  }, [types]);

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[35, 110]}
        zoom={4}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <FitBounds museums={museums} />

        {mode === 'cluster' ? (
          <MarkerClusterGroup museums={museums} />
        ) : mode === 'route' ? (
          <>
            <RoutePolyline museums={museums} routeIndex={routeIndex} />
            {museums.map((museum, idx) => {
              const color = ROUTE_COLORS[routeIndex % ROUTE_COLORS.length];
              const icon = L.divIcon({
                className: 'route-marker',
                html: `<div style="display:flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:${color};color:#fff;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.3)">${idx + 1}</div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12],
                popupAnchor: [0, -14],
              });
              return (
                <Marker
                  key={museum.id}
                  position={[museum.coordinates[0], museum.coordinates[1]]}
                  icon={icon}
                >
                  <Popup>
                    <div className="min-w-[200px]">
                      <h3 className="text-sm font-semibold text-stone-950 mb-1">
                        <span style={{ color }}>{idx + 1}.</span> {museum.name}
                      </h3>
                      <p className="text-stone-600 text-xs mb-1">
                        {museum.province} · {museum.city} · {museum.type}
                      </p>
                      <p className="text-stone-500 text-xs mb-3 line-clamp-2">
                        {museum.description}
                      </p>
                      <Link
                        href={`/museum/${museum.id}`}
                        className="inline-block text-xs text-dark-red hover:text-amber-gold transition-colors border border-amber-gold/50 px-3 py-1 rounded"
                      >
                        查看详情 →
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </>
        ) : (
          // normal mode
          museums.map((museum) => {
            const color = getTypeColor(museum.type);
            return (
              <Marker
                key={museum.id}
                position={[museum.coordinates[0], museum.coordinates[1]]}
                icon={createColoredIcon(color, museum.visited ?? false)}
              >
                <Popup>
                  <div className="min-w-[200px]">
                    <h3 className="text-sm font-semibold text-stone-950 mb-1">
                      {museum.name}
                    </h3>
                    <p className="text-stone-600 text-xs mb-1">
                      {museum.province} · {museum.city} · {museum.type}
                    </p>
                    <p className="text-stone-500 text-xs mb-3 line-clamp-2">
                      {museum.description}
                    </p>
                    <Link
                      href={`/museum/${museum.id}`}
                      className="inline-block text-xs text-dark-red hover:text-amber-gold transition-colors border border-amber-gold/50 px-3 py-1 rounded"
                    >
                      查看详情 →
                    </Link>
                  </div>
                </Popup>
              </Marker>
            );
          })
        )}
      </MapContainer>

      {showLegend && <MapLegend types={types} typeColors={typeColors} />}
    </div>
  );
}
