'use client';

type HomepageTitleProps = {
  text: string;
};

export const HomepageTitle = ({ text }: HomepageTitleProps) => {
  if (
    typeof window !== 'undefined' &&
    // Windows doesn't include country flags?!
    window.navigator.userAgent.includes('Windows')
  ) {
    return text.replace(' 🇺🇸', '');
  }

  return text;
};
