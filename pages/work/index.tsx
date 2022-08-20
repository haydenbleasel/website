import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import groupBy from 'lodash.groupby';
import type { KeyTextField, PrismicDocumentWithUID } from '@prismicio/types';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import Layout from '../../components/layout';
import { getPage, getPages } from '../../utils/prismic';
import type { WorkPostProps } from './[post]';

export type WorkProps = {
  data: {
    title: KeyTextField;
    description: KeyTextField;
  };
  posts: WorkPostProps[];
};

const Work: FC<WorkProps> = ({ data, posts }) => {
  const years = groupBy(posts, (post) => post.data.startYear);

  return (
    <Layout title={data.title} description={data.description}>
      <p className="animate-enter opacity-0 animation-delay-100">
        {data.description}
      </p>
      <div className="mt-4 flex flex-col gap-8">
        {Object.keys(years)
          .reverse()
          .map((startYear, index) => (
            <div
              className="flex animate-enter gap-8 opacity-0"
              key={startYear}
              style={{
                animationDelay: `${(index + 2) * 100}ms`,
              }}
            >
              <p className="flex-0 m-0 w-24 text-sm text-neutral-500 dark:text-neutral-400">
                {startYear}
              </p>
              <div className="flex flex-1 flex-col gap-4">
                {years[startYear].map((job) => (
                  <div key={job.uid}>
                    <h2 className="m-0 text-xl">
                      {job.data.role},{' '}
                      {job.data.slices1.length ? (
                        <PrismicLink document={job}>
                          <span className="font-semibold underline">
                            {job.data.company}
                          </span>
                        </PrismicLink>
                      ) : (
                        job.data.company
                      )}
                    </h2>
                    <p className="flex-0 m-0 text-neutral-500 dark:text-neutral-400">
                      {job.data.location}
                    </p>
                    <PrismicRichText field={job.data.summary} />
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const { data } = (await getPage(
    { previewData },
    'work'
  )) as PrismicDocumentWithUID;
  const posts = (await getPages('work-post')) as PrismicDocumentWithUID[];

  return {
    props: {
      data,
      posts,
    },
  };
};

export default Work;
