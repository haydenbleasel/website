import type { GetStaticProps } from 'next';
import Link from 'next/link';
import type { FC } from 'react';
import { ArrowUpRight } from 'react-feather';
import Layout from '../components/layout';
import List from '../components/list';
import type { PlaylistsResponse } from '../utils/spotify';
import { getPlaylists } from '../utils/spotify';

type PlaylistsProps = {
  playlists: PlaylistsResponse;
};

const Playlist = ({ url, id, name, tracks }: PlaylistsResponse[number]) => (
  <Link
    href={url}
    key={id}
    target="_blank"
    rel="noopener noreferrer"
    className="no-underline"
  >
    <span className="flex gap-8 py-2">
      <span className="flex flex-1 items-center gap-2">
        <span>{name}</span>
        <ArrowUpRight size={16} />
      </span>
      <span className="flex-0 w-24 text-right text-sm text-gray-400 dark:text-gray-500">
        {tracks} tracks
      </span>
    </span>
  </Link>
);

const Playlists: FC<PlaylistsProps> = ({ playlists }) => (
  <Layout
    title="Playlists"
    description="Curated playlists from my Spotify library."
  >
    <p className="animate-enter opacity-0 animation-delay-100">
      Curated playlists from my Spotify library.
    </p>
    <List
      className="mt-4"
      data={[{ title: 'All Playlists', items: playlists }]}
      renderItem={Playlist}
      indexKey="id"
      searchKeys={['name']}
    />
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
