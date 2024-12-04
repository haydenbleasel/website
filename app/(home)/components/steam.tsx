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
        <div className="relative w-fit">
          <Image
            src={game.image}
            alt=""
            width={460}
            height={215}
            className="m-0 h-auto w-full max-w-[230px] shrink-0 rounded"
            sizes="230px"
            quality={100}
          />
          <div
            className="-left-4 -right-4 -bottom-0.5 absolute h-px border-b border-dashed"
            style={{
              maskImage:
                'linear-gradient(to right, transparent, hsl(var(--foreground)) 2rem, hsl(var(--foreground)) calc(100% - 2rem), transparent)',
            }}
          />
          <div
            className="-left-4 -right-4 -top-0.5 absolute h-px border-t border-dashed"
            style={{
              maskImage:
                'linear-gradient(to right, transparent, hsl(var(--foreground)) 2rem, hsl(var(--foreground)) calc(100% - 2rem), transparent)',
            }}
          />
          <div
            className="-top-4 -bottom-4 -left-0.5 absolute w-px border-l border-dashed"
            style={{
              maskImage:
                'linear-gradient(to bottom, transparent, hsl(var(--foreground)) 2rem, hsl(var(--foreground)) calc(100% - 2rem), transparent)',
            }}
          />
          <div
            className="-top-4 -bottom-4 -right-0.5 absolute w-px border-r border-dashed"
            style={{
              maskImage:
                'linear-gradient(to bottom, transparent, hsl(var(--foreground)) 2rem, hsl(var(--foreground)) calc(100% - 2rem), transparent)',
            }}
          />
        </div>
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
