import type {
  KeyTextField,
  LinkField,
  PrismicDocumentWithUID,
} from '@prismicio/types';
import { format, parse } from 'date-fns';
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

type FeaturesData = {
  data: {
    title: KeyTextField;
    description: KeyTextField;
    speaking: FeatureData[];
    articles: FeatureData[];
  };
};

type FeatureData = {
  name: KeyTextField;
  source: KeyTextField;
  link: LinkField;
  date: KeyTextField;
};

const FeatureInner: FC<Partial<FeatureData> & { withArrow?: boolean }> = ({
  name,
  source,
  date,
  withArrow,
}) => (
  <div className="flex flex-1 flex-col items-center gap-1 py-2 sm:flex-row sm:justify-between sm:gap-8">
    <div className="flex flex-col gap-1">
      <p className="flex flex-1 items-center gap-2 text-md leading-snug text-gray-900 dark:text-white">
        <span className="line-clamp-1">{name}</span>
        {withArrow && <ArrowUpRight className="shrink-0" size={16} />}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{source}</p>
    </div>
    <p className="shrink-0 text-sm text-gray-500 dark:text-gray-400 sm:text-right">
      {date && format(parse(date, 'yyyy-MM-dd', new Date()), 'MMM dd, yyyy')}
    </p>
  </div>
);

const Feature: FC<FeatureData> = ({ link, ...props }) => (
  <div className="fill-anchor">
    {link.link_type === 'Any' ? (
      <FeatureInner {...props} />
    ) : (
      <Link href={docResolver(link)} passHref>
        <a href={docResolver(link)}>
          <FeatureInner {...props} withArrow />
        </a>
      </Link>
    )}
  </div>
);

const sortByDate = (featureA: FeatureData, featureB: FeatureData) =>
  (featureB.date ?? '') > (featureA.date ?? '') ? 1 : -1;

const Featured: FC<FeaturesData> = ({ data }) => {
  const [results, setResults] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');
  const tabs = [
    { label: 'All', data: [...data.speaking, ...data.articles] },
    { label: 'Speaking', data: data.speaking },
    { label: 'Articles', data: data.articles },
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

  const filterBySearch = (post: FeatureData) =>
    results.length && post.name ? results.includes(post.name) : true;

  return (
    <Layout title={data.title} description={data.description}>
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
          data={activeData.sort(sortByDate).filter(filterBySearch)}
          renderItem={Feature}
        />
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = (await getPage('featured')) as PrismicDocumentWithUID;

  return {
    props: {
      data,
    },
  };
};

export default Featured;
