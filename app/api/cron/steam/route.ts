import { env } from '@/lib/env';
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
  const response = await fetch(
    `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${env.STEAM_API_KEY}&steamid=${env.STEAM_ID}&format=json`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 0,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      'Invalid response format from Steam API: getRecentlyPlayedGames'
    );
  }

  try {
    const data = (await response.json()) as GetRecentlyPlayedGamesResponse;

    if (!data.response?.games) {
      throw new Error('Invalid response format from Steam API');
    }

    return data.response.games[0];
  } catch {
    throw new Error(
      'Cannot parse response from Steam API: getRecentlyPlayedGames'
    );
  }
};

const getUserStatsForGame = async (appId: number) => {
  const response = await fetch(
    `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appId}&key=${env.STEAM_API_KEY}&steamid=${env.STEAM_ID}&format=json`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 0,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      'Invalid response format from Steam API: getUserStatsForGame'
    );
  }

  try {
    return (await response.json()) as GetUserStatsForGameResponse;
  } catch {
    throw new Error(
      'Cannot parse response from Steam API: getUserStatsForGame'
    );
  }
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
