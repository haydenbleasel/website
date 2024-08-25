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
      className="flex flex-row gap-4 p-4 md:flex-col md:justify-between"
    >
      <Image
        src={song.image}
        alt=""
        width={640}
        height={640}
        className="h-12 w-12 shrink-0 rounded"
        sizes="48px"
      />
      <p className="text-neutral-500 text-sm dark:text-neutral-400">
        <Link href={song.href}>{song.name}</Link> by {song.artist}
      </p>
    </Card>
  );
};

export default SpotifyCard;
