import Image from 'next/image';
import { get } from '@vercel/edge-config';
import { Link } from '@/components/link';
import { Card } from '@/components/card';
import Steam from './steam.svg';
import type { GameProperties } from '@/app/api/cron/steam/route';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import type { ReactElement } from 'react';

const SteamCard = async (): Promise<ReactElement> => {
  const game = await get<GameProperties>('steam');

  if (!game) {
    return <div />;
  }

  return (
    <div className="col-span-2">
      <Card title="Recently Played" className="p-4 flex justify-between gap-4">
        <Image
          src={Steam as StaticImport}
          alt=""
          width={24}
          height={24}
          className="absolute z-10 bottom-4 right-4 w-6 h-6"
        />
        <div className="flex flex-col justify-between gap-4">
          <p className="font-semibold text-neutral-950 dark:text-white line-clamp-2">
            <Link href={`https://store.steampowered.com/app/${game.id}`}>
              {game.name}
            </Link>
          </p>
          <div className="text-neutral-500 dark:text-neutral-400 text-sm">
            <p className="truncate">
              🕦 {Math.round(game.playtime / 60)} hours
            </p>
            <p className="truncate">
              🏆 {game.completeAchievements} / {game.totalAchievements}
            </p>
          </div>
        </div>
        <Image
          src={game.image}
          alt=""
          width={300}
          height={300}
          unoptimized
          className="rounded m-0 shrink-0"
        />
      </Card>
    </div>
  );
};

export default SteamCard;
