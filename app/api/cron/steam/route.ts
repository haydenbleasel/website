import { getRecentlyPlayedGame, getUserStatsForGame } from '@/lib/steam';
import { parseError } from '@/lib/utils';
import { updateEdgeConfig } from '@/lib/vercel';

export const maxDuration = 300;
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export type GameProperties = {
  id: number;
  image: string;
  playtime: number;
  name: string;
  completeAchievements: number;
};

export const GET = async (): Promise<Response> => {
  try {
    const game = await getRecentlyPlayedGame();
    const userStatsData = await getUserStatsForGame(game.appid);
    const complete = userStatsData.playerstats.achievements.filter(
      (achievement) => achievement.achieved === 1
    ).length;

    const properties: GameProperties = {
      id: game.appid,
      image: `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.appid}/header.jpg`,
      playtime: game.playtime_forever,
      name: game.name,
      completeAchievements: complete,
    };

    await updateEdgeConfig('steam', properties);

    return new Response(undefined, { status: 204 });
  } catch (error) {
    const message = parseError(error);

    return new Response(message, { status: 500 });
  }
};
