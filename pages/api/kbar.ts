import type {
  FilledLinkToWebField,
  KeyTextField,
  PrismicDocumentWithUID,
} from '@prismicio/types';
import type { NextRequest } from 'next/server';
import { getDevPosts } from '../../utils/dev';
import { getMediumPosts } from '../../utils/medium';
import { getPage, getPages } from '../../utils/prismic';
import res from '../../utils/response';
import type { ProjectsProps } from '../projects';
import type { WorkPostProps } from '../work/[post]';

type Docs = PrismicDocumentWithUID<{
  title: KeyTextField;
  description: KeyTextField;
  icon?: KeyTextField;
  shortcut?: KeyTextField;
}>[];

export const config = {
  runtime: 'experimental-edge',
};

const handler = async (req: NextRequest): Promise<Response> => {
  if (
    req.headers.get('authorization') !==
    `Bearer ${process.env.NEXT_PUBLIC_API_PASSPHRASE ?? ''}`
  ) {
    return res(401, { error: 'Unauthorized' });
  }

  if (req.method !== 'GET') {
    return res(405, { error: 'Method not allowed' });
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
    shortcut: data.shortcut ? [data.shortcut] : undefined,
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

  return res(200, { actions });
};

export default handler;
