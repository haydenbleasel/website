import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import type {
  ImageField,
  KeyTextField,
  PrismicDocumentWithUID,
  RichTextField,
} from '@prismicio/types';
import { PrismicRichText } from '@prismicio/react';
import Image from 'next/image';
import Layout from '../components/layout';
import { getPage } from '../utils/prismic';
import type { NeutralData } from '../utils/neutral';
import fetchNeutralData from '../utils/neutral';
import StoreButtons from '../components/storeButtons';

type WorkPostProps = {
  data: {
    title: KeyTextField;
    description: KeyTextField;
    coverImage: ImageField;
    content: RichTextField;
  };
} & NeutralData;

const WorkPost: FC<WorkPostProps> = ({
  data,
  treeCount,
  offsetAmount,
  averageRating,
  programCount,
  latestVersion,
}) => (
  <Layout backHref="/blog" backLabel="Blog">
    <div className="grid gap-8">
      <div className="grid gap-1">
        <h1 className="text-md font-medium text-gray-900 dark:text-white">
          {data.title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {data.description}
        </p>
      </div>
      {data.coverImage.url && (
        <div className="flex overflow-hidden rounded-sm">
          <Image
            src={data.coverImage.url}
            alt={data.coverImage.alt ?? ''}
            width={480}
            height={
              480 *
              (data.coverImage.dimensions.height /
                data.coverImage.dimensions.width)
            }
            priority
          />
        </div>
      )}
      <div>
        <PrismicRichText field={data.content} />
      </div>
      <div className="grid gap-8 rounded-sm bg-gray-100 p-8">
        <div className="flex items-center gap-2">
          <div className="relative inline-flex h-3 w-3">
            <span className="absolute inset-0 inline-flex h-full w-full animate-ping rounded-full bg-success-400 opacity-75 dark:bg-success-500" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-success-500 dark:bg-success-400" />
          </div>
          <p className="text-md text-gray-500">Live data</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-xl font-semibold text-gray-900">
              {programCount}
            </p>
            <p className="text-md text-gray-500">Reforestation programs</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-900">{treeCount}</p>
            <p className="text-md text-gray-500">Trees planted</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-900">
              {offsetAmount}
            </p>
            <p className="text-md text-gray-500">Tonnes of CO₂e offset</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-900">
              {averageRating}
            </p>
            <p className="text-md text-gray-500">Average rating</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-900">
              {latestVersion}
            </p>
            <p className="text-md text-gray-500">Latest version</p>
          </div>
        </div>
      </div>
      <StoreButtons
        appStoreLink="https://apps.apple.com/au/app/neutral/id1511144977"
        googlePlayLink="https://play.google.com/store/apps/details?id=com.tryneutral.app"
      />
    </div>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const { data } = (await getPage('neutral')) as PrismicDocumentWithUID;
  const neutralData = await fetchNeutralData();

  return {
    props: {
      data,
      ...neutralData,
    },
  };
};

export default WorkPost;
