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

type WorkPostProps = {
  data: {
    title: KeyTextField;
    description: KeyTextField;
    coverImage: ImageField;
    content: RichTextField;
  };
};

const WorkPost: FC<WorkPostProps> = ({ data }) => (
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
    </div>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const { data } = (await getPage('neutral')) as PrismicDocumentWithUID;

  return {
    props: {
      data,
    },
  };
};

export default WorkPost;
