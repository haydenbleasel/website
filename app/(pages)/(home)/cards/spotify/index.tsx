import { get } from '@vercel/edge-config';
import Image from 'next/image';
import { Link } from '@/components/link';
import { Card } from '../../components/card';
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
    <Card className="p-0">
      <Image
        src={Spotify as StaticImport}
        alt=""
        width={24}
        height={24}
        className="absolute top-6 right-6 w-6 h-6 z-10"
      />
      <div className="relative z-10 p-6 flex flex-col justify-between h-full w-full">
        <a
          className="flex flex-col gap-4"
          href={song.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {song.image ? (
            <Image
              src={song.image}
              alt=""
              width={300}
              height={300}
              className="w-12 h-12 shrink-0 rounded"
              unoptimized
            />
          ) : null}
          <p className="text-sm">
            Listening to <Link href={song.href}>{song.name}</Link> by{' '}
            {song.artist}
          </p>
        </a>
      </div>
    </Card>
  );
};

export default SpotifyCard;
