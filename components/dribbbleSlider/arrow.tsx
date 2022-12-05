import clsx from 'clsx';
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
      className={clsx(
        'select-none rounded-full border p-4 transition-all',
        'border-zinc-200 bg-white',
        'dark:border-zinc-700 dark:bg-zinc-900',
        !active && 'cursor-not-allowed opacity-50',
        active && 'hover:bg-zinc-100',
        active && 'dark:hover:bg-zinc-800'
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Previous"
      aria-controls="embla-carousel"
      aria-disabled={!active}
    >
      <Icon size={16} className="text-zinc-500 dark:text-zinc-400" />
    </div>
  );
};

export default Arrow;
