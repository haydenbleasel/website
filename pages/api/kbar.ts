/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { KeyTextField, PrismicDocumentWithUID } from '@prismicio/types';
import type { NextApiHandler } from 'next';
import { getDevPosts } from '../../utils/dev';
import { getMediumPosts } from '../../utils/medium';
import { getPages } from '../../utils/prismic';

type Docs = PrismicDocumentWithUID<{
  title: KeyTextField;
  description: KeyTextField;
}>[];

const handler: NextApiHandler = async (req, res) => {
  const caseStudies = (await getPages('case-study')) as Docs;
  const workPosts = (await getPages('work-post')) as Docs;
  const landingPages = (await getPages('landing-page')) as Docs;
  const devPosts = await getDevPosts();
  const mediumPosts = await getMediumPosts();

  const caseStudyActions = caseStudies.map(({ uid, data }) => ({
    id: uid,
    name: `${data.title ?? ''} — ${data.description ?? ''}`,
    keywords: data.title,
    link: `/blog/${uid}`,
    parent: 'blog',
  }));

  const workPostActions = workPosts.map(({ uid, data }) => ({
    id: uid,
    name: `${data.title ?? ''} — ${data.description ?? ''}`,
    keywords: data.title,
    link: `/blog/${uid}`,
    parent: 'blog',
  }));

  const landingPageActions = landingPages.map(({ uid, data }) => ({
    id: uid,
    name: data.title,
    keywords: data.title,
    link: `/${uid}`,
    section: 'Pages',
    shortcut: uid === 'colophon' ? ['?'] : undefined,
  }));

  const devPostActions = devPosts.map(({ id, title, link }) => ({
    id,
    name: title,
    keywords: title,
    link,
    parent: 'blog',
  }));

  const mediumPostActions = mediumPosts.map(({ id, title, link }) => ({
    id,
    name: title,
    keywords: title,
    link,
    parent: 'blog',
  }));

  const actions = [
    ...caseStudyActions,
    ...landingPageActions,
    ...workPostActions,
    ...devPostActions,
    ...mediumPostActions,
  ];

  res.status(200).json({ actions });
};

export default handler;
