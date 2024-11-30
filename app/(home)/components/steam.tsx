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
    <div>
      <p>Recently Played</p>
      <div className="flex flex-col justify-between gap-4 text-sm">
        <a
          href={`https://store.steampowered.com/app/${game.id}`}
          className="line-clamp-4"
        >
          {game.name}
        </a>
        <div>
          <p className="truncate">🕦 {Math.round(game.playtime / 60)} hours</p>
          <p className="truncate">
            🏆 {game.completeAchievements} achievements
          </p>
        </div>
      </div>
      <Image
        src={game.image}
        alt=""
        width={460}
        height={215}
        className="m-0 h-auto w-full max-w-[300px] shrink-0 rounded"
        sizes="300px"
        quality={100}
      />
    </div>
  );
};
