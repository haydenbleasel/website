import type { GetStaticPaths, GetStaticProps } from 'next';
import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import type {
  FilledLinkToMediaField,
  ImageField,
  KeyTextField,
  PrismicDocumentWithUID,
  SliceZone as SliceZoneProps,
} from '@prismicio/types';
import { format, parseISO } from 'date-fns';
import { SliceZone } from '@prismicio/react';
import Image from 'next/image';
import lottie from 'lottie-web';
import Layout from '../../../components/layout';
import { getPage, getPages } from '../../../utils/prismic';
import { components } from '../../../slices';

type WorkPostProps = {
  data: {
    title: KeyTextField;
    description: KeyTextField;
    coverImage: ImageField;
    coverAnimation: FilledLinkToMediaField;
    slices1: SliceZoneProps;
  };
  last_publication_date: string;
};

const WorkPost: FC<WorkPostProps> = ({ data, last_publication_date }) => {
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data.coverAnimation.url && animationRef.current) {
      lottie.loadAnimation({
        container: animationRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: data.coverAnimation.url,
      });
    }
  }, [data.coverAnimation.url]);

  return (
    <Layout title={data.title} description={data.description} noSticky>
      <div className="grid gap-8">
        <div className="grid gap-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated at{' '}
            {format(parseISO(last_publication_date), 'MMM dd, yyyy')}{' '}
          </p>
        </div>
        {data.coverAnimation.url && (
          <div
            style={{ background: '#CE5777' }}
            className="overflow-hidden rounded-sm"
            ref={animationRef}
          />
        )}
        {data.coverImage.url && !data.coverAnimation.url && (
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
        <div className="prose dark:prose-invert">
          <SliceZone slices={data.slices1} components={components} />
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data, last_publication_date } = (await getPage(
    params?.post as string,
    'case-study'
  )) as PrismicDocumentWithUID<WorkPostProps['data']>;

  return {
    props: {
      data,
      last_publication_date,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const caseStudies = (await getPages('case-study')) as PrismicDocumentWithUID<
    WorkPostProps['data']
  >[];

  const paths = caseStudies.map(({ uid }) => ({
    params: {
      post: uid,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default WorkPost;
