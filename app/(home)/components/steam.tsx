import type { GameProperties } from '@/app/api/cron/steam/route';
import { cn } from '@/lib/utils';
import { ViewAnimation } from '@/providers/view-animation';
import { get } from '@vercel/edge-config';
import Image from 'next/image';
import type { ReactElement } from 'react';

export const Steam = async (): Promise<ReactElement> => {
  const game = await get<GameProperties>('steam');

  if (!game) {
    return <div />;
  }

  return (
    <ViewAnimation
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      delay={0.4}
    >
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
          <div className="faded-line-bottom" />
          <div className="faded-line-top" />
          <div className="faded-line-left" />
          <div className="faded-line-right" />
        </div>
        <div className="flex flex-col gap-2">
          <small className="text-muted-foreground">Recently played</small>
          <h2 className="font-bold text-2xl tracking-tight sm:text-3xl">
            {game.name}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            🕦 {Math.round(game.playtime / 60)} hours, 🏆{' '}
            {game.completeAchievements} achievements
          </p>
        </div>
      </a>
    </ViewAnimation>
  );
};
