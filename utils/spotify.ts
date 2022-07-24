import type { SpotifyPlaylist } from '../types/spotify';

export type PlaylistsResponse = {
  id: SpotifyPlaylist['id'];
  name: SpotifyPlaylist['name'];
  tracks: SpotifyPlaylist['tracks']['total'];
  url: SpotifyPlaylist['external_urls']['spotify'];
}[];

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

export const getPlaylists = async (): Promise<PlaylistsResponse> => {
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
    items: SpotifyPlaylist[];
  };

  const playlists = items.map((playlist) => ({
    id: playlist.id,
    name: playlist.name,
    tracks: playlist.tracks.total,
    url: playlist.external_urls.spotify,
  }));

  return playlists;
};
