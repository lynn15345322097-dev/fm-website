'use client';

import dynamic from 'next/dynamic';
import type { Museum } from '@/types';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

interface Props {
  routeMuseums: Museum[];
  routeIndex?: number;
}

export default function RouteMapView({ routeMuseums, routeIndex = 0 }: Props) {
  if (!routeMuseums.length) return null;

  return (
    <div className="w-full h-full">
      <MapView museums={routeMuseums} mode="route" routeIndex={routeIndex} />
    </div>
  );
}
