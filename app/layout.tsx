import type { FC, ReactNode } from 'react';
import './globals.css';
import clsx from 'clsx';
import { Tooltip, TooltipProvider } from '@/components/tooltip';
import ThemeSwitcher from '@/components/themeSwitcher';
import { sans } from '@/lib/fonts';
import ContactForm from '@/components/contactForm';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html lang="en">
    <body
      className={clsx(sans.variable, 'bg-white font-sans dark:bg-neutral-950')}
    >
      <TooltipProvider>
        {children}
        <div className="fixed bottom-4 right-4 flex flex-col gap-1">
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
    </body>
  </html>
);

export default RootLayout;
