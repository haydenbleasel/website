import type { GameProperties } from '@/app/api/cron/steam/route';
import { get } from '@vercel/edge-config';
import Image from 'next/image';
import type { ReactElement } from 'react';

export const Steam = async (): Promise<ReactElement> => {
  const game = await get<GameProperties>('steam');

  if (!game) {
    return <div />;
  }

  return (
    <section>
      <a
        className="flex flex-col justify-between gap-16 p-8 transition-colors hover:bg-background"
        href={`https://store.steampowered.com/app/${game.id}`}
        target="_blank"
        rel="noreferrer noopener"
      >
        <Image
          src={game.image}
          alt=""
          width={460}
          height={215}
          className="m-0 h-auto w-full max-w-[230px] shrink-0 rounded"
          sizes="230px"
          quality={100}
        />
        <div className="flex flex-col gap-2">
          <small className="text-muted-foreground">Recently played</small>
          <h2 className="font-bold text-3xl tracking-tight">{game.name}</h2>
          <p className="text-muted-foreground">
            🕦 {Math.round(game.playtime / 60)} hours, 🏆{' '}
            {game.completeAchievements} achievements
          </p>
        </div>
      </a>
    </section>
  );
};
