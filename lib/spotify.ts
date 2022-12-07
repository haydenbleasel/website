type SpotifyPlaylist = {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: unknown;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
};

type SpotifyPlaylistDetailed = {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: unknown;
    total: number;
  };
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: unknown;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    items: {
      added_at: string;
      added_by: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        type: string;
        uri: string;
      };
      is_local: boolean;
      primary_color: unknown;
      track: {
        album: {
          album_type: string;
          artists: {
            external_urls: {
              spotify: string;
            };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
          }[];
          available_markets: string[];
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          images: {
            height: number;
            url: string;
            width: number;
          }[];
          name: string;
          release_date: string;
          release_date_precision: string;
          total_tracks: number;
          type: string;
          uri: string;
        };
        artists: {
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          name: string;
          type: string;
          uri: string;
        }[];
        available_markets: string[];
        disc_number: number;
        duration_ms: number;
        episode: boolean;
        explicit: boolean;
        external_ids: {
          isrc: string;
        };
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        is_local: boolean;
        name: string;
        popularity: number;
        preview_url: string;
        track: boolean;
        track_number: number;
        type: string;
        uri: string;
      };
      video_thumbnail: {
        url: unknown;
      };
    }[];
    limit: number;
    next: unknown;
    offset: number;
    previous: unknown;
    total: number;
  };
  type: string;
  uri: string;
};

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

export const getSpotifyPlaylist = async (
  id: string
): Promise<SpotifyPlaylistDetailed> => {
  const access_token = await getAccessToken();
  const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return (await response.json()) as SpotifyPlaylistDetailed;
};

export const getSpotifyPlaylists = async (): Promise<SpotifyPlaylist[]> => {
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

  return items.filter((playlist) => playlist.public);
};
