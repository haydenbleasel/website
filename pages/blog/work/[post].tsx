import type { GetStaticPaths, GetStaticProps } from 'next';
import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import type {
  FilledLinkToMediaField,
  ImageField,
  KeyTextField,
  PrismicDocumentWithUID,
  RichTextField,
  Slice,
  SliceZone as SliceZoneProps,
} from '@prismicio/types';
import { format, parseISO } from 'date-fns';
import type {
  JSXMapSerializer,
  SliceComponentProps,
  SliceComponentType,
} from '@prismicio/react';
import { SliceZone, PrismicRichText } from '@prismicio/react';
import Image from 'next/image';
import { ReactCompareSlider } from 'react-compare-slider';
import lottie from 'lottie-web';
import { asHTML } from '@prismicio/helpers';
import Layout from '../../../components/layout';
import { getPage, getPages } from '../../../utils/prismic';
import richTextComponents from '../../../components/richTextComponents';

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

const blogComponents: JSXMapSerializer = {
  ...richTextComponents,
  paragraph: ({ children, key }) => (
    <p
      key={key}
      className="mb-4 indent-8 text-md font-normal text-gray-900 dark:text-white"
    >
      {children}
    </p>
  ),
};

const RichTextSlice: FC<
  SliceComponentProps<{
    slice_type: 'rich_text';
    primary: {
      content: RichTextField;
    };
  }>
> = ({ slice }) => (
  <PrismicRichText field={slice.primary.content} components={blogComponents} />
);

const BlockquoteSlice: FC<
  SliceComponentProps<{
    slice_type: 'blockquote';
    primary: {
      content: RichTextField;
    };
  }>
> = ({ slice }) => (
  <blockquote
    // eslint-disable-next-line react/no-danger, @typescript-eslint/naming-convention
    dangerouslySetInnerHTML={{ __html: asHTML(slice.primary.content) }}
  />
);

const QuoteSlice: FC<
  SliceComponentProps<{
    slice_type: 'quote';
    primary: {
      content: RichTextField;
      author: KeyTextField;
      photo: ImageField;
    };
  }>
> = ({ slice }) => (
  <div className="my-8 grid gap-2">
    <p className="m-0 text-md text-gray-900 dark:text-white">
      {slice.primary.content}
    </p>
    <div className="flex items-center gap-3">
      {slice.primary.photo.url && (
        <div className="flex overflow-hidden rounded-full">
          <Image src={slice.primary.photo.url} width={32} height={32} />
        </div>
      )}
      <p className="m-0 text-sm text-gray-500 dark:text-gray-400">
        {slice.primary.author}
      </p>
    </div>
  </div>
);

const ComparisonSlice: FC<
  SliceComponentProps<{
    slice_type: 'quote';
    primary: {
      before: ImageField;
      after: ImageField;
    };
  }>
> = ({ slice }) => {
  if (!slice.primary.before.url || !slice.primary.after.url) {
    return null;
  }

  return (
    <ReactCompareSlider
      itemOne={
        <Image
          src={slice.primary.before.url}
          width={480}
          height={
            480 *
            (slice.primary.before.dimensions.height /
              slice.primary.before.dimensions.width)
          }
        />
      }
      itemTwo={
        <Image
          src={slice.primary.after.url}
          width={480}
          height={
            480 *
            (slice.primary.after.dimensions.height /
              slice.primary.after.dimensions.width)
          }
        />
      }
    />
  );
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
    <Layout backHref="/blog" backLabel="Blog">
      <div className="grid gap-8">
        <div className="grid gap-1">
          <h1 className="text-md font-medium text-gray-900 dark:text-white">
            {data.title}
          </h1>
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
          <SliceZone
            slices={data.slices1}
            components={{
              rich_text: RichTextSlice as unknown as SliceComponentType<Slice>,
              quote: QuoteSlice as unknown as SliceComponentType<Slice>,
              comparison:
                ComparisonSlice as unknown as SliceComponentType<Slice>,
              blockquote:
                BlockquoteSlice as unknown as SliceComponentType<Slice>,
            }}
          />
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
