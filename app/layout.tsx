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

type RootLayoutProps = {
  children: ReactNode;
};

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
    </body>
  </html>
);

export default RootLayout;
