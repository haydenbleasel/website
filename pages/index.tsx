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
import { MapPin } from 'react-feather';
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
    <Image
      src="/logo.svg"
      width={48}
      height={48}
      priority
      quality={100}
      alt=""
    />
    <div className="animate-enter opacity-0 animation-delay-100">
      <h1 className="mb-2">{data.name}</h1>
      <p className="m-0 text-lg">{data.role}</p>
      <p className="mt-4 inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
        <MapPin width={14} height={14} />
        <span className="text-sm font-medium leading-snug">
          Currently {location ? `in ${location}` : 'somewhere'}
        </span>
      </p>
    </div>
    {data.hero_image.url && (
      <div className="flex animate-enter opacity-0 animation-delay-200">
        <Image
          src={data.hero_image.url}
          width={1214}
          height={703}
          priority
          quality={100}
          alt=""
          className="block overflow-hidden rounded-sm"
        />
      </div>
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
