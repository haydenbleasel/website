import { PrismicLink } from '@prismicio/react';
import type { ImageField } from '@prismicio/types';
import type { NextSeoProps } from 'next-seo';
import { NextSeo } from 'next-seo';
import type { OpenGraphMedia } from 'next-seo/lib/types';
import { useRouter } from 'next/router';
import type { FC, ReactNode } from 'react';
import { Suspense } from 'react';
import { ArrowLeft } from 'react-feather';
import dynamic from 'next/dynamic';
import useAnalytics from '../hooks/useAnalytics';
import useNetworkMonitor from '../hooks/useNetworkMonitor';
import useThemeListener from '../hooks/useThemeListener';
import StickyTitle from './stickyTitle';

export type LayoutProps = {
  title: string | null;
  description: string | null;
  subtitle?: string | null;
  caption?: string;
  image?: ImageField;
  noSticky?: boolean;
  noTitle?: boolean;
  children: ReactNode;
} & Omit<NextSeoProps, 'title' | 'description'>;

const getPreviousPage = (path: string) => {
  const { pathname } = new URL(path, process.env.NEXT_PUBLIC_SITE_URL);
  const pathElements = pathname.split('/').filter(Boolean);

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
  subtitle,
  caption,
  image,
  children,
  noSticky = false,
  noTitle = false,
  ...props
}) => {
  const { asPath } = useRouter();
  const siteUrl = new URL(asPath, process.env.NEXT_PUBLIC_SITE_URL).href;
  const previousPage = getPreviousPage(asPath);
  const Activity = dynamic(
    async () =>
      import(
        /* webpackChunkName: "activity" */
        './activity'
      ),
    { ssr: false, suspense: true }
  );
  const Menu = dynamic(
    async () =>
      import(
        /* webpackChunkName: "menu" */
        './menu'
      ),
    { ssr: false, suspense: true }
  );
  const CommandBar = dynamic(
    async () =>
      import(
        /* webpackChunkName: "CommandBar" */
        './commandbar'
      ),
    { ssr: false, suspense: true }
  );
  useAnalytics();
  useNetworkMonitor();
  useThemeListener();

  if (!title || !description) {
    throw new Error(
      'Layout: `title` and `description` are required properties. ' +
        'Please set them in the page component.'
    );
  }

  let images: OpenGraphMedia[] = [
    {
      url: new URL('/cover.png', process.env.NEXT_PUBLIC_SITE_URL).href,
      width: 1200,
      height: 630,
      alt: '',
      type: 'image/jpeg',
    },
  ];

  if (image?.url) {
    images = [
      {
        url: image.url,
        width: image.dimensions.width,
        height: image.dimensions.height,
        alt: image.alt ?? '',
      },
    ];
  }

  return (
    <>
      <div className="py-12 print:py-4 sm:gap-24 sm:py-48">
        <NextSeo
          title={title}
          titleTemplate="%s — Hayden Bleasel"
          description={description}
          canonical={siteUrl}
          openGraph={{
            url: siteUrl,
            title,
            description,
            images,
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
        <StickyTitle noSticky={noSticky} noTitle={noTitle}>
          {title}
        </StickyTitle>
        <div className="container prose mx-auto px-4 dark:prose-invert">
          {(caption || subtitle) && (
            <div className="mb-8 flex flex-col gap-1">
              {subtitle && (
                <p className="m-0 animate-enter opacity-0 animation-delay-100">
                  {subtitle}
                </p>
              )}
              {caption && (
                <p className="m-0 animate-enter text-sm text-neutral-500 opacity-0 animation-delay-100 dark:text-neutral-400">
                  {caption}
                </p>
              )}
            </div>
          )}
          {children}
        </div>
        {previousPage && (
          <div className="fixed top-0 left-0 z-20 print:hidden">
            <PrismicLink href={previousPage.href}>
              <span className="flex items-center gap-1 p-4 text-neutral-500 dark:text-neutral-400">
                <ArrowLeft size={16} />
                <span className="text-sm leading-[1rem] text-neutral-500 dark:text-neutral-400">
                  {previousPage.label}
                </span>
              </span>
            </PrismicLink>
          </div>
        )}
      </div>
      <Suspense>
        <Activity />
        <Menu />
        <CommandBar />
      </Suspense>
    </>
  );
};

export default Layout;
