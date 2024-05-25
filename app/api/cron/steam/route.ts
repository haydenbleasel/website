import { parseError } from '@/lib/utils';
import { updateEdgeConfig } from '@/lib/vercel';

const steamId = process.env.STEAM_ID;
const steamApiKey = process.env.STEAM_API_KEY;
const vercelToken = process.env.VERCEL_TOKEN;
const edgeConfigId = process.env.EDGE_CONFIG_ID;

if (!steamId || !steamApiKey || !vercelToken || !edgeConfigId) {
  throw new Error(
    'Missing Steam ID, Steam API Key, Vercel Token, or Edge Config ID'
  );
}

export type GameProps = {
  name: string;
  image: string;
  playtime: number;
  url: string;
};

export const GET = async () => {
  const url = new URL(
    '/IPlayerService/GetRecentlyPlayedGames/v0001/',
    'http://api.steampowered.com/'
  );

  url.searchParams.append('key', steamApiKey);
  url.searchParams.append('steamid', steamId);
  url.searchParams.append('format', 'json');

  try {
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
      return new Response('No games found', { status: 200 });
    }

    const [game] = data.response.games;
    const content: GameProps = {
      name: game.name,
      url: `https://store.steampowered.com/app/${game.appid}`,
      image: `https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`,
      playtime: game.playtime_forever,
    };

    await updateEdgeConfig('steam', content);

    return new Response(null, { status: 204 });
  } catch (error) {
    const message = parseError(error);

    return new Response(message, { status: 500 });
  }
};
