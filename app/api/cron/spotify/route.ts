import { env } from '@/lib/env';
import { parseError } from '@/lib/utils';
import { updateEdgeConfig } from '@/lib/vercel';
import ky from 'ky';

export type SpotifyProperties = {
  lastUpdated: number;
  name: string;
  artist: string;
  image: string;
  href: string;
};

type SpotifyPlayingResponse = {
  item: {
    name: string;
    external_urls: {
      spotify: string;
    };
    album: {
      images: {
        url: string;
      }[];
    };
    artists: {
      name: string;
    }[];
  } | null;
};

type SpotifyTokenResponse = {
  access_token: string;
};

export const maxDuration = 300;
export const revalidate = 0;
export const dynamic = 'force-dynamic';

const getAccessToken = async (refreshToken: string): Promise<string> => {
  const tokenResponse = await ky
    .post<SpotifyTokenResponse>('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    })
    .json();

  return tokenResponse.access_token;
};

export const GET = async (): Promise<Response> => {
  try {
    const token = await getAccessToken(env.SPOTIFY_REFRESH_TOKEN);
    const data = await ky
      .get<SpotifyPlayingResponse>(
        'https://api.spotify.com/v1/me/player/currently-playing',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .json();

    if (!data.item) {
      // No song playing
      return new Response(undefined, { status: 204 });
    }

    const content: SpotifyProperties = {
      lastUpdated: Date.now(),
      name: data.item.name,
      artist: data.item.artists[0].name,
      image: data.item.album.images[0].url,
      href: data.item.external_urls.spotify,
    };

    await updateEdgeConfig('spotify', content);

    return new Response(undefined, { status: 204 });
  } catch (error) {
    const message = parseError(error);

    return new Response(message, { status: 500 });
  }
};
