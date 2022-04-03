import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import type {
  KeyTextField,
  PrismicDocumentWithUID,
  SliceZone,
} from '@prismicio/types';

import { PrismicLink } from '@prismicio/react';
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ArrowUpRight } from 'react-feather';
import { getPages } from '../../utils/prismic';
import type { Post } from '../../types/post';
import { getDevPosts } from '../../utils/dev';
import Layout from '../../components/layout';
import Search from '../../components/search';
import { getMediumPosts } from '../../utils/medium';
import List from '../../components/list';
import Tab from '../../components/tab';
import Divider from '../../components/divider';

type BlogProps = {
  posts: (Post & { type: string })[];
};

const PostLink: FC<BlogProps['posts'][number]> = ({
  id,
  title,
  date,
  link,
}) => (
  <div className="fill-anchor" key={id}>
    <PrismicLink href={link}>
      <div className="flex justify-between gap-8 py-3">
        <p className="flex flex-1 items-center gap-2 text-md leading-snug text-gray-900 dark:text-white">
          <span className="line-clamp-1">{title}</span>
          {!link.startsWith('/') && (
            <ArrowUpRight className="shrink-0" size={16} />
          )}
        </p>
        <p className="flex-0 w-24 text-right text-sm text-gray-500 dark:text-gray-400">
          {format(parseISO(date), 'MMM dd, yyyy')}
        </p>
      </div>
    </PrismicLink>
  </div>
);

const sortAlphabetically = (stringA: string, stringB: string) =>
  stringB > stringA ? -1 : 1;

const Blog: FC<BlogProps> = ({ posts }) => {
  const [results, setResults] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<string>('All');

  useEffect(() => {
    const filterPosts = async (term: string) => {
      const Fuse = (
        await import(
          /* webpackChunkName: "fuse" */
          'fuse.js'
        )
      ).default;
      const fuse = new Fuse(posts, {
        keys: ['title', 'date', 'content'],
      });

      const searchResults = fuse.search(term);

      setResults(searchResults.map(({ item }) => item.id));
    };

    if (!search) {
      setResults([]);
      return;
    }

    filterPosts(search).catch((error) => {
      const message =
        error instanceof Error ? error.message : (error as string);

      toast.error(message);
    });
  }, [posts, search]);

  const tabs = new Set<string>();
  posts.forEach((post) => tabs.add(post.type));
  tabs.add('All');

  const filterBySearchAndType = (post: BlogProps['posts'][number]) => {
    const isActiveType = activeTab === 'All' ? true : post.type === activeTab;
    const isSearchMatch = results.length ? results.includes(post.id) : true;

    return isSearchMatch && isActiveType;
  };

  return (
    <Layout title="Blog" description="Posts about code, work and life.">
      <div className="grid gap-8">
        <div className="grid gap-1">
          <div className="space-between flex items-center gap-8">
            <div className="flex flex-1 gap-4">
              {Array.from(tabs)
                .sort(sortAlphabetically)
                .map((tab) => (
                  <Tab
                    key={tab}
                    tab={tab}
                    onTabSelect={setActiveTab}
                    isActive={tab === activeTab}
                  />
                ))}
            </div>
            <Search value={search} onChange={setSearch} />
          </div>
          <Divider />
        </div>

        <List
          data={posts
            .filter(filterBySearchAndType)
            .sort((postA: Post, postB: Post) =>
              parseISO(postA.date) > parseISO(postB.date) ? -1 : 1
            )}
          renderItem={PostLink}
        />
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const mediumPosts = await getMediumPosts();
  const devPosts = await getDevPosts();
  const caseStudies = (await getPages('case-study')) as PrismicDocumentWithUID<{
    title: KeyTextField;
    description: KeyTextField;
    slices: SliceZone;
  }>[];
  const workPosts = (await getPages('work-post')) as PrismicDocumentWithUID<{
    title: KeyTextField;
    description: KeyTextField;
    slices: SliceZone;
  }>[];

  const posts: BlogProps['posts'] = [
    ...mediumPosts.map((post) => ({
      ...post,
      type: 'Design',
    })),
    ...devPosts.map((post) => ({
      ...post,
      type: 'Code',
    })),
    ...caseStudies.map((post) => ({
      id: post.uid,
      title: `${post.data.title ?? ''} — ${post.data.description ?? ''}`,
      date: post.first_publication_date,
      link: `/blog/${post.uid}`,
      type: 'Case Studies',
    })),
    ...workPosts.map((post) => ({
      id: post.uid,
      title: `${post.data.title ?? ''} — ${post.data.description ?? ''}`,
      date: post.first_publication_date,
      link: `/blog/${post.uid}`,
      type: 'Work',
    })),
  ];

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
