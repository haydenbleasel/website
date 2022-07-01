import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import type {
  DateField,
  KeyTextField,
  PrismicDocumentWithUID,
  SliceZone,
} from '@prismicio/types';
import { format, parse, parseISO } from 'date-fns';
import { ArrowUpRight } from 'react-feather';
import { ArticleJsonLd } from 'next-seo';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getPage, getPages } from '../../utils/prismic';
import type { Post } from '../../types/post';
import { getDevPosts } from '../../utils/dev';
import Layout from '../../components/layout';
import { getMediumPosts } from '../../utils/medium';
import List from '../../components/list';

type BlogProps = {
  data: {
    title: KeyTextField;
    description: KeyTextField;
  };
  mediumPosts: Post[];
  devPosts: Post[];
  caseStudies: Post[];
};

const PostLink: FC<Post> = ({ id, title, date, link }) => {
  const linkProps = link.startsWith('/')
    ? {}
    : {
        rel: 'noopener noreferrer',
        target: '_blank',
      };

  return (
    <div className="fill-anchor" key={id}>
      <Link href={link} {...linkProps}>
        <div className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between sm:gap-8">
          <p className="flex flex-1 items-center gap-2 text-md leading-snug text-gray-900 dark:text-white">
            <span className="sm:line-clamp-1">{title}</span>
            {!link.startsWith('/') && (
              <ArrowUpRight className="shrink-0" size={16} />
            )}
          </p>
          <p className="flex-0 w-24 text-sm text-gray-500 dark:text-gray-400 sm:text-right">
            {format(parseISO(date), 'MMM dd, yyyy')}
          </p>
        </div>
      </Link>
    </div>
  );
};

const sortByDate = (postA: Post, postB: Post) =>
  parseISO(postA.date) > parseISO(postB.date) ? -1 : 1;

const Blog: FC<BlogProps> = ({ data, caseStudies, devPosts, mediumPosts }) => {
  const { asPath } = useRouter();
  const allPosts = [...caseStudies, ...devPosts, ...mediumPosts].sort(
    sortByDate
  );
  const categories: {
    title: string;
    items: Record<string, unknown>[];
  }[] = [];

  if (allPosts.length) {
    categories.push({ title: 'All', items: allPosts });
  }

  if (caseStudies.length) {
    categories.push({
      title: 'Case Studies',
      items: caseStudies.sort(sortByDate),
    });
  }

  if (devPosts.length) {
    categories.push({ title: 'Code', items: devPosts.sort(sortByDate) });
  }

  if (mediumPosts.length) {
    categories.push({ title: 'Design', items: mediumPosts.sort(sortByDate) });
  }

  return (
    <Layout title={data.title} description={data.description}>
      <ArticleJsonLd
        type="Blog"
        url={new URL(asPath, process.env.NEXT_PUBLIC_SITE_URL ?? '').href}
        title={data.title ?? ''}
        images={[]}
        dateModified={allPosts[allPosts.length - 1].date}
        datePublished={allPosts[0].date}
        description={data.description ?? ''}
        authorName="Hayden Bleasel"
      />
      <div className="mt-4">
        <List
          data={categories}
          renderItem={PostLink}
          indexKey="title"
          searchKeys={['title', 'date', 'content']}
        />
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = (await getPage('blog')) as PrismicDocumentWithUID;
  const mediumPosts = await getMediumPosts();
  const devPosts = await getDevPosts();
  const caseStudies = (await getPages('case-study')) as PrismicDocumentWithUID<{
    title: KeyTextField;
    description: KeyTextField;
    customPublishDate: DateField;
    slices: SliceZone;
  }>[];

  return {
    props: {
      data,
      mediumPosts,
      devPosts,
      caseStudies: caseStudies.map((post) => ({
        id: post.uid,
        title: `${post.data.title ?? ''} — ${post.data.description ?? ''}`,
        date: post.data.customPublishDate
          ? parse(
              post.data.customPublishDate,
              'yyyy-MM-dd',
              new Date()
            ).toISOString()
          : post.first_publication_date,
        link: `/blog/${post.uid}`,
      })),
    },
  };
};

export default Blog;
