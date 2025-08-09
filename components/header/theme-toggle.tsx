import { MoonIcon, SunIcon } from '@phosphor-icons/react/dist/ssr';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const otherTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      aria-label={mounted ? `Switch to ${otherTheme} theme` : 'Toggle theme'}
      className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      onClick={() => setTheme(otherTheme)}
      type="button"
    >
      <SunIcon className="block size-6 text-teal-500 dark:hidden dark:text-teal-400" />
      <MoonIcon className="hidden size-6 text-teal-500 dark:block dark:text-teal-400" />
    </button>
  );
};
