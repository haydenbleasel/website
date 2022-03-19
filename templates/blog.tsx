import { PrismicLink } from '@prismicio/react';
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/router';
import type { ChangeEventHandler, FC } from 'react';
import { Fragment, useState } from 'react';
import { Search } from 'react-feather';
import Layout from '../components/layout';
import tailwindConfig from '../tailwind.config';
import type { Post } from '../types/post';

const PostLink: FC<Post> = ({ id, title, date, link }, index) => (
  <Fragment key={id}>
    {Boolean(index) && (
      <hr className="border-t border-gray-100 my-2" />
    )}
    <PrismicLink href={link}>
      <div className="flex justify-between gap-8">
        <p className="text-md text-gray-900 flex-1">{title}</p>
        <p className="text-sm text-gray-500 w-24 flex-0 text-right">{format(parseISO(date), 'MMM dd, yyyy')}</p>
      </div>
    </PrismicLink>
  </Fragment>
)

type BlogTemplateData = {
  posts: Post[];
}

const BlogTemplate: FC<BlogTemplateData> = ({ posts }) => {
  const [results, setResults] = useState<string[]>([]);
  const { asPath } = useRouter();

  const handleSearch: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const { value } = event.currentTarget
    // Dynamically load fuse.js
    const Fuse = (await import(
      /* webpackChunkName: "fuse" */
      'fuse.js'
    )).default;
    const fuse = new Fuse(posts, {
      keys: ['title', 'date', 'content'],
    });

    const searchResults = fuse.search(value);

    setResults(searchResults.map(({ item }) => item.id));
  };

  const filterBySearch = (post: Post) => results.length ? results.includes(post.id) : true;

  const tabs = [
    { label: 'All', link: '/blog' },
    { label: 'Work', link: '/blog/work' },
    { label: 'Code', link: '/blog/code' },
    // { label: 'Other', link: '/blog/other' },
  ];

  return (
    <Layout backHref="/" backLabel="Home">
      <div className="grid gap-8">
        <h1 className="text-md font-medium text-gray-900">Blog</h1>
        <div className="grid gap-8">

          <div className="grid gap-2">
            <div className="flex items-center space-between gap-8">
              <div className="flex gap-4 flex-1">
                {tabs.map((tab) => (
                  <PrismicLink href={tab.link} key={tab.label}>
                    <span className={`relative whitespace-nowrap text-sm ${tab.link === asPath ? 'text-gray-900 after:content-[""] after:block after:absolute after:-bottom-[14px] after:w-full after:h-[1px] after:bg-gray-900' : 'text-gray-500'}`}>{tab.label}</span>
                  </PrismicLink>
                ))}
              </div>
              <div className="relative flex-0">
                <div className="absolute left-0 top-1/2 -translate-y-1/2">
                  <Search size={14} color={tailwindConfig.theme.colors.gray[400]} />
                </div>
                <input
                  className="text-sm px-[18px] w-full"
                  type="text"
                  placeholder="Search"
                  onChange={handleSearch}
                />
              </div>
            </div>
            <hr className="border-t border-gray-100" />
          </div>

          <div>
            {posts.filter(filterBySearch).sort((postA: Post, postB: Post) => (
              parseISO(postA.date) > parseISO(postB.date) ? -1 : 1
            )).map(PostLink)}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogTemplate;