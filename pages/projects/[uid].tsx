import type { GetStaticPaths, GetStaticProps } from 'next';
import type { FC } from 'react';
import type {
  EmbedField,
  ImageFieldImage,
  KeyTextField,
  PrismicDocumentWithUID,
} from '@prismicio/types';
import type { SliceZoneComponents, SliceZoneProps } from '@prismicio/react';
import { SliceZone } from '@prismicio/react';
import Image from 'next/future/image';
import Layout from '../../components/layout';
import { getPage, getPages } from '../../utils/prismic';
import { components } from '../../slices';
import Video from '../../components/video';

type LandingPageProps = {
  data: {
    title: KeyTextField;
    description: KeyTextField;
    coverImage: ImageFieldImage;
    coverVideo: EmbedField;
    slices1: SliceZoneProps['slices'];
  };
};

const LandingPage: FC<LandingPageProps> = ({ data }) => (
  <Layout title={data.title} description={data.description}>
    <div className="flex flex-col gap-8">
      <div className="flex animate-enter flex-col gap-1 opacity-0 animation-delay-100">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {data.description}
        </p>
      </div>
      {data.coverImage.url && (
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
          quality={100}
          className="flex animate-enter overflow-hidden rounded-sm opacity-0 animation-delay-200"
        />
      )}
      {data.coverVideo.embed_url && (
        <div className="animate-enter opacity-0 animation-delay-200">
          <Video
            data={data.coverVideo}
            loop
            playsinline
            controls={false}
            muted
          />
        </div>
      )}
      <div className="flex animate-enter flex-col gap-8 opacity-0 animation-delay-300">
        <SliceZone
          slices={data.slices1}
          components={components as unknown as SliceZoneComponents}
        />
      </div>
    </div>
  </Layout>
);

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data, last_publication_date } = (await getPage(
    params?.uid as string,
    'project'
  )) as PrismicDocumentWithUID;

  return {
    props: {
      data,
      last_publication_date,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = (await getPages('project')) as PrismicDocumentWithUID[];

  const paths = pages.map(({ uid }) => ({
    params: {
      uid,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default LandingPage;
