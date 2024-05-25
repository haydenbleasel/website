import { get } from '@vercel/edge-config';
import { updateEdgeConfig } from '@/lib/vercel';
import { parseError } from '@/lib/utils';

export type SpotifyProps = {
  lastUpdated?: number;
  name?: string;
  artist?: string;
  image?: string;
  href?: string;
};

const getAccessToken = async (refreshToken: string): Promise<string> => {
  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    throw new Error('Missing Spotify Client ID or Client Secret');
  }

  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
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
  if (!process.env.SPOTIFY_REFRESH_TOKEN) {
    throw new Error('Missing Spotify Refresh Token');
  }

  try {
    const token = await getAccessToken(process.env.SPOTIFY_REFRESH_TOKEN);
    const currentTrack = await get<CurrentTrackProps>('currentTrack');

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
      return new Response(null, { status: 204 });
    }

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = (await response.json()) as {
      item: {
        name: string;
        href: string;
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
      return new Response(null, { status: 204 });
    }

    if (data.item.name === currentTrack?.name) {
      await updateEdgeConfig('spotify', { lastUpdated: Date.now() });

      return new Response(null, { status: 204 });
    }

    const content: SpotifyProps = {
      lastUpdated: Date.now(),
      name: data.item.name,
      artist: data.item.artists[0].name,
      image: data.item.album.images[0].url,
      href: data.item.href,
    };

    await updateEdgeConfig('spotify', content);

    return new Response(null, { status: 204 });
  } catch (error) {
    const message = parseError(error);

    return new Response(message, { status: 500 });
  }
};
