import { useMDXComponent } from 'next-contentlayer/hooks';
import type { FC, ReactNode } from 'react';
import FigmaFile from './figmaFile';
import ComparisonSlider from './comparisonSlider';
import Video from './video';
import DribbbleSlider from '@/components/dribbbleSlider';

type MdxProps = {
  code: string;
};

const Callout: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="rounded bg-zinc-100 p-4 font-medium prose-p:m-0 dark:bg-zinc-800">
    {children}
  </div>
);

const components = {
  Callout,
  Video,
  DribbbleSlider: DribbbleSlider as unknown as FC,
  FigmaFile: FigmaFile as unknown as FC,
  ComparisonSlider: ComparisonSlider as unknown as FC,
};

export const Mdx: FC<MdxProps> = ({ code }) => {
  const Component = useMDXComponent(code);

  return (
    <div className="prose-h2:mb-4">
      <Component components={components} />
    </div>
  );
};
