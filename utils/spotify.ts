import type { SpotifyPlaylistPreview } from '../types/spotify/playlistPreview';

const getAccessToken = async (): Promise<string> => {
  const authorization = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID ?? ''}:${
      process.env.SPOTIFY_CLIENT_SECRET ?? ''
    }`
  ).toString('base64');
  const grant = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${authorization}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const { access_token } = (await grant.json()) as { access_token: string };

  return access_token;
};

export const getPlaylists = async (): Promise<SpotifyPlaylistPreview[]> => {
  const access_token = await getAccessToken();

  const playlistsRequest = await fetch(
    'https://api.spotify.com/v1/users/haydenbleasel/playlists?limit=50',
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const { items } = (await playlistsRequest.json()) as {
    items: SpotifyPlaylistPreview[];
  };

  return items;
};
