export type SpotifyPlaylist = {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color: null;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
};

export type Owner = {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
};

export type Tracks = {
  href: string;
  total: number;
};

export type SpotifyTrack = {
  added_at: Date;
  added_by: AddedBy;
  is_local: boolean;
  primary_color: null;
  track: Track;
  video_thumbnail: VideoThumbnail;
};

export type AddedBy = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
  name?: string;
};

export type Track = {
  album: Album;
  artists: AddedBy[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  episode: boolean;
  explicit: boolean;
  external_ids: Externalids;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track: boolean;
  track_number: number;
  type: string;
  uri: string;
};

export type Album = {
  album_type: string;
  artists: AddedBy[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: Date;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
};

export type Image = {
  height: null;
  url: string;
  width: null;
};

export type ExternalUrls = {
  spotify: string;
};

export type Externalids = {
  isrc: string;
};

export type VideoThumbnail = {
  url: null;
};
