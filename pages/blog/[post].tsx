import type { GetStaticPaths, GetStaticProps } from 'next';
import type { FC } from 'react';
import type {
  DateField,
  EmbedField,
  ImageField,
  KeyTextField,
  PrismicDocumentWithUID,
  SliceZone as SliceZoneProps,
} from '@prismicio/types';
import { format, parse, parseISO } from 'date-fns';
import type { SliceZoneComponents } from '@prismicio/react';
import { SliceZone } from '@prismicio/react';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import { ArticleJsonLd } from 'next-seo';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import Layout from '../../components/layout';
import { getPage, getPages } from '../../utils/prismic';
import { components } from '../../slices';
import Video from '../../components/video';

type PostProps = PrismicDocumentWithUID<{
  title: KeyTextField;
  description: KeyTextField;
  coverImage: ImageField;
  coverVideo: EmbedField;
  custom_publish_date: DateField;
  slices1: SliceZoneProps;
}>;

const WorkPost: FC<PostProps> = ({
  data,
  last_publication_date,
  first_publication_date,
}) => {
  const { asPath } = useRouter();
  const publishedAt = data.custom_publish_date
    ? parse(data.custom_publish_date, 'yyyy-MM-dd', new Date()).toISOString()
    : first_publication_date;
  const shareUrl = new URL(asPath, process.env.NEXT_PUBLIC_SITE_URL ?? '').href;

  return (
    <Layout
      title={data.title}
      description={data.description}
      image={data.coverImage}
    >
      <ArticleJsonLd
        url={shareUrl}
        title={data.title ?? ''}
        images={data.coverImage.url ? [data.coverImage.url] : []}
        datePublished={publishedAt}
        dateModified={last_publication_date}
        authorName={[]}
        publisherName="Corellium"
        publisherLogo={
          new URL(
            '/android-chrome-512x512.png',
            process.env.NEXT_PUBLIC_SITE_URL ?? ''
          ).href
        }
        description={data.description ?? ''}
      />
      <p className="animate-enter text-lg opacity-0 animation-delay-100">
        Published {format(parseISO(publishedAt), 'MMM dd, yyyy')}
      </p>
      {data.coverImage.url && (
        <Image
          src={data.coverImage.url}
          alt={data.coverImage.alt ?? ''}
          width={640}
          height={
            640 *
            (data.coverImage.dimensions.height /
              data.coverImage.dimensions.width)
          }
          priority
          quality={100}
          className="animate-enter-burst overflow-hidden rounded-sm opacity-0 animation-delay-200"
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
      <div className="animate-enter opacity-0 animation-delay-300">
        <SliceZone
          slices={data.slices1}
          components={components as unknown as SliceZoneComponents}
        />
      </div>
      <div className="bottom-0 left-0 right-0 flex animate-enter flex-col justify-between gap-4 border-t border-neutral-200 bg-white py-3 text-neutral-500 opacity-0 animation-delay-300 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 md:fixed md:flex-row md:items-center md:px-4">
        <p className="m-0">Share this article</p>
        <div className="flex items-center">
          <FacebookShareButton url={shareUrl}>
            <span className="flex items-center gap-2 rounded-sm py-[10px] px-[10px] transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 sm:py-1">
              <FacebookIcon className="rounded-full" size={16} />
              <span className="hidden text-md text-neutral-500 dark:text-neutral-400 sm:block">
                Facebook
              </span>
            </span>
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl}>
            <span className="flex items-center gap-2 rounded-sm py-[10px] px-[10px] transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 sm:py-1">
              <TwitterIcon className="rounded-full" size={16} />
              <span className="hidden text-md text-neutral-500 dark:text-neutral-400 sm:block">
                Twitter
              </span>
            </span>
          </TwitterShareButton>
          <LinkedinShareButton url={shareUrl}>
            <span className="flex items-center gap-2 rounded-sm py-[10px] px-[10px] transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 sm:py-1">
              <LinkedinIcon className="rounded-full" size={16} />
              <span className="hidden text-md text-neutral-500 dark:text-neutral-400 sm:block">
                LinkedIn
              </span>
            </span>
          </LinkedinShareButton>
          <TelegramShareButton url={shareUrl}>
            <span className="flex items-center gap-2 rounded-sm py-[10px] px-[10px] transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 sm:py-1">
              <TelegramIcon className="rounded-full" size={16} />
              <span className="hidden text-md text-neutral-500 dark:text-neutral-400 sm:block">
                Telegram
              </span>
            </span>
          </TelegramShareButton>
          <RedditShareButton url={shareUrl}>
            <span className="flex items-center gap-2 rounded-sm py-[10px] px-[10px] transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 sm:py-1">
              <RedditIcon className="rounded-full" size={16} />
              <span className="hidden text-md text-neutral-500 dark:text-neutral-400 sm:block">
                Reddit
              </span>
            </span>
          </RedditShareButton>
          <EmailShareButton url={shareUrl}>
            <span className="flex items-center gap-2 rounded-sm py-[10px] px-[10px] transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 sm:py-1">
              <EmailIcon className="rounded-full" size={16} />
              <span className="hidden text-md text-neutral-500 dark:text-neutral-400 sm:block">
                Email
              </span>
            </span>
          </EmailShareButton>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
  previewData,
}) => {
  const uid = params?.post as string;
  const posts = await getPage({ previewData }, uid, 'case-study');

  const post = posts as PrismicDocumentWithUID<PostProps['data']>;

  return {
    props: post,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const caseStudies = (await getPages('case-study')) as PrismicDocumentWithUID<
    PostProps['data']
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
