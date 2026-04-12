const clientId = process.env.SPOTIFY_CLIENT_ID ?? "";
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET ?? "";
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN ?? "";

const getAccessToken = async (): Promise<string> => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Spotify token error: ${response.status} ${error}`);
  }

  const data = (await response.json()) as { access_token: string };
  return data.access_token;
};

const spotifyFetch = async <T>(endpoint: string): Promise<T> => {
  const accessToken = await getAccessToken();

  const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 204) {
    return null as T;
  }

  if (!response.ok) {
    throw new Error(`Spotify API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

interface SpotifyArtist {
  id: string;
  name: string;
  images: SpotifyImage[];
  genres: string[];
  external_urls: { spotify: string };
}

interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string; id: string }[];
  album: {
    name: string;
    images: SpotifyImage[];
  };
  duration_ms: number;
  external_urls: { spotify: string };
}

interface SpotifyCurrentlyPlaying {
  is_playing: boolean;
  item: SpotifyTrack | null;
  progress_ms: number;
}

interface SpotifyAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
  artists: { name: string; id: string }[];
  external_urls: { spotify: string };
  total_tracks: number;
}

interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string | null;
  images: SpotifyImage[];
  external_urls: { spotify: string };
  tracks: { total: number };
  owner: { id: string };
  public: boolean;
}

export type { SpotifyAlbum, SpotifyArtist, SpotifyTrack, SpotifyCurrentlyPlaying, SpotifyPlaylist };

export const getTopTracks = async () => {
  const data = await spotifyFetch<{ items: SpotifyTrack[] }>(
    "/me/top/tracks?limit=20&time_range=medium_term",
  );
  return data.items;
};

export const getTopArtists = async () => {
  const data = await spotifyFetch<{ items: SpotifyArtist[] }>(
    "/me/top/artists?limit=20&time_range=medium_term",
  );
  return data.items;
};

export const getCurrentlyPlaying = () =>
  spotifyFetch<SpotifyCurrentlyPlaying | null>("/me/player/currently-playing");

export const getMyPlaylists = async () => {
  const data = await spotifyFetch<{ items: SpotifyPlaylist[] }>("/me/playlists?limit=50");

  const userId = await spotifyFetch<{ id: string }>("/me");

  return data.items
    .filter((playlist) => playlist.owner.id === userId.id && playlist.public)
    .map((playlist) => ({
      ...playlist,
      description: playlist.description
        ? playlist.description
            .replaceAll("&amp;", "&")
            .replaceAll("&#x27;", "'")
            .replaceAll("&quot;", '"')
            .replaceAll("&lt;", "<")
            .replaceAll("&gt;", ">")
        : null,
    }));
};

export const getSavedAlbums = async () => {
  const data = await spotifyFetch<{ items: { added_at: string; album: SpotifyAlbum }[] }>(
    "/me/albums?limit=50",
  );
  return data.items.map((item) => item.album);
};
