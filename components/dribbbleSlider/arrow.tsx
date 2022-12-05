import type { LucideProps } from 'lucide-react';
import type { FC, KeyboardEventHandler } from 'react';

type ArrowProps = {
  icon: FC<LucideProps>;
  active: boolean;
  handleClick: () => void;
};

const Arrow: FC<ArrowProps> = ({ icon: Icon, active, handleClick }) => {
  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`select-none rounded-full border border-gray-200 p-4 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800 ${
        active ? '' : 'cursor-not-allowed opacity-50'
      }`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Previous"
      aria-controls="embla-carousel"
      aria-disabled={!active}
    >
      <Icon size={16} className="text-gray-500 dark:text-gray-400" />
    </div>
  );
};

export default Arrow;
