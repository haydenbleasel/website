import { ClockIcon, StarIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { Link } from '@/components/link';
import { Container } from '@/components/container';
import {
  getOwnedGames,
  getPlayerAchievements,
  getRecentGames,
} from '@/lib/steam';
import { createMetadata } from '@/lib/metadata';
import type { BaseSteamGame } from '@/lib/steam';
import type { Metadata } from 'next';
import type { ReactElement } from 'react';

const title = 'Games';
const description = 'Playtime and achievements.';

export const metadata: Metadata = createMetadata({
  title,
  description,
  path: '/games',
});

const Game = async ({
  data,
}: {
  readonly data: BaseSteamGame;
}): Promise<ReactElement> => {
  const stats = await getPlayerAchievements(data.appid);
  let imageUrl: string | null =
    `https://steamcdn-a.akamaihd.net/steam/apps/${data.appid}/library_hero.jpg`;

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    imageUrl = null;
  }

  return (
    <Link
      href={`https://steamcommunity.com/app/${data.appid}`}
      key={data.appid}
      className="no-underline items-center flex gap-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 p-4 rounded-md transition-colors"
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt=""
          width={99}
          height={32}
          className="rounded-md shrink-0"
          quality={100}
        />
      ) : (
        <div className="w-[99px] h-8 rounded-md bg-zinc-200 dark:bg-zinc-800" />
      )}
      <div>
        <div className="truncate">
          <p className="text-sm text-zinc-900 dark:text-zinc-100 font-medium truncate">
            {data.name}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          <span className="flex items-center gap-1">
            <ClockIcon className="w-3 h-3 shrink-0" />
            {Math.round(data.playtime_forever / 60)} hours
          </span>
          {stats?.achievements?.length ? (
            <span className="flex items-center gap-1">
              <StarIcon className="w-3 h-3 shrink-0" />
              {stats.achievements.length} trophies
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
};

const Games = async (): Promise<ReactElement> => {
  const allGames = await getOwnedGames();
  const recentGames = await getRecentGames();

  const collections = [
    {
      name: 'Recently Played',
      games: recentGames,
    },
    {
      name: 'All Games',
      games: allGames.sort(
        (gameA, gameB) => gameB.playtime_forever - gameA.playtime_forever
      ),
    },
  ];

  return (
    <Container wide>
      <h1 className="mb-0">{title}</h1>
      <p>{description}</p>
      <div className="mt-8 grid gap-8 not-prose">
        {Object.values(collections).map(({ name, games }) => (
          <div
            className="border border-zinc-200 dark:border-zinc-800 rounded-md p-4 space-y-4"
            key={name}
          >
            <p className="text-zinc-900 dark:text-zinc-100 font-semibold">
              {name}
            </p>
            <div className="grid md:grid-cols-2">
              {games.map((game) => (
                <Game data={game} key={game.appid} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Games;
