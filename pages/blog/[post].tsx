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
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArticleJsonLd } from 'next-seo';
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, RedditIcon, RedditShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton } from 'react-share';
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
  const shareUrl = new URL(asPath, process.env.NEXT_PUBLIC_SITE_URL ?? '').href

  return (
    <Layout title={data.title} description={data.description}>
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
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Published {format(parseISO(publishedAt), 'MMM dd, yyyy')}{' '}
          </p>
        </div>
        {data.coverImage.url && (
          <div className="flex overflow-hidden rounded-sm">
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
            />
          </div>
        )}
        {data.coverVideo.embed_url && (
          <Video
            data={data.coverVideo}
            loop
            playsinline
            controls={false}
            muted
          />
        )}
        <div className="prose dark:prose-invert">
          <SliceZone
            slices={data.slices1}
            components={components as unknown as SliceZoneComponents}
          />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 bg-white right-0 px-4 py-3 flex items-center justify-between gap-4 border-t border-gray-200 text-gray-500 dark:text-gray-400">
        <p className="text-md text-gray-900 font-semibold">Share this article</p>
        <div className="flex items-center gap-4">
          <FacebookShareButton url={shareUrl}>
            <span className="flex items-center gap-2">
              <FacebookIcon className="rounded-full" size={16} />
              <span className="hidden sm:block text-md">Facebook</span>
            </span>
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl}>
            <span className="flex items-center gap-2">
              <TwitterIcon className="rounded-full" size={16} />
              <span className="hidden sm:block text-md">Twitter</span>
            </span>
          </TwitterShareButton>
          <LinkedinShareButton url={shareUrl}>
            <span className="flex items-center gap-2">
              <LinkedinIcon className="rounded-full" size={16} />
              <span className="hidden sm:block text-md">LinkedIn</span>
            </span>
          </LinkedinShareButton>
          <TelegramShareButton url={shareUrl}>
            <span className="flex items-center gap-2">
              <TelegramIcon className="rounded-full" size={16} />
              <span className="hidden sm:block text-md">Telegram</span>
            </span>
          </TelegramShareButton>
          <RedditShareButton url={shareUrl}>
            <span className="flex items-center gap-2">
              <RedditIcon className="rounded-full" size={16} />
              <span className="hidden sm:block text-md">Reddit</span>
            </span>
          </RedditShareButton>
          <EmailShareButton url={shareUrl}>
            <span className="flex items-center gap-2">
              <EmailIcon className="rounded-full" size={16} />
              <span className="hidden sm:block text-md">Email</span>
            </span>
          </EmailShareButton>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const uid = params?.post as string;

  const posts = await Promise.all([
    getPage(uid, 'case-study'),
    getPage(uid, 'work-post'),
  ]);

  const post = posts.filter(Boolean)[0] as PrismicDocumentWithUID<
    PostProps['data']
  >;

  return {
    props: post,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const caseStudies = (await getPages('case-study')) as PrismicDocumentWithUID<
    PostProps['data']
  >[];
  const workPosts = (await getPages('work-post')) as PrismicDocumentWithUID<
    PostProps['data']
  >[];

  const paths = [...caseStudies, ...workPosts].map(({ uid }) => ({
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
