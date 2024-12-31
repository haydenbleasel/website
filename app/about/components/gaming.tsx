import { Prose } from '@/components/prose';
import { Section } from '@/components/section';
import { getOwnedGames } from '@/lib/steam';
import { cn } from '@/lib/utils';
import { RevealProvider } from '@/providers/reveal';
import { ViewAnimation } from '@/providers/view-animation';
import Image from 'next/image';

export const Gaming = async () => {
  const games = await getOwnedGames();

  return (
    <Section className="grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      <div className="bg-dashed">
        <div className="sticky top-16 flex flex-col gap-1.5 p-8">
          <h2 className="font-semibold text-2xl">Games</h2>
          <Prose className="prose-sm">I play... a lot of games.</Prose>
        </div>
      </div>
      <RevealProvider className="sm:col-span-2">
        <div className="grid sm:grid-cols-2">
          {games
            .filter((game) => game.playtime_forever > 60)
            .sort((a, b) => b.playtime_forever - a.playtime_forever)
            .map((game, index) => (
              <a
                key={game.appid}
                href={`https://store.steampowered.com/app/${game.appid}`}
                target="_blank"
                rel="noreferrer noopener"
                className={cn(
                  index > 1 && 'border-t',
                  index % 2 === 0 && 'sm:border-r',
                  'p-4 transition-all',
                  'hover:bg-background hover:shadow-sm'
                )}
              >
                <ViewAnimation
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  delay={index % 2 ? 0.2 : 0}
                  className="flex items-center gap-4"
                >
                  <Image
                    src={`https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.appid}/header.jpg`}
                    alt=""
                    width={460}
                    height={256}
                    className="w-32 shrink-0 rounded-lg object-cover"
                  />
                  <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
                    <h3 className="truncate font-semibold tracking-tight">
                      {game.name}
                    </h3>
                    <p className="truncate text-muted-foreground text-sm">
                      {new Intl.NumberFormat('en-US', {
                        style: 'unit',
                        unit: 'hour',
                        maximumFractionDigits: 0,
                      }).format(game.playtime_forever / 60)}
                    </p>
                  </div>
                </ViewAnimation>
              </a>
            ))}
          {games.length % 2 === 1 && (
            <div className="h-full w-full border-t bg-dashed" />
          )}
        </div>
      </RevealProvider>
    </Section>
  );
};
