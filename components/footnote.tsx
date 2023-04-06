import type { FC } from 'react';

type FootnoteProps = {
  index: number;
};

const Footnote: FC<FootnoteProps> = ({ index }) => (
  <sup>
    <a href={`#fn-${index}`} className="text-neutral-500 no-underline">
      {index}
    </a>
  </sup>
);

export default Footnote;
