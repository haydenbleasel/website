'use client';

import type { FC } from 'react';
import useTheme from '@beskar-labs/use-theme';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Tooltip } from './tooltip';

const ThemeSwitcher: FC = () => {
  const [theme, setTheme] = useTheme();
  const Component = theme === 'dark' ? SunIcon : MoonIcon;

  const handleThemeChange = () => {
    if (typeof window === 'undefined') return;
    const systemTheme = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (!theme) {
      setTheme(systemTheme ? 'dark' : 'light');
      return;
    }

    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Tooltip content="Toggle dark mode">
      <button
        type="button"
        className={clsx(
          'rounded p-2',
          'text-neutral-500 dark:text-neutral-400',
          'hover:bg-neutral-100 dark:hover:bg-neutral-800'
        )}
        onClick={handleThemeChange}
        aria-label="Toggle dark mode"
      >
        <Component width={16} height={16} />
      </button>
    </Tooltip>
  );
};

export default ThemeSwitcher;
