import { get } from '@vercel/edge-config';
import Image from 'next/image';
import { Link } from '@/components/link';
import { Card } from '@/components/card';
import Spotify from './spotify.svg';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import type { ReactElement } from 'react';
import type { SpotifyProperties } from '@/app/api/cron/spotify/route';

const SpotifyCard = async (): Promise<ReactElement> => {
  const song = await get<SpotifyProperties>('spotify');

  if (!song) {
    return <div />;
  }

  return (
    <Card
      title="Now Listening"
      className="p-4 flex flex-col justify-between gap-4"
    >
      <Image
        src={Spotify as StaticImport}
        alt=""
        width={24}
        height={24}
        className="absolute top-4 right-4 w-6 h-6 z-10"
      />
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
