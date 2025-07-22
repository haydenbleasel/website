'use client';

import { useTheme } from 'next-themes';
import { ThemeSwitcher } from './ui/kibo-ui/theme-switcher';

export function Theme() {
  const { theme, setTheme } = useTheme();

  return <ThemeSwitcher onChange={setTheme} value={theme as 'light' | 'dark' | 'system'} />;
}
