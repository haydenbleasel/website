import type { SpotifyProperties } from '@/app/api/cron/spotify/route';
import { Card } from '@/components/card';
import { Link } from '@/components/link';
import { get } from '@vercel/edge-config';
import Image from 'next/image';
import type { ReactElement } from 'react';

const SpotifyCard = async (): Promise<ReactElement> => {
  const song = await get<SpotifyProperties>('spotify');

  if (!song) {
    return <div />;
  }

  return (
    <Card
      title="Now Listening"
      className="p-4 flex flex-row md:flex-col md:justify-between gap-4"
    >
      <Image
        src={song.image}
        alt=""
        width={300}
        height={300}
        className="w-12 h-12 shrink-0 rounded"
        unoptimized
      />
      <p className="text-neutral-500 dark:text-neutral-400 text-sm">
        <Link href={song.href}>{song.name}</Link> by {song.artist}
      </p>
    </Card>
  );
};

export default SpotifyCard;
