import SteamAPI from "steamapi";

const steam = new SteamAPI(process.env.STEAM_API_KEY ?? "");

const steamId = process.env.STEAM_ID ?? "";

export const getRecentGames = () => steam.getUserRecentGames(steamId);

export const getOwnedGames = () =>
  steam.getUserOwnedGames(steamId, {
    includeAppInfo: true,
    includeExtendedAppInfo: true,
  });
