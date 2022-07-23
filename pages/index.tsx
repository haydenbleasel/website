import { PrismicRichText } from '@prismicio/react';
import type {
  GroupField,
  ImageFieldImage,
  KeyTextField,
  PrismicDocumentWithUID,
  RichTextField,
} from '@prismicio/types';
import type { GetStaticProps } from 'next';
import Image from 'next/future/image';
import type { FC } from 'react';
import { Globe } from 'react-feather';
import Activity from '../components/activity';
import Layout from '../components/layout';
import SocialLinks from '../components/socialLinks';
import { getPage } from '../utils/prismic';
import { getLocation } from '../utils/twitter';

export type HomeProps = {
  data: {
    title: KeyTextField;
    description: KeyTextField;
    name: KeyTextField;
    role: KeyTextField;
    photo: ImageFieldImage;
    customActivityEmoji: KeyTextField;
    customActivityTitle: KeyTextField;
    sections: GroupField<{
      title: KeyTextField;
      content: RichTextField;
    }>;
  };
  location: string | null;
};

const Home: FC<HomeProps> = ({ data, location }) => (
  <Layout title={data.title} description={data.description} noSticky noTitle>
    <div className="flex flex-col gap-8">
      {data.photo.url && (
        <div className="flex animate-enter opacity-0">
          <div className="relative">
            <Image
              src={data.photo.url}
              width={64}
              height={64}
              priority
              quality={100}
              alt=""
              className="inline-flex overflow-hidden rounded-full"
            />
            <Activity
              customEmoji={data.customActivityEmoji}
              customTitle={data.customActivityTitle}
            />
          </div>
        </div>
      )}
      <div className="animate-enter opacity-0 animation-delay-100">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          {data.name}
        </h1>
        <p className="text-md font-normal text-gray-500 dark:text-gray-400">
          {data.role}
        </p>
        <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          <Globe width={12} height={12} />
          <span className="text-xs font-medium leading-snug">
            Currently {location ? `in ${location}` : 'somewhere'}
          </span>
        </p>
      </div>
    </div>
    <div className="flex flex-col gap-6 sm:gap-12">
      {data.sections.map((section, index) => (
        <div
          key={index}
          className="flex animate-enter flex-col gap-4 opacity-0"
          style={{ animationDelay: `${(index + 2) * 100}ms` }}
        >
          {section.title && (
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {section.title}
            </p>
          )}
          <PrismicRichText field={section.content} />
        </div>
      ))}
    </div>
    <SocialLinks />
  </Layout>
);

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const { data } = (await getPage(
    { previewData },
    'home'
  )) as PrismicDocumentWithUID;
  const location = await getLocation();

  return {
    props: {
      data,
      location,
    },
  };
};

export default Home;
