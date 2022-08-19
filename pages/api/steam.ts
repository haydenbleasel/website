import type { NextRequest } from 'next/server';
import res from '../../utils/response';

type SteamResponse = {
  response: {
    players: {
      personastate: number;
      gameextrainfo?: string;
    }[];
  };
};

export const config = {
  runtime: 'experimental-edge',
};

const handler = async (req: NextRequest): Promise<Response> => {
  if (
    req.headers.get('authorization') !==
    `Bearer ${process.env.NEXT_PUBLIC_API_PASSPHRASE ?? ''}`
  ) {
    return res(401, { error: 'Unauthorized' });
  }

  if (req.method !== 'GET') {
    return res(405, { error: 'Method not allowed' });
  }

  try {
    const response = await fetch(
      `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${
        process.env.STEAM_API_KEY ?? ''
      }&steamids=${process.env.STEAM_ID ?? ''}`
    );

    const data = (await response.json()) as SteamResponse;
    const { personastate, gameextrainfo } = data.response.players[0];

    // 0 means offline, everything else is a variation of online.
    if (personastate && gameextrainfo) {
      return res(200, {
        status: 'online',
        game: gameextrainfo,
      });
    }

    return res(200, { status: 'offline', game: undefined });
  } catch (error) {
    const message = error instanceof Error ? error.message : (error as string);

    return res(500, { error: message });
  }
};

export default handler;
