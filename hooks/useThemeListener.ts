import { useLocalStorageValue } from '@react-hookz/web';
import { useEffect } from 'react';

const useThemeListener = (): void => {
  const [theme] = useLocalStorageValue<string | undefined>('theme', undefined);

  useEffect(() => {
    if (
      theme === 'dark' ||
      (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
};

export default useThemeListener;
