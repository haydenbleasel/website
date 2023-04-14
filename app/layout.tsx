import type { FC, ReactNode } from 'react';
import './globals.css';
import clsx from 'clsx';
import { TooltipProvider } from '@/components/tooltip';
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
        <ThemeSwitcher />
        <ContactForm>
          <button
            type="button"
            className={clsx(
              'fixed bottom-16 right-4 rounded p-2',
              'text-neutral-500 dark:text-neutral-400',
              'hover:bg-neutral-100 dark:hover:bg-neutral-800'
            )}
            aria-label="Toggle dark mode"
          >
            <ChatBubbleOvalLeftEllipsisIcon width={16} height={16} />
          </button>
        </ContactForm>
      </TooltipProvider>
    </body>
  </html>
);

export default RootLayout;
