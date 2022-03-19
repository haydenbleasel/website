export type SpotifyPlaylistPreview = {
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

export type ExternalUrls = {
  spotify: string;
};

export type Image = {
  height: null;
  url: string;
  width: null;
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
