import type { SpotifyPlaylistPreview } from "../types/spotify/playlistPreview";
import type { SpotifyTrack } from "../types/spotify/track";
import type { SpotifyPlaylistDetailed } from "../types/spotify/playlistDetailed";

const getAccessToken = async (): Promise<string> => {
  const authorization = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID ?? ""}:${
      process.env.SPOTIFY_CLIENT_SECRET ?? ""
    }`
  ).toString("base64");
  const grant = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authorization}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const { access_token } = (await grant.json()) as { access_token: string };

  return access_token;
};

export const getPlaylist = async (
  id: string
): Promise<{
  data: SpotifyPlaylistDetailed;
  tracks: SpotifyTrack[];
}> => {
  const access_token = await getAccessToken();

  const tracksRequest = await fetch(
    `https://api.spotify.com/v1/playlists/${id}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const { items } = (await tracksRequest.json()) as {
    items: SpotifyTrack[];
  };

  const playlistRequest = await fetch(
    `https://api.spotify.com/v1/playlists/${id}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const playlist = (await playlistRequest.json()) as SpotifyPlaylistDetailed;

  return {
    data: playlist,
    tracks: items,
  };
};

export const getPlaylists = async (): Promise<SpotifyPlaylistPreview[]> => {
  const access_token = await getAccessToken();

  const playlistsRequest = await fetch(
    "https://api.spotify.com/v1/users/haydenbleasel/playlists?limit=50",
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
