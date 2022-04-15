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
  noSticky?: boolean;
  noTitle?: boolean;
} & Omit<NextSeoProps, 'title' | 'description'>;

const getPreviousPage = (path: string) => {
  const pathElements = path.split('/').filter(Boolean);

  if (!pathElements.length) {
    return null;
  }

  if (pathElements.length === 1) {
    return {
      href: '/',
      label: 'Home',
    };
  }

  const lastPage = pathElements[pathElements.length - 2];

  return {
    href: `/${pathElements.slice(0, -1).join('/')}`,
    label: lastPage.charAt(0).toUpperCase() + lastPage.slice(1),
  };
};

const Layout: FC<LayoutProps> = ({
  title,
  description,
  children,
  noSticky = false,
  noTitle = false,
  ...props
}) => {
  const { asPath } = useRouter();
  const siteUrl = new URL(asPath, process.env.NEXT_PUBLIC_SITE_URL).href;
  const previousPage = getPreviousPage(asPath);

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
      {!noTitle && <StickyTitle noSticky={noSticky}>{title}</StickyTitle>}
      <div className="container mx-auto flex max-w-[42rem] flex-col gap-12 px-4 pb-12 sm:gap-24 sm:pb-48">
        {children}
      </div>
      {previousPage && (
        <div className="fixed top-0 left-0 z-20 print:hidden">
          <PrismicLink href={previousPage.href}>
            <span className="flex items-center gap-1 p-4 text-gray-500 dark:text-gray-400">
              <ArrowLeft size={16} />
              <span className="text-sm leading-[1rem] text-gray-500 dark:text-gray-400">
                {previousPage.label}
              </span>
            </span>
          </PrismicLink>
        </div>
      )}
    </>
  );
};

export default Layout;
