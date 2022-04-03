import type {
  KeyTextField,
  LinkField,
  PrismicDocumentWithUID,
} from '@prismicio/types';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'react-feather';
import toast from 'react-hot-toast';
import Divider from '../components/divider';
import Layout from '../components/layout';
import List from '../components/list';
import Search from '../components/search';
import Tab from '../components/tab';
import { docResolver, getPage } from '../utils/prismic';

type RecommendationsData = {
  data: {
    title: KeyTextField;
    description: KeyTextField;
    tools: RecommendationData[];
    freelancers: RecommendationData[];
  };
};

type RecommendationData = {
  name: KeyTextField;
  description: KeyTextField;
  link: LinkField;
};

const Recommendation: FC<RecommendationData> = ({
  name,
  description,
  link,
}) => (
  <div className="fill-anchor">
    <Link href={docResolver(link)} passHref>
      <a href={docResolver(link)}>
        <div className="flex flex-1 flex-col gap-1 py-2 sm:flex-row sm:justify-between sm:gap-8">
          <p className="flex flex-1 items-center gap-2 text-md leading-snug text-gray-900 dark:text-white">
            <span className="line-clamp-1">{name}</span>
            <ArrowUpRight className="shrink-0" size={16} />
          </p>
          <p className="shrink-0 text-sm text-gray-500 dark:text-gray-400 sm:text-right">
            {description}
          </p>
        </div>
      </a>
    </Link>
  </div>
);

const sortAlphabetically = (
  recommendationA: RecommendationData,
  recommendationB: RecommendationData
) => ((recommendationB.name ?? '') > (recommendationA.name ?? '') ? -1 : 1);

const Recommendations: FC<RecommendationsData> = ({ data }) => {
  const [results, setResults] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');
  const tabs = [
    { label: 'Tools', data: data.tools },
    { label: 'Freelancers', data: data.freelancers },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].label);
  const { data: activeData } = tabs.find(
    ({ label }) => label === activeTab
  ) ?? {
    data: [],
  };

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

  const filterBySearch = (post: RecommendationData) =>
    results.length && post.name ? results.includes(post.name) : true;

  return (
    <Layout title={data.title} description={data.description}>
      <div className="grid gap-8">
        <div className="grid gap-8">
          <div className="grid gap-1">
            <div className="space-between flex items-center gap-8">
              <div className="flex flex-1 gap-4">
                {tabs.map((tab) => (
                  <div
                    className="text-md font-normal text-gray-700 transition-all hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-500"
                    key={tab.label}
                  >
                    <Tab
                      tab={tab.label}
                      onTabSelect={setActiveTab}
                      isActive={tab.label === activeTab}
                    />
                  </div>
                ))}
              </div>
              <Search value={search} onChange={setSearch} />
            </div>
            <Divider />
          </div>
          <List
            data={activeData.sort(sortAlphabetically).filter(filterBySearch)}
            renderItem={Recommendation}
          />
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
