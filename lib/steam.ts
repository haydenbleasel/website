import 'server-only';

const steamId = process.env.STEAM_ID;
const steamApiKey = process.env.STEAM_API_KEY;

if (!steamId || !steamApiKey) {
  throw new Error('Missing Steam ID or API key');
}

export const getRecentGame = async (): Promise<{
  name: string;
  url: string;
  image: string;
  playtime: number;
} | null> => {
  const url = new URL(
    '/IPlayerService/GetRecentlyPlayedGames/v0001/',
    'http://api.steampowered.com/'
  );

  url.searchParams.append('key', steamApiKey);
  url.searchParams.append('steamid', steamId);
  url.searchParams.append('format', 'json');

  const response = await fetch(url.toString());
  const data = (await response.json()) as {
    response: {
      games: {
        appid: number;
        name: string;
        img_icon_url: string;
        playtime_forever: number;
      }[];
    };
  };

  if (!data.response.games.length) {
    return null;
  }

  const [game] = data.response.games;

  return {
    name: game.name,
    url: `https://store.steampowered.com/app/${game.appid}`,
    image: `https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`,
    playtime: game.playtime_forever,
  };
};
