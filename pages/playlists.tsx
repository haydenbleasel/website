import type { GetStaticProps } from 'next';
import Link from 'next/link';
import type { FC } from 'react';
import { Fragment } from 'react';
import { ArrowUpRight } from 'react-feather';
import Divider from '../components/divider';
import Layout from '../components/layout';
import type { SpotifyPlaylist } from '../types/spotify';
import { getPlaylists } from '../utils/spotify';

type PlaylistsProps = {
  playlists: SpotifyPlaylist[];
};

const Playlist = ({ external_urls, id, name, tracks }: SpotifyPlaylist) => (
  <Link href={external_urls.spotify} passHref>
    <a href={external_urls.spotify}>
      <div className="flex gap-8 py-2" key={id}>
        <p className="flex flex-1 items-center gap-2 text-md text-gray-900 dark:text-white">
          <span>{name}</span>
          <ArrowUpRight size={16} />
        </p>
        <p className="flex-0 w-24 text-right text-sm text-gray-400 dark:text-gray-500">
          {tracks.total} tracks
        </p>
      </div>
    </a>
  </Link>
);

const Playlists: FC<PlaylistsProps> = ({ playlists }) => (
  <Layout
    title="Playlists"
    description="Curated playlists from my Spotify library."
  >
    <div className="group">
      {playlists.map((item, index) => (
        <Fragment key={index}>
          {Boolean(index) && <Divider />}
          <div className="transition-opacity group-hover:opacity-30 group-hover:hover:opacity-100">
            <Playlist {...item} />
          </div>
        </Fragment>
      ))}
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
