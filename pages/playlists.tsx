import { PrismicLink } from '@prismicio/react';
import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import { ArrowUpRight } from 'react-feather';
import Layout from '../components/layout';
import List from '../components/list';
import type { SpotifyPlaylistPreview } from '../types/spotify/playlistPreview';
import { getPlaylists } from '../utils/spotify';

type PlaylistsProps = {
  playlists: SpotifyPlaylistPreview[];
};

const Playlists: FC<PlaylistsProps> = ({ playlists }) => (
  <Layout
    title="Playlists"
    description="Curated playlists from my Spotify library."
  >
    <div className="grid gap-8">
      <List
        data={playlists}
        renderItem={(playlist: SpotifyPlaylistPreview) => (
          <PrismicLink href={playlist.external_urls.spotify}>
            <div className="flex gap-8 py-2" key={playlist.id}>
              <p className="flex flex-1 items-center gap-2 text-md text-gray-900 dark:text-white">
                <span>{playlist.name}</span>
                <ArrowUpRight size={16} />
              </p>
              <p className="flex-0 w-24 text-right text-sm text-gray-400 dark:text-gray-500">
                {playlist.tracks.total} tracks
              </p>
            </div>
          </PrismicLink>
        )}
      />
    </div>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const playlists = await getPlaylists();

  return {
    props: {
      playlists,
    },
  };
};

export default Playlists;
