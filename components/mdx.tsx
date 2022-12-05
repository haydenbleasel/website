import { useMDXComponent } from 'next-contentlayer/hooks';
import type { FC, ReactNode } from 'react';
import FigmaFile from './figmaFile';
import DribbbleSlider from '@/components/dribbbleSlider';

type MdxProps = {
  code: string;
};

const Callout: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">{children}</div>
);

const components = {
  Callout,
  DribbbleSlider: DribbbleSlider as unknown as FC,
  FigmaFile: FigmaFile as unknown as FC,
};

export const Mdx: FC<MdxProps> = ({ code }) => {
  const Component = useMDXComponent(code);

  return (
    <div className="prose-h2:mb-4">
      <Component components={components} />
    </div>
  );
};
