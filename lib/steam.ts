/* eslint-disable @typescript-eslint/naming-convention */

export type SteamGame = {
  appid: number;
  name: string;
  playtime_forever: number;
  img_icon_url: string;
  content_descriptorids?: number[];
  playtime_2weeks?: number;
  has_community_visible_stats?: boolean;
  has_leaderboards?: boolean;
};

type GetOwnedGamesResponse = {
  response: {
    game_count: number;
    games: SteamGame[];
  };
};

type GetUserStatsForGameResponse = {
  playerstats?: {
    steamID: string;
    gameName: string;
    achievements?: {
      name: string;
      achieved: number;
    }[];
  };
};

const steamId = '76561198049792324';

export const getUserStatsForGame = async (
  appId: number
): Promise<GetUserStatsForGameResponse['playerstats']> => {
  if (!process.env.STEAM_API_KEY) {
    throw new Error('Missing Steam API key');
  }

  const response = await fetch(
    `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appId}&key=${process.env.STEAM_API_KEY}&steamid=${steamId}&format=json`
  );

  const data = (await response.json()) as GetUserStatsForGameResponse;

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
