import type { FC, HTMLProps } from 'react';

type HintProps = HTMLProps<HTMLParagraphElement>;

const Hint: FC<HintProps> = (props) => (
  <p className="mt-2 text-sm text-gray-500" {...props} />
);

export default Hint;