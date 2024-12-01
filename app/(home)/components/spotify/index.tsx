import type { SpotifyProperties } from '@/app/api/cron/spotify/route';
import { get } from '@vercel/edge-config';
import Image from 'next/image';
import type { ReactElement } from 'react';
import Vinyl from './vinyl.png';

export const Spotify = async (): Promise<ReactElement> => {
  const song = await get<SpotifyProperties>('spotify');

  if (!song) {
    return <div />;
  }

  return (
    <section className="flex flex-col justify-between gap-16 p-8">
      <div className="relative w-fit">
        <Image
          src={Vinyl}
          alt=""
          width={128}
          height={128}
          className="m-0 block aspect-square h-[107px] w-auto"
          quality={100}
          loading="eager"
          priority
        />
        <Image
          src={song.image}
          alt=""
          width={640}
          height={640}
          className="-rotate-12 -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 aspect-square h-[50px] w-auto shrink-0 rounded-full"
          sizes="56px"
          quality={100}
        />
      </div>
      <div className="flex flex-col gap-2">
        <small className="text-muted-foreground">Recently listened</small>
        <a href={song.href} target="_blank" rel="noreferrer noopener">
          <h2 className="font-bold text-3xl tracking-tight">{song.name}</h2>
        </a>
        <p className="text-muted-foreground">by {song.artist}</p>
      </div>
    </section>
  );
};