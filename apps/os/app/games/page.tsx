import { getOwnedGames, getRecentGames } from "@/lib/steam";
import type { Metadata } from "next";
import Image from "next/image";
import type { GameInfoBasic, UserPlaytime } from "steamapi";

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

const Game = ({ game }: { game: UserPlaytime<GameInfoBasic> }) => (
  <div key={game.game.id} className="flex items-center flex-row gap-4">
    <Image
      src={game.game.headerURL}
      alt={game.game.name}
      className="w-32 h-15 shrink-0 rounded-lg"
      width={128}
      height={60}
    />
    <p className="flex-1 font-medium">{game.game.name}</p>
    <p className="shrink-0 text-sm text-muted-foreground">
      {formatPlaytime(game.recentMinutes)} recently
      {" / "}
      {formatPlaytime(game.minutes)} total
    </p>
  </div>
);

const GamesPage = async () => {
  const [recentGames, ownedGames] = await Promise.all([getRecentGames(), getOwnedGames()]);

  const sortedGames = ownedGames.toSorted((a, b) => b.minutes - a.minutes).slice(0, 50);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold">Games</h1>
        <p className="text-muted-foreground">
          What I&apos;ve been playing on Steam. {ownedGames.length} games owned.
        </p>
      </div>

      {recentGames.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">Recently Played</h2>
          <div className="grid gap-4">
            {recentGames.map((game) => (
              <Game game={game} key={game.game.id} />
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Most Played</h2>
        <div className="grid gap-4">
          {sortedGames.map((game) => (
            // @ts-expect-error "tbd"
            <Game game={game} key={game.game.id} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default GamesPage;
