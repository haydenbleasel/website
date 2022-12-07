import clsx from 'clsx';
import { Loader2 } from 'lucide-react';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type { ButtonHTMLAttributes, FC, HTMLProps, ReactNode } from 'react';

type ButtonProps = {
  loading?: boolean;
  children: ReactNode;
} & (
  | ButtonHTMLAttributes<HTMLButtonElement>
  | (LinkProps & HTMLProps<HTMLAnchorElement>)
);

const ButtonInner: FC<Pick<ButtonProps, 'children' | 'loading'>> = ({
  children,
  loading,
}) =>
  loading ? (
    <span className="mx-auto flex h-[28px] w-[28px] items-center justify-center">
      <Loader2 className="animate-spin" />
    </span>
  ) : (
    <span>{children}</span>
  );

const buttonClassName = clsx(
  'inline-block no-underline text-md rounded-md border border-none px-3 py-2 font-medium disabled:cursor-not-allowed disabled:opacity-50',
  'bg-zinc-900 text-white',
  'dark:bg-white dark:text-zinc-900'
);

const Button: FC<ButtonProps> = ({ children, loading = false, ...props }) =>
  'href' in props ? (
    <Link className={buttonClassName} {...(props as LinkProps)}>
      <ButtonInner loading={loading}>{children}</ButtonInner>
    </Link>
  ) : (
    // eslint-disable-next-line react/button-has-type
    <button
      className={buttonClassName}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      <ButtonInner loading={loading}>{children}</ButtonInner>
    </button>
  );

export default Button;
