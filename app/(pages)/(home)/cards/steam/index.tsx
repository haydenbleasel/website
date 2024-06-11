import Image from 'next/image';
import { get } from '@vercel/edge-config';
import { Link } from '@/components/link';
import { Card } from '../../components/card';
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
    <Card className="col-span-2 flex items-start gap-4">
      <Image
        src={Steam as StaticImport}
        alt=""
        width={24}
        height={24}
        className="absolute z-10 top-6 right-6 w-6 h-6"
      />
      <div className="relative z-10 flex flex-col justify-between h-full w-full">
        <p className="text-sm">
          Playing{' '}
          <Link href={`https://store.steampowered.com/app/${game.id}`}>
            {game.name}
          </Link>
        </p>
        <p className="text-neutral-950/70 text-sm line-clamp-2">
          🕦 {Math.round(game.playtime / 60)} hours{' '}
          <span className="text-neutral-950/30">&bull;</span> 🏆{' '}
          {game.completeAchievements} / {game.totalAchievements}
        </p>
      </div>
      {game.image ? (
        <Image
          src={game.image}
          alt=""
          width={300}
          height={300}
          unoptimized
          className="rounded m-0"
        />
      ) : null}
    </Card>
  );
};

export default SteamCard;
