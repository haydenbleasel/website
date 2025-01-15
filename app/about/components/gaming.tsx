import { StickyList } from '@/components/sections/sticky-list';
import { type GetOwnedGamesResponse, getOwnedGames } from '@/lib/steam';
import { cn } from '@/lib/utils';
import { RevealProvider } from '@/providers/reveal';
import { ViewAnimation } from '@/providers/view-animation';
import { Pump } from 'basehub/react-pump';
import Image from 'next/image';

const mergeGames = (games: GetOwnedGamesResponse['response']['games']) => {
  const newGames = [...games];
  const oldSkyrimGame = games.find((game) => game.appid === 72850);
  const newSkyrimGame = games.find((game) => game.appid === 489830);

  if (oldSkyrimGame && newSkyrimGame) {
    newSkyrimGame.playtime_forever += oldSkyrimGame.playtime_forever;
    newSkyrimGame.name = 'The Elder Scrolls V: Skyrim (all editions)';

    newGames.splice(newGames.indexOf(oldSkyrimGame), 1);
  }

  const oldAoe2 = games.find((game) => game.appid === 221380);
  const newAoe2 = games.find((game) => game.appid === 813780);

  if (oldAoe2 && newAoe2) {
    newAoe2.playtime_forever += oldAoe2.playtime_forever;
    newAoe2.name = 'Age of Empires II (all editions)';

    newGames.splice(newGames.indexOf(oldAoe2), 1);
  }

  const oldMafia2 = games.find((game) => game.appid === 50130);
  const newMafia2 = games.find((game) => game.appid === 1030830);

  if (oldMafia2 && newMafia2) {
    newMafia2.playtime_forever += oldMafia2.playtime_forever;
    newMafia2.name = 'Mafia II (all editions)';

    newGames.splice(newGames.indexOf(oldMafia2), 1);
  }

  const blackOps2Zombies = games.find((game) => game.appid === 212910);
  const blackOps2Multi = games.find((game) => game.appid === 202990);
  const blackOps2 = games.find((game) => game.appid === 202970);

  if (blackOps2Zombies && blackOps2Multi && blackOps2) {
    blackOps2.playtime_forever += blackOps2Zombies.playtime_forever;
    blackOps2.playtime_forever += blackOps2Multi.playtime_forever;
    blackOps2.name = 'Call of Duty: Black Ops II';

    newGames.splice(newGames.indexOf(blackOps2Zombies), 1);
    newGames.splice(newGames.indexOf(blackOps2Multi), 1);
  }

  const oldDmc4 = games.find((game) => game.appid === 45700);
  const newDmc4 = games.find((game) => game.appid === 329050);

  if (oldDmc4 && newDmc4) {
    newDmc4.playtime_forever += oldDmc4.playtime_forever;
    newDmc4.name = 'Devil May Cry 4 (all editions)';

    newGames.splice(newGames.indexOf(oldDmc4), 1);
  }

  return newGames;
};

export const Gaming = async () => {
  const games = await getOwnedGames();
  const mergedGames = mergeGames(games);

  return (
    <Pump
      queries={[
        {
          __typename: true,
          about: {
            gaming: {
              title: true,
              text: true,
            },
          },
        },
      ]}
    >
      {async ([data]) => {
        'use server';

        return (
          <StickyList
            title={data.about.gaming.title}
            description={data.about.gaming.text}
          >
            <RevealProvider>
              <div className="grid sm:grid-cols-2">
                {mergedGames
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
          </StickyList>
        );
      }}
    </Pump>
  );
};
