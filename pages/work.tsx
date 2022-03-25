import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import groupBy from 'lodash.groupby';
import type { PrismicDocumentWithUID } from '@prismicio/types';
import Layout from '../components/layout';
import { getPage } from '../utils/prismic';

type WorkData = {
  data: {
    jobs: {
      title: string;
      startYear: number;
    }[];
  };
};

const Work: FC<WorkData> = ({ data }) => {
  const years = groupBy(data.jobs, (job) => job.startYear);

  return (
    <Layout backHref="/" backLabel="Home">
      <div className="grid gap-8">
        <h1 className="text-md font-medium text-gray-900 dark:text-white">
          Work
        </h1>
        {Object.keys(years)
          .reverse()
          .map((startYear) => (
            <div className="flex gap-8" key={startYear}>
              <p className="flex-0 w-24 text-sm text-gray-500 dark:text-gray-400">
                {startYear}
              </p>
              <div className="flex flex-1 flex-col gap-1">
                {years[startYear].map((job) => (
                  <p
                    className="text-md text-gray-900 dark:text-white"
                    key={job.title}
                  >
                    {job.title}
                  </p>
                ))}
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = (await getPage('work')) as PrismicDocumentWithUID;

  return {
    props: {
      data,
    },
  };
};

export default Work;
