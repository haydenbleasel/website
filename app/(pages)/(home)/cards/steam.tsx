import Image from 'next/image';
import { get } from '@vercel/edge-config';
import { Link } from '@/components/link';
import { Card } from '@/components/card';
import type { GameProperties } from '@/app/api/cron/steam/route';
import type { ReactElement } from 'react';

const SteamCard = async (): Promise<ReactElement> => {
  const game = await get<GameProperties>('steam');

  if (!game) {
    return <div />;
  }

  return (
    <div className="col-span-2">
      <Card title="Recently Played" className="p-4 flex justify-between gap-4">
        <div className="text-sm flex flex-col justify-between gap-4">
          <p>
            <Link href={`https://store.steampowered.com/app/${game.id}`}>
              {game.name}
            </Link>
          </p>
          <div>
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
