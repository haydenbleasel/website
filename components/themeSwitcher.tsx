'use client';

import type { FC } from 'react';
import { Sun, Moon } from 'lucide-react';
import clsx from 'clsx';
import useTheme from '@haydenbleasel/use-theme';
import Separator from './navbar/seperator';

const ThemeSwitcher: FC = () => {
  const [theme, setTheme] = useTheme();
  const Icon = theme === 'dark' ? Sun : Moon;

  return (
    <>
      <Separator />
      <div className="flex items-center sm:px-1">
        <div className="group relative p-2">
          <Icon
            size={20}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={clsx(
              'cursor-pointer text-zinc-500 transition-colors group-hover:text-teal-600',
              'dark:text-zinc-400 dark:group-hover:text-teal-400',
              'group-[.active-page]:text-teal-600'
            )}
          />
          <span className="sr-only">More</span>
          <span
            className={clsx(
              'absolute inset-x-1 -bottom-px hidden h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 opacity-0 transition-opacity group-hover:opacity-100 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0 sm:block'
            )}
          />
        </div>
      </div>
    </>
  );
};

export default ThemeSwitcher;
