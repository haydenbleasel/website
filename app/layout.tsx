import type { FC, ReactNode } from 'react';
import './globals.css';
import clsx from 'clsx';
import { Tooltip, TooltipProvider } from '@/components/tooltip';
import ThemeSwitcher from '@/components/themeSwitcher';
import { sans, serif } from '@/lib/fonts';
import ContactForm from '@/components/contactForm';
import { Analytics } from '@vercel/analytics/react';
import {
  ChatBubbleOvalLeftEllipsisIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import Link from '@/components/link';
import Image from '@/components/image';
import ScrollAreaProvider from '@/components/scrollArea';
import AnchorHighlightProvider from '@/components/anchorHighlightProvider';
import { Toaster } from '@/components/toaster';
import type { Person } from 'schema-dts';
import { toJsonLd } from '@/lib/utils';

type RootLayoutProps = {
  children: ReactNode;
};

const profileJsonLd = toJsonLd<Person>({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Hayden Bleasel',
  brand: ['Jellypepper', 'Beskar Labs'],
  jobTitle: 'Chief Product Officer',
  url: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? '/').href,
  sameAs: [
    'https://twitter.com/haydenbleasel',
    'https://dribbble.com/haydenbleasel',
    'https://www.instagram.com/hayden.bleasel/',
    'https://github.com/haydenbleasel/',
    'https://www.linkedin.com/in/haydenbleasel',
    'https://www.producthunt.com/@haydenbleasel',
    'https://open.spotify.com/user/haydenbleasel',
    'https://www.figma.com/@haydenbleasel',
    'https://haydenbleasel.medium.com/',
  ],
  image: new URL(
    '/images/profile-large.jpg',
    process.env.NEXT_PUBLIC_SITE_URL ?? '/'
  ).href,
  alumniOf: 'University of Technology, Sydney',
  birthPlace: {
    '@type': 'Place',
    name: 'Sydney, Australia',
  },
  familyName: 'Bleasel',
  description:
    'Australian product designer and TypeScript developer living in the U.S.',
  gender: 'Male',
  givenName: 'Hayden',
  worksFor: {
    '@type': 'Organization',
    name: 'Corellium',
  },
  workLocation: {
    '@type': 'Place',
    name: 'Delray Beach, Florida',
  },
  knowsLanguage: 'English',
  knowsAbout: [
    'Product Design',
    'TypeScript Development',
    'Product Management',
  ],
  nationality: {
    '@type': 'Country',
    name: 'Australia',
  },
});

const socialLinks = [
  {
    href: 'https://twitter.com/haydenbleasel',
    name: 'Twitter',
    image: '/images/social/twitter.svg',
  },
  {
    href: 'https://github.com/haydenbleasel',
    name: 'GitHub',
    image: '/images/social/github.svg',
  },
  {
    href: 'https://dribbble.com/haydenbleasel',
    name: 'Dribbble',
    image: '/images/social/dribbble.svg',
  },
  {
    href: 'https://www.linkedin.com/in/haydenbleasel/',
    name: 'LinkedIn',
    image: '/images/social/linkedin.svg',
  },
];

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html lang="en">
    <body
      className={clsx(
        sans.variable,
        serif.variable,
        'bg-white font-sans dark:bg-neutral-950'
      )}
    >
      <AnchorHighlightProvider>
        <ScrollAreaProvider className="h-screen">
          <TooltipProvider>
            <main className="prose prose-neutral mx-4 my-24 grid gap-16 dark:prose-invert sm:m-[11%] lg:m-[180px]">
              {children}
              <div className="bottom-4 right-4 flex flex-row gap-1 sm:fixed sm:flex-col">
                {socialLinks.map((link) => (
                  <Tooltip content={link.name} key={link.name}>
                    <Link
                      href={link.href}
                      className={clsx(
                        'rounded p-2',
                        'text-neutral-500 dark:text-neutral-400',
                        'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      )}
                      aria-label={link.name}
                    >
                      <Image
                        src={link.image}
                        width={16}
                        height={16}
                        alt={link.name}
                        className={clsx(
                          'm-0 h-4 w-4 object-contain',
                          link.name === 'GitHub' &&
                            'dark:brightness-0 dark:invert'
                        )}
                      />
                    </Link>
                  </Tooltip>
                ))}

                <hr className="m-2 border-neutral-300 dark:border-neutral-700" />

                <Tooltip content="Colophon">
                  <Link
                    href="https://github.com/haydenbleasel/daylight/blob/main/README.md"
                    className={clsx(
                      'rounded p-2',
                      'text-neutral-500 dark:text-neutral-400',
                      'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    )}
                    aria-label="Colophon"
                  >
                    <InformationCircleIcon width={16} height={16} />
                  </Link>
                </Tooltip>

                <ContactForm>
                  <div>
                    <Tooltip content="Get in touch">
                      <button
                        type="button"
                        className={clsx(
                          'rounded p-2',
                          'text-neutral-500 dark:text-neutral-400',
                          'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        )}
                        aria-label="Toggle dark mode"
                      >
                        <ChatBubbleOvalLeftEllipsisIcon
                          width={16}
                          height={16}
                        />
                      </button>
                    </Tooltip>
                  </div>
                </ContactForm>
                <ThemeSwitcher />
              </div>
            </main>
          </TooltipProvider>
        </ScrollAreaProvider>
      </AnchorHighlightProvider>
      <Analytics />
      <Toaster />
      {/* eslint-disable-next-line react/no-danger, @typescript-eslint/naming-convention */}
      <div dangerouslySetInnerHTML={{ __html: profileJsonLd }} />
    </body>
  </html>
);

export default RootLayout;
