import { PrismicLink } from '@prismicio/react';
import type { NextSeoProps } from 'next-seo';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { ArrowLeft } from 'react-feather';
import StickyTitle from './stickyTitle';

export type LayoutProps = {
  title: string | null;
  description: string | null;
  backHref?: string;
  backLabel?: string;
} & Omit<NextSeoProps, 'title' | 'description'>;

const Layout: FC<LayoutProps> = ({
  title,
  description,
  backHref,
  backLabel,
  children,
  ...props
}) => {
  const { asPath } = useRouter();
  const siteUrl = new URL(asPath, process.env.NEXT_PUBLIC_SITE_URL).href;

  if (!title || !description) {
    throw new Error(
      'Layout: `title` and `description` are required properties. ' +
        'Please set them in the page component.'
    );
  }

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={siteUrl}
        openGraph={{
          url: siteUrl,
          title,
          description,
          images: [
            {
              url: new URL('cover.jpg', process.env.NEXT_PUBLIC_SITE_URL).href,
              width: 1200,
              height: 630,
              alt: '',
              type: 'image/jpeg',
            },
          ],
          site_name: 'Hayden Bleasel',
          type: 'profile',
          profile: {
            firstName: 'Hayden',
            lastName: 'Bleasel',
            username: 'haydenbleasel',
            gender: 'male',
          },
        }}
        twitter={{
          handle: '@haydenbleasel',
          site: '@haydenbleasel',
          cardType: 'summary_large_image',
        }}
        {...props}
      />
      <StickyTitle>{title}</StickyTitle>
      <div className="container mx-auto mt-4 grid max-w-[32rem] gap-24 px-4 pb-12 sm:pb-48">
        {children}
      </div>
      {backHref && (
        <div className="fixed top-0 left-0 z-20">
          <PrismicLink href={backHref}>
            <span className="flex items-center gap-1 p-4 text-gray-400 dark:text-gray-500">
              <ArrowLeft size={14} />
              <span className="text-sm leading-[1rem] text-gray-400 dark:text-gray-500">
                {backLabel ?? 'Back'}
              </span>
            </span>
          </PrismicLink>
        </div>
      )}
    </>
  );
};

export default Layout;
