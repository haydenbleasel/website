import type { FC } from 'react';
import LoadingIcon from './loadingIcon';

type PlaceholderProps = {
  className?: string;
};

const Placeholder: FC<PlaceholderProps> = ({ className }) => (
  <span
    className={`flex items-center justify-center bg-gray-50 dark:bg-gray-800 ${
      className ?? ''
    }`}
  >
    <LoadingIcon />
  </span>
);

export default Placeholder;
