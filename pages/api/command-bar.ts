/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type {
  FilledLinkToWebField,
  KeyTextField,
  PrismicDocumentWithUID,
} from '@prismicio/types';
import type { NextApiHandler } from 'next';
import { getDevPosts } from '../../utils/dev';
import { getMediumPosts } from '../../utils/medium';
import { getPage, getPages } from '../../utils/prismic';
import type { ProjectsProps } from '../projects';
import type { WorkPostProps } from '../work/[post]';

type Docs = PrismicDocumentWithUID<{
  title: KeyTextField;
  description: KeyTextField;
  icon?: KeyTextField;
  shortcut?: KeyTextField;
}>[];

export const config = {
  runtime: 'nodejs',
};

const handler: NextApiHandler = async (req, res) => {
  if (
    req.headers.authorization !==
    `Bearer ${process.env.NEXT_PUBLIC_API_PASSPHRASE ?? ''}`
  ) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const caseStudies = (await getPages('case-study')) as Docs;
  const workPosts = (await getPages('work-post')) as WorkPostProps[];
  const landingPages = (await getPages('landing-page')) as Docs;
  const projects = (await getPage({}, 'projects')) as PrismicDocumentWithUID<
    ProjectsProps['data']
  >;
  const devPosts = await getDevPosts();
  const mediumPosts = await getMediumPosts();

  const projectActions = projects.data.wip
    .filter(({ link }) => link.link_type === 'Web')
    .map(({ name, description, link }) => ({
      name: `${name ?? ''} — ${description ?? ''}`,
      href: (link as FilledLinkToWebField).url,
    }));

  const caseStudyActions = caseStudies.map(({ uid, data }) => ({
    name: `${data.title ?? ''} — ${data.description ?? ''}`,
    href: `/blog/${uid}`,
  }));

  const workPostActions = workPosts.map(({ uid, data }) => ({
    name: `${data.role ?? ''} at ${data.company ?? ''}`,
    href: data.slices1.length ? `/work/${uid}` : '/work',
  }));

  const landingPageActions = landingPages.map(({ uid, data }) => ({
    name: data.title,
    href: `/${uid}`,
    shortcut: data.shortcut,
    icon: data.icon,
  }));

  const devPostActions = devPosts.map(({ id, title, href }) => ({
    id,
    name: title,
    href,
  }));

  const mediumPostActions = mediumPosts.map(({ id, title, href }) => ({
    id,
    name: title,
    href,
  }));

  res.status(200).json({
    projects: projectActions,
    caseStudies: caseStudyActions,
    landingPages: landingPageActions,
    workPosts: workPostActions,
    devPosts: devPostActions,
    mediumPosts: mediumPostActions,
  });
};

export default handler;
