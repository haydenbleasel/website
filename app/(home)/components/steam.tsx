import type { GameProperties } from '@/app/api/cron/steam/route';
import { cn } from '@/lib/utils';
import { get } from '@vercel/edge-config';
import { BaseHubImage as Image } from 'basehub/next-image';
import type { ReactElement } from 'react';

export const Steam = async (): Promise<ReactElement> => {
  const game = await get<GameProperties>('steam');

  if (!game) {
    return <div />;
  }

  return (
    <a
      className={cn(
        'flex flex-col justify-between gap-16 rounded-lg border bg-background p-8 shadow-sm transition-all',
        'hover:-translate-y-0.5 hover:shadow'
      )}
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
          className="-left-4 -right-4 -bottom-1 absolute h-px border-connection border-b border-dashed"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, hsl(var(--foreground)) 2rem, hsl(var(--foreground)) calc(100% - 2rem), transparent)',
          }}
        />
        <div
          className="-left-4 -right-4 -top-1 absolute h-px border-connection border-t border-dashed"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, hsl(var(--foreground)) 2rem, hsl(var(--foreground)) calc(100% - 2rem), transparent)',
          }}
        />
        <div
          className="-top-4 -bottom-4 -left-1 absolute w-px border-connection border-l border-dashed"
          style={{
            maskImage:
              'linear-gradient(to bottom, transparent, hsl(var(--foreground)) 2rem, hsl(var(--foreground)) calc(100% - 2rem), transparent)',
          }}
        />
        <div
          className="-top-4 -bottom-4 -right-1 absolute w-px border-r border-dashed"
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
  );
};
