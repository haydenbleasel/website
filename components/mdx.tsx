import { useMDXComponent } from 'next-contentlayer/hooks';
import type { FC } from 'react';

type MdxProps = {
  code: string;
};

export const Mdx: FC<MdxProps> = ({ code }) => {
  const Component = useMDXComponent(code);

  return (
    <div className="prose">
      <Component />
    </div>
  );
};
