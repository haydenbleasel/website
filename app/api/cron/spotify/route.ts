import { get } from '@vercel/edge-config';
import { updateEdgeConfig } from '@/lib/vercel';
import { parseError } from '@/lib/utils';

export type SpotifyProperties = {
  lastUpdated: number;
  name: string;
  artist: string;
  image: string;
  href: string;
};

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const spotifyRefreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

if (!spotifyClientId || !spotifyClientSecret || !spotifyRefreshToken) {
  throw new Error('Missing Spotify Client ID, Client Secret, or Refresh Token');
}

const getAccessToken = async (refreshToken: string): Promise<string> => {
  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${spotifyClientId}:${spotifyClientSecret}`
      ).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    next: {
      revalidate: 0,
    },
  });

  const tokenData = (await tokenResponse.json()) as {
    access_token: string;
  };

  return tokenData.access_token;
};

export const GET = async (): Promise<Response> => {
  try {
    const token = await getAccessToken(spotifyRefreshToken);
    const currentTrack = await get<SpotifyProperties>('spotify');

    const response = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        next: {
          revalidate: 0,
        },
      }
    );

    if (response.status === 204) {
      return new Response(undefined, { status: 204 });
    }

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = (await response.json()) as {
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

    if (!data.item) {
      return new Response(undefined, { status: 204 });
    }

    if (data.item.name === currentTrack?.name) {
      await updateEdgeConfig('spotify', { lastUpdated: Date.now() });

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
