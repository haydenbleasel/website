import { PrismicRichText } from '@prismicio/react';
import type {
  GroupField,
  ImageFieldImage,
  KeyTextField,
  PrismicDocumentWithUID,
  RichTextField,
} from '@prismicio/types';
import type { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import Activity from '../components/activity';
import Layout from '../components/layout';
import { getPage } from '../utils/prismic';
import { social } from './_app';

type HomeProps = {
  data: {
    title: KeyTextField;
    description: KeyTextField;
    name: KeyTextField;
    role: KeyTextField;
    photo: ImageFieldImage;
    sections: GroupField<{
      title: KeyTextField;
      content: RichTextField;
    }>;
  };
};

const Home: FC<HomeProps> = ({ data }) => (
  <Layout title={data.title} description={data.description} noSticky noTitle>
    <div className="grid gap-8">
      {data.photo.url && (
        <div className="flex">
          <div className="relative">
            <div className="inline-flex overflow-hidden rounded-full">
              <Image
                src={data.photo.url}
                width={64}
                height={64}
                layout="fixed"
                priority
              />
            </div>
            <Activity />
          </div>
        </div>
      )}
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          {data.name}
        </h1>
        <p className="text-md font-normal text-gray-500 dark:text-gray-400">
          {data.role}
        </p>
      </div>
    </div>
    <div className="grid gap-12">
      {data.sections.map((section, index) => (
        <div key={index} className="grid gap-4">
          {section.title && (
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {section.title}
            </p>
          )}
          <PrismicRichText field={section.content} />
        </div>
      ))}
    </div>
    <div className="-ml-3 flex flex-wrap">
      {social.map((platform) => (
        <Link href={platform.url} key={platform.id} passHref>
          <a href={platform.url}>
            <span className="flex p-3 transition-transform hover:-translate-y-1">
              <Image
                src={`/social/${platform.id}.svg`}
                width={16}
                height={16}
                layout="fixed"
              />
            </span>
          </a>
        </Link>
      ))}
    </div>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const { data } = (await getPage('home')) as PrismicDocumentWithUID;

  return {
    props: {
      data,
    },
  };
};

export default Home;
