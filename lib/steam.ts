/* eslint-disable @typescript-eslint/naming-convention */

export type BaseSteamGame = {
  appid: number;
  name: string;
  playtime_2weeks: number;
  playtime_forever: number;
  img_icon_url: string;
};

type GetOwnedGamesResponse = {
  response: {
    game_count: number;
    games: (BaseSteamGame & {
      content_descriptorids?: number[];
      has_community_visible_stats?: boolean;
      has_leaderboards?: boolean;
    })[];
  };
};

type GetPlayerAchievementsResponse = {
  playerstats?: {
    steamID: string;
    gameName: string;
    achievements?: {
      apiname: string;
      achieved: number;
      unlocktime: number;
    }[];
    success: boolean;
  };
};

type GetRecentlyPlayedGamesResponse = {
  response: {
    total_count: number;
    games: (BaseSteamGame & {
      playtime_windows_forever: number;
      playtime_mac_forever: number;
      playtime_linux_forever: number;
    })[];
  };
};

const steamId = '76561198049792324';

export const getPlayerAchievements = async (
  appId: number
): Promise<GetPlayerAchievementsResponse['playerstats']> => {
  if (!process.env.STEAM_API_KEY) {
    throw new Error('Missing Steam API key');
  }

  const response = await fetch(
    `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appId}&key=${process.env.STEAM_API_KEY}&steamid=${steamId}&format=json`
  );

  const data = (await response.json()) as GetPlayerAchievementsResponse;

  return data.playerstats;
};

export const getOwnedGames = async (): Promise<
  GetOwnedGamesResponse['response']['games']
> => {
  if (!process.env.STEAM_API_KEY) {
    throw new Error('Missing Steam API key');
  }

  const response = await fetch(
    `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${steamId}&format=json&include_appinfo=1`
  );

  const data = (await response.json()) as GetOwnedGamesResponse;

  return data.response.games.filter(
    ({ playtime_forever }) => playtime_forever > 60
  );
};

export const getRecentGames = async (): Promise<
  GetRecentlyPlayedGamesResponse['response']['games']
> => {
  if (!process.env.STEAM_API_KEY) {
    throw new Error('Missing Steam API key');
  }

  const response = await fetch(
    `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${steamId}&format=json`
  );

  const data = (await response.json()) as GetRecentlyPlayedGamesResponse;

  return data.response.games.filter(
    ({ playtime_forever }) => playtime_forever > 60
  );
};
