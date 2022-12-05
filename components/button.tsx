import clsx from 'clsx';
import { Loader2 } from 'lucide-react';
import type { ButtonHTMLAttributes, FC } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: FC<ButtonProps> = ({ children, loading = false, ...props }) => (
  // eslint-disable-next-line react/button-has-type
  <button
    className={clsx(
      'text-md w-full rounded-md border border-none px-3 py-2 font-medium disabled:cursor-not-allowed disabled:opacity-50',
      'bg-zinc-900 text-white',
      'dark:bg-white dark:text-zinc-900'
    )}
    {...props}
  >
    {loading ? (
      <span className="mx-auto flex h-[28px] w-[28px] items-center justify-center">
        <Loader2 className="animate-spin" />
      </span>
    ) : (
      children
    )}
  </button>
);

export default Button;
