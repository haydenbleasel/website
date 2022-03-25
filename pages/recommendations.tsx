import { PrismicLink } from '@prismicio/react';
import type {
  KeyTextField,
  LinkField,
  PrismicDocumentWithUID,
} from '@prismicio/types';
import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import { useEffect, Fragment, useState } from 'react';
import toast from 'react-hot-toast';
import Layout from '../components/layout';
import Search from '../components/search';
import { getPage } from '../utils/prismic';

type RecommendationsData = {
  data: {
    tools: Recommendation[];
    freelancers: Recommendation[];
  };
};

type Recommendation = {
  name: KeyTextField;
  description: KeyTextField;
  link: LinkField;
};

const PostLink = (
  { name, description, link }: Recommendation,
  index: number
) => (
  <Fragment key={index}>
    {Boolean(index) && (
      <hr className="my-2 border-t border-gray-100 dark:border-gray-800" />
    )}
    <div className="fill-anchor">
      <PrismicLink field={link}>
        <div className="flex flex-1 justify-between gap-8">
          <p className="flex-0 w-32 text-md text-gray-900 dark:text-white">
            {name}
          </p>
          <p className="flex-1 text-right text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </PrismicLink>
    </div>
  </Fragment>
);

const Recommendations: FC<RecommendationsData> = ({ data }) => {
  const [results, setResults] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: 'Tools', data: data.tools },
    { label: 'Freelancers', data: data.freelancers },
  ];
  const { data: activeData } = tabs[activeTab];

  useEffect(() => {
    const filterRecommendations = async (term: string) => {
      const Fuse = (
        await import(
          /* webpackChunkName: "fuse" */
          'fuse.js'
        )
      ).default;
      const fuse = new Fuse(activeData, {
        keys: ['name', 'description'],
      });

      const searchResults = fuse.search(term);

      setResults(searchResults.map(({ item }) => item.name ?? ''));
    };

    if (!search) {
      setResults([]);
      return;
    }

    filterRecommendations(search).catch((error) => {
      const message =
        error instanceof Error ? error.message : (error as string);

      toast.error(message);
    });
  }, [activeData, search]);

  const filterBySearch = (post: RecommendationsData['data']['tools'][number]) =>
    results.length && post.name ? results.includes(post.name) : true;

  return (
    <Layout
      title="Recommendations"
      description="A list of tools and freelancers I recommend."
    >
      <div className="grid gap-8">
        <div className="grid gap-8">
          <div className="grid gap-2">
            <div className="space-between flex items-center gap-8">
              <div className="flex flex-1 gap-4">
                {tabs.map((tab, index) => (
                  <div
                    className="text-md font-normal text-gray-700 transition-all hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-500"
                    key={tab.label}
                  >
                    <span
                      onClick={() => setActiveTab(index)}
                      onKeyDown={() => setActiveTab(index)}
                      role="button"
                      tabIndex={0}
                      className={`relative whitespace-nowrap text-sm ${
                        index === activeTab
                          ? 'text-gray-900 after:absolute after:-bottom-[14.5px] after:block after:h-[1px] after:w-full after:bg-gray-900 after:content-[""] dark:text-white dark:after:bg-white'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {tab.label}
                    </span>
                  </div>
                ))}
              </div>
              <Search value={search} onChange={setSearch} />
            </div>
            <hr className="border-t border-gray-100 dark:border-gray-800" />
          </div>

          <div>{activeData.filter(filterBySearch).map(PostLink)}</div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = (await getPage('recommendations')) as PrismicDocumentWithUID;

  return {
    props: {
      data,
    },
  };
};

export default Recommendations;
