import type { KeyTextField, PrismicDocumentWithUID } from '@prismicio/types';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import type { FC } from 'react';
import { ArrowUpRight } from 'react-feather';
import Layout from '../components/layout';
import List from '../components/list';
import { getPage } from '../utils/prismic';
import type { PlaylistsResponse } from '../utils/spotify';
import { getPlaylists } from '../utils/spotify';

type PlaylistsProps = {
  data: {
    title: KeyTextField;
    description: KeyTextField;
  };
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
      <span className="flex-0 w-24 text-right text-sm text-neutral-400 dark:text-neutral-500">
        {tracks} tracks
      </span>
    </span>
  </Link>
);

const Playlists: FC<PlaylistsProps> = ({ data, playlists }) => (
  <Layout
    title={data.title}
    description={data.description}
    subtitle={data.description}
  >
    <List
      className="mt-4"
      data={[{ title: 'All Playlists', items: playlists }]}
      renderItem={Playlist}
      indexKey="id"
      searchKeys={['name']}
    />
  </Layout>
);

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const { data } = (await getPage(
    { previewData },
    'projects'
  )) as PrismicDocumentWithUID;
  const playlists = await getPlaylists();

  return {
    props: {
      data,
      playlists,
    },
  };
};

export default Playlists;
