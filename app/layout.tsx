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
        <ScrollAreaProvider>
          <TooltipProvider>
            {children}
            <div className="fixed bottom-4 right-4 flex flex-col gap-1">
              <Tooltip content="Twitter">
                <Link
                  href="https://twitter.com/haydenbleasel"
                  className={clsx(
                    'rounded p-2',
                    'text-neutral-500 dark:text-neutral-400',
                    'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  )}
                  aria-label="Twitter"
                >
                  <Image
                    src="/images/social/twitter.svg"
                    width={16}
                    height={16}
                    alt="Twitter"
                  />
                </Link>
              </Tooltip>

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
                      <ChatBubbleOvalLeftEllipsisIcon width={16} height={16} />
                    </button>
                  </Tooltip>
                </div>
              </ContactForm>
              <ThemeSwitcher />
            </div>
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
