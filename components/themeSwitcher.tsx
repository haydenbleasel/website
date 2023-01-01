'use client';

import type { FC } from 'react';
import { Sun, Moon } from 'lucide-react';
import clsx from 'clsx';
import useTheme from '@haydenbleasel/use-theme';

const ThemeSwitcher: FC = () => {
  const [theme, setTheme] = useTheme();
  const Icon = theme === 'dark' ? Sun : Moon;

  return (
    <div className="fixed right-4 bottom-4 flex items-center sm:px-1">
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
      </div>
    </div>
  );
};

export default ThemeSwitcher;
