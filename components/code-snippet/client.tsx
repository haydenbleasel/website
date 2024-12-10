'use client';

import { useTheme } from 'next-themes';

type CodeSnippetClientProps = {
  dark: string;
  light: string;
};

export const CodeSnippetClient = ({ dark, light }: CodeSnippetClientProps) => {
  const { theme } = useTheme();

  return (
    <div
      dangerouslySetInnerHTML={{ __html: theme === 'dark' ? dark : light }}
    />
  );
};
