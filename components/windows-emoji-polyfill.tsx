'use client';

import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
import { useEffect } from 'react';

polyfillCountryFlagEmojis();

export const WindowsEmojiPolyfill = () => {
  useEffect(() => {
    polyfillCountryFlagEmojis();
  }, []);

  return null;
};
