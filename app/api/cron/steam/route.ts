import { env } from '@/lib/env';
import { parseError } from '@/lib/utils';
import { updateEdgeConfig } from '@/lib/vercel';
import ky from 'ky';

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

type GetRecentlyPlayedGamesResponse = {
  response?: {
    total_count: number;
    games?: {
      appid: number;
      name: string;
      playtime_2weeks: number;
      playtime_forever: number;
      img_icon_url: string;
      playtime_windows_forever: number;
      playtime_mac_forever: number;
      playtime_linux_forever: number;
    }[];
  };
};

type GetUserStatsForGameResponse = {
  playerstats: {
    steamID: string;
    gameName: string;
    achievements: {
      name: string;
      achieved: number;
    }[];
  };
};

const getRecentlyPlayedGames = async () => {
  const url = new URL(
    'https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/'
  );

  url.searchParams.set('key', env.STEAM_API_KEY);
  url.searchParams.set('steamid', env.STEAM_ID);
  url.searchParams.set('format', 'json');

  const data = await ky.get<GetRecentlyPlayedGamesResponse>(url).json();

  if (!data.response?.games) {
    throw new Error('Invalid response format from Steam API');
  }

  if (!data.response.games.length) {
    throw new Error('No games found');
  }

  return data.response.games[0];
};

const getUserStatsForGame = async (appId: number) => {
  const url = new URL(
    'https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/'
  );

  url.searchParams.set('appid', appId.toString());
  url.searchParams.set('key', env.STEAM_API_KEY);
  url.searchParams.set('steamid', env.STEAM_ID);
  url.searchParams.set('format', 'json');

  return await ky.get<GetUserStatsForGameResponse>(url).json();
};

export const GET = async (): Promise<Response> => {
  try {
    const data = await getRecentlyPlayedGames();
    const userStatsData = await getUserStatsForGame(data.appid);
    const complete = userStatsData.playerstats.achievements.filter(
      (achievement) => achievement.achieved === 1
    ).length;

    const properties: GameProperties = {
      id: data.appid,
      image: `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${data.appid}/header.jpg`,
      playtime: data.playtime_forever,
      name: data.name,
      completeAchievements: complete,
    };

    await updateEdgeConfig('steam', properties);

    return new Response(undefined, { status: 204 });
  } catch (error) {
    const message = parseError(error);

    return new Response(message, { status: 500 });
  }
};
