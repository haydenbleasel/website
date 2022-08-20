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
import Layout from '../components/layout';
import SocialLinks from '../components/socialLinks';
import { getPage } from '../utils/prismic';
import { getLocation } from '../utils/twitter';

export type HomeProps = {
  data: {
    title: KeyTextField;
    description: KeyTextField;
    hero_title: KeyTextField;
    hero_description: KeyTextField;
    photo: ImageFieldImage;
    hero_image: ImageFieldImage;
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
    <div className="dark:brightness-0 dark:invert">
      <Image
        src="/logo.svg"
        width={48}
        height={48}
        priority
        quality={100}
        alt=""
        className="m-0 animate-burst"
      />
    </div>
    <div className="mt-16 animate-enter opacity-0 animation-delay-100">
      <h1 className="mb-4">{data.hero_title}</h1>
      <p className="m-0 text-lg leading-normal">{data.hero_description}</p>
      <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-neutral-300 px-3 py-1 text-neutral-500 dark:border-neutral-700 dark:text-neutral-300">
        <div className="relative inline-flex h-2 w-2">
          <span className="absolute inset-0 inline-flex h-full w-full animate-ping rounded-full bg-neutral-400 opacity-75 dark:bg-neutral-500" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-neutral-500 dark:bg-neutral-400" />
        </div>
        <span className="text-sm font-medium leading-snug">
          Currently {location ? `in ${location}` : 'somewhere'}
        </span>
      </p>
    </div>
    {data.hero_image.url && (
      <Image
        src={data.hero_image.url}
        width={1214}
        height={703}
        priority
        quality={100}
        alt=""
        className="block animate-enter-burst overflow-hidden rounded-sm opacity-0 animation-delay-200"
      />
    )}
    <div className="flex flex-col gap-6 sm:gap-12">
      {data.sections.map((section, index) => (
        <div
          key={index}
          className="animate-enter opacity-0"
          style={{ animationDelay: `${(index + 3) * 100}ms` }}
        >
          {section.title && (
            <small className="text-sm text-neutral-500 dark:text-neutral-400">
              {section.title}
            </small>
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
