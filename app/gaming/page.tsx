import { ClockIcon, StarIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { Link } from '@/components/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/container';
import { getOwnedGames, getPlayerAchievements } from '@/lib/steam';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { SteamGame } from '@/lib/steam';
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
  readonly data: SteamGame;
}): Promise<ReactElement> => {
  const stats = await getPlayerAchievements(data.appid);
  let imageUrl: string | null =
    `https://steamcdn-a.akamaihd.net/steam/apps/${data.appid}/library_hero.jpg`;

  const complete = stats.achievements.filter(
    (achievement) => achievement.achieved === 1
  ).length;

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
      key={data.name}
      className="no-underline hover:-translate-y-1 transition-transform"
    >
      <Card className="not-prose overflow-hidden bg-white dark:bg-zinc-800">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt=""
            width={1920}
            height={620}
            unoptimized
            className="aspect-[1920/620] object-cover"
          />
        ) : (
          <div className="aspect-[1920/620] bg-zinc-500 dark:bg-zinc-400" />
        )}
        <CardHeader>
          <CardTitle className="leading-tight">{data.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            <span className="flex items-center gap-1">
              <ClockIcon className="w-3 h-3" />
              {Math.round(data.playtime_forever / 60)} hours
            </span>
            {stats.achievements.length ? (
              <span className="flex items-center gap-1">
                <StarIcon className="w-3 h-3" />
                {complete} / {stats.achievements.length} achievements
              </span>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

const Games = async (): Promise<ReactElement> => {
  const games = await getOwnedGames();

  return (
    <Container wide>
      <h1 className="mb-0">{title}</h1>
      <p>{description}</p>
      <div className="mt-8 grid grid-cols-2 gap-8">
        {games
          .sort(
            (gameA, gameB) => gameB.playtime_forever - gameA.playtime_forever
          )
          .map((game) => (
            <Game data={game} key={game.appid} />
          ))}
      </div>
    </Container>
  );
};

export default Games;
