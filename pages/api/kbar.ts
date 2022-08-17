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
}>[];

const handler: NextApiHandler = async (req, res) => {
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
      id: name,
      name: `${name ?? ''} — ${description ?? ''}`,
      keywords: name,
      link: (link as FilledLinkToWebField).url,
      parent: 'projects',
      external: true,
    }));

  const caseStudyActions = caseStudies.map(({ uid, data }) => ({
    id: uid,
    name: `${data.title ?? ''} — ${data.description ?? ''}`,
    keywords: data.title,
    link: `/blog/${uid}`,
    parent: 'blog',
  }));

  const workPostActions = workPosts.map(({ uid, data }) => ({
    id: uid,
    name: `${data.role ?? ''} at ${data.company ?? ''}`,
    keywords: data.role,
    link: data.slices1.length ? `/work/${uid}` : '/work',
    parent: 'work',
  }));

  const landingPageActions = landingPages.map(({ uid, data }) => ({
    id: uid,
    name: data.title,
    keywords: data.title,
    link: `/${uid}`,
    section: 'Pages',
    shortcut: uid === 'colophon' ? ['?'] : undefined,
    icon: data.icon,
  }));

  const devPostActions = devPosts.map(({ id, title, link }) => ({
    id,
    name: title,
    keywords: title,
    link,
    parent: 'blog',
    external: true,
  }));

  const mediumPostActions = mediumPosts.map(({ id, title, link }) => ({
    id,
    name: title,
    keywords: title,
    link,
    parent: 'blog',
    external: true,
  }));

  const actions = [
    ...projectActions,
    ...caseStudyActions,
    ...landingPageActions,
    ...workPostActions,
    ...devPostActions,
    ...mediumPostActions,
  ];

  res.status(200).json({ actions });
};

export default handler;
