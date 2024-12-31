import { env } from '@/lib/env';
import ky from 'ky';

export type RecentlyPlayedGame = {
  appid: number;
  name: string;
  playtime_2weeks: number;
  playtime_forever: number;
  img_icon_url: string;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
};

export type GetRecentlyPlayedGamesResponse = {
  response?: {
    total_count: number;
    games?: RecentlyPlayedGame[];
  };
};

export type GetUserStatsForGameResponse = {
  playerstats: {
    steamID: string;
    gameName: string;
    achievements: {
      name: string;
      achieved: number;
    }[];
  };
};

export type GetOwnedGamesResponse = {
  response: {
    game_count: number;
    games: {
      appid: number;
      name: string;
      playtime_forever: number;
      img_icon_url: string;
      playtime_windows_forever: number;
      playtime_mac_forever: number;
      playtime_linux_forever: number;
      playtime_deck_forever: number;
      rtime_last_played: number;
      content_descriptorids?: number[];
      playtime_disconnected: number;
      has_community_visible_stats?: boolean;
      has_leaderboards?: boolean;
      playtime_2weeks?: number;
    }[];
  };
};

export const getRecentlyPlayedGame = async (): Promise<RecentlyPlayedGame> => {
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

export const getUserStatsForGame = async (appId: number) => {
  const url = new URL(
    'https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/'
  );

  url.searchParams.set('appid', appId.toString());
  url.searchParams.set('key', env.STEAM_API_KEY);
  url.searchParams.set('steamid', env.STEAM_ID);
  url.searchParams.set('format', 'json');

  return await ky.get<GetUserStatsForGameResponse>(url).json();
};

export const getOwnedGames = async () => {
  const url = new URL(
    'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001'
  );

  url.searchParams.set('key', env.STEAM_API_KEY);
  url.searchParams.set('steamid', env.STEAM_ID);
  url.searchParams.set('format', 'json');
  url.searchParams.set('include_appinfo', '1');

  const data = await ky.get<GetOwnedGamesResponse>(url).json();

  return data.response.games;
};
