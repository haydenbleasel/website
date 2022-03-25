/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { PrismicDocumentWithUID } from '@prismicio/types';
import type { NextApiHandler } from 'next';
import slugify from 'slugify';
import { getDevPosts } from '../../utils/dev';
import { getMediumPosts } from '../../utils/medium';
import { getPages } from '../../utils/prismic';
import { getPlaylists } from '../../utils/spotify';

const handler: NextApiHandler = async (req, res) => {
  const caseStudies = (await getPages(
    'case-study'
  )) as PrismicDocumentWithUID[];
  const landingPages = (await getPages(
    'landing-page'
  )) as PrismicDocumentWithUID[];
  const playlists = await getPlaylists();
  const devPosts = await getDevPosts();
  const mediumPosts = await getMediumPosts();

  const caseStudyActions = caseStudies.map(({ uid, data }) => ({
    id: uid,
    name: data.title,
    keywords: data.title,
    link: `/blog/work/${uid}`,
    parent: 'blog',
  }));

  const landingPageActions = landingPages.map(({ uid, data }) => ({
    id: uid,
    name: data.title,
    keywords: data.title,
    link: `/${uid}`,
    section: 'Pages',
  }));

  const playlistActions = playlists.map(({ id, name }) => ({
    id,
    name,
    keywords: name,
    link: `/playlists/${id}-${slugify(name, { lower: true, strict: true })}`,
    parent: 'playlists',
  }));

  const devPostActions = devPosts.map(({ id, title }) => ({
    id,
    name: title,
    keywords: title,
    link: `/blog/code/${id}-${slugify(title, { lower: true, strict: true })}`,
    parent: 'blog',
  }));

  const mediumPostActions = mediumPosts.map(({ id, title }) => ({
    id,
    name: title,
    keywords: title,
    link: `/blog/other/${id}-${slugify(title, { lower: true, strict: true })}`,
    parent: 'blog',
  }));

  const actions = [
    ...caseStudyActions,
    ...landingPageActions,
    ...playlistActions,
    ...devPostActions,
    ...mediumPostActions,
  ];

  res.status(200).json({ actions });
};

export default handler;
