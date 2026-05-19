import { getAllMuseums } from '@/lib/museums';
import ArchiveClient from './ArchiveClient';

export default function ArchivePage() {
  const allMuseums = getAllMuseums();
  const allPhotos = allMuseums.flatMap((m) =>
    m.photos.map((p) => ({ ...p, museumName: m.name, museumId: m.id }))
  );

  return <ArchiveClient photos={allPhotos} />;
}
