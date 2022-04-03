import type { GetStaticProps } from 'next';
import Link from 'next/link';
import type { FC } from 'react';
import { ArrowUpRight } from 'react-feather';
import Layout from '../components/layout';
import List from '../components/list';
import type { SpotifyPlaylist } from '../types/spotify';
import { getPlaylists } from '../utils/spotify';

type PlaylistsProps = {
  playlists: SpotifyPlaylist[];
};

const Playlists: FC<PlaylistsProps> = ({ playlists }) => (
  <Layout
    title="Playlists"
    description="Curated playlists from my Spotify library."
  >
    <div className="grid gap-8">
      <List
        data={playlists}
        renderItem={(playlist: SpotifyPlaylist) => (
          <Link href={playlist.external_urls.spotify} passHref>
            <a href={playlist.external_urls.spotify}>
              <div className="flex gap-8 py-2" key={playlist.id}>
                <p className="flex flex-1 items-center gap-2 text-md text-gray-900 dark:text-white">
                  <span>{playlist.name}</span>
                  <ArrowUpRight size={16} />
                </p>
                <p className="flex-0 w-24 text-right text-sm text-gray-400 dark:text-gray-500">
                  {playlist.tracks.total} tracks
                </p>
              </div>
            </a>
          </Link>
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
