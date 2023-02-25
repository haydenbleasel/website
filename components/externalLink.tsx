import type { FC, HTMLProps } from 'react';

const ExternalLink: FC<HTMLProps<HTMLAnchorElement>> = (props) => (
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  <a target="_blank" rel="noopener noreferrer" {...props} />
);

export default ExternalLink;
