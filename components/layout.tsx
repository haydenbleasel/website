import { PrismicLink } from '@prismicio/react';
import type { ImageField } from '@prismicio/types';
import { useKBar } from 'kbar';
import type { NextSeoProps } from 'next-seo';
import { NextSeo } from 'next-seo';
import type { OpenGraphMedia } from 'next-seo/lib/types';
import { useRouter } from 'next/router';
import type { FC, ReactNode } from 'react';
import { ArrowLeft } from 'react-feather';
import useGamepadEvents from '@haydenbleasel/use-gamepad-events';
import toast from 'react-hot-toast';
import { useSessionStorageValue } from '@react-hookz/web';
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

const getActiveKBarIndex = () => {
  const activeElement = document.querySelector(
    '#kbar-listbox > [aria-selected="true"]'
  );
  if (!activeElement) {
    return undefined;
  }
  const id = activeElement.getAttribute('id');
  const index = id?.split('-').at(-1);

  if (!index) {
    return undefined;
  }

  const parsedIndex = Number(index);

  return parsedIndex;
};

const getLastKBarIndex = () => {
  const activeElement = document.querySelectorAll('#kbar-listbox > div');

  const lastElement = activeElement[activeElement.length - 1];

  const id = lastElement.getAttribute('id');
  const index = id?.split('-').at(-1);

  if (!index) {
    return undefined;
  }

  const parsedIndex = Number(index);

  return parsedIndex;
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
  const router = useRouter();
  const siteUrl = new URL(router.asPath, process.env.NEXT_PUBLIC_SITE_URL).href;
  const previousPage = getPreviousPage(router.asPath);
  const [hasSeenControls, setHasSeenControls] = useSessionStorageValue(
    'daylight-controls',
    false
  );
  const gamepadEvents = useGamepadEvents({
    onReady: (gamepad) => {
      if (hasSeenControls) {
        return;
      }
      toast(`${gamepad.id} connected.`);
      toast('Press Y to open / close the menu.');
      toast('Press A to select an option.');
      toast('Press B to go back.');
      toast('Press START to reload the page');
      toast('Press SELECT to go back.');
      toast('Use the D-Pad to navigate.');
      setHasSeenControls(true);
    },
  });
  const kbar = useKBar();

  gamepadEvents.on('options', router.reload);
  gamepadEvents.on('y', kbar.query.toggle);
  gamepadEvents.on('share', router.back);

  gamepadEvents.on('down', () => {
    if (typeof window === 'undefined') {
      return;
    }

    const isKBarOpen = document.body.style.overflowY === 'hidden';
    if (isKBarOpen) {
      const activeIndex = getActiveKBarIndex();
      const lastIndex = getLastKBarIndex();
      if (
        activeIndex !== undefined &&
        lastIndex !== undefined &&
        activeIndex < lastIndex
      ) {
        kbar.query.setActiveIndex(activeIndex + 1);
      }
    } else {
      window.scrollTo({ top: window.scrollY + window.innerHeight });
    }
  });

  gamepadEvents.on('a', () => {
    if (typeof window === 'undefined') {
      return;
    }

    const isKBarOpen = document.body.style.overflowY === 'hidden';
    if (!isKBarOpen) {
      return;
    }

    const activeElement = document.querySelector<HTMLDivElement>(
      '#kbar-listbox > [aria-selected="true"]'
    );

    if (!activeElement) {
      return;
    }

    activeElement.click();
  });

  gamepadEvents.on('b', () => {
    if (typeof window === 'undefined') {
      return;
    }

    const isKBarOpen = document.body.style.overflowY === 'hidden';
    if (!isKBarOpen) {
      return;
    }

    kbar.query.setCurrentRootAction(null);
  });

  gamepadEvents.on('up', () => {
    if (typeof window === 'undefined') {
      return;
    }

    const isKBarOpen = document.body.style.overflowY === 'hidden';
    if (isKBarOpen) {
      const activeIndex = getActiveKBarIndex();
      if (activeIndex !== undefined && activeIndex > 0) {
        kbar.query.setActiveIndex(activeIndex - 1);
      }
    } else {
      window.scrollTo({ top: window.scrollY - window.innerHeight });
    }
  });

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
  );
};

export default Layout;
