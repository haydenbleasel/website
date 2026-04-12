import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@haydenbleasel/design-system/components/ui/card";
import { getOwnedGames, getRecentGames } from "@/lib/steam";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  description: "What I've been playing on Steam.",
  title: "Games | OS1",
};

const formatPlaytime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  if (hours < 1) {
    return `${minutes}m`;
  }
  return `${hours}h`;
};

const GamesPage = async () => {
  const [recentGames, ownedGames] = await Promise.all([getRecentGames(), getOwnedGames()]);

  const sortedGames = ownedGames.toSorted((a, b) => b.minutes - a.minutes).slice(0, 50);

  return (
    <div className="flex flex-col gap-8 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Games</h1>
        <p className="text-muted-foreground">
          What I&apos;ve been playing on Steam. {ownedGames.length} games owned.
        </p>
      </div>

      {recentGames.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">Recently Played</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentGames.map((game) => (
              <Card key={game.game.id} size="sm">
                <Image
                  src={game.game.headerURL}
                  alt={game.game.name}
                  className="h-32 w-full object-cover"
                  width={128}
                  height={128}
                />
                <CardHeader>
                  <CardTitle>{game.game.name}</CardTitle>
                  <CardDescription>
                    {formatPlaytime(game.recentMinutes)} recently
                    {" / "}
                    {formatPlaytime(game.minutes)} total
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Most Played</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedGames.map((game) => (
            <Card key={game.game.id} size="sm">
              <Image
                src={game.game.headerURL}
                alt={"name" in game.game ? game.game.name : String(game.game.id)}
                className="h-32 w-full object-cover"
                width={128}
                height={128}
              />
              <CardHeader>
                <CardTitle>{"name" in game.game ? game.game.name : game.game.id}</CardTitle>
                <CardDescription>{formatPlaytime(game.minutes)} played</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GamesPage;
