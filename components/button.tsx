import clsx from 'clsx';
import type { ButtonHTMLAttributes, FC, HTMLProps, ReactNode } from 'react';
import { LoaderIcon } from 'react-hot-toast';
import ExternalLink from './externalLink';

type ButtonProps = {
  loading?: boolean;
  children: ReactNode;
} & (ButtonHTMLAttributes<HTMLButtonElement> | HTMLProps<HTMLAnchorElement>);

const ButtonInner: FC<Pick<ButtonProps, 'children' | 'loading'>> = ({
  children,
  loading,
}) =>
  loading ? (
    <span className="mx-auto flex h-[28px] w-[28px] items-center justify-center">
      <LoaderIcon className="animate-spin" />
    </span>
  ) : (
    <span>{children}</span>
  );

const buttonClassName = clsx(
  'inline-block no-underline text-md rounded-md border border-none px-3 py-[7px] font-medium disabled:cursor-not-allowed disabled:opacity-50',
  'bg-neutral-900 text-white',
  'dark:bg-white dark:text-neutral-900'
);

const Button: FC<ButtonProps> = ({ children, loading = false, ...props }) =>
  'href' in props ? (
    <ExternalLink
      className={buttonClassName}
      {...(props as HTMLProps<HTMLAnchorElement>)}
    >
      <ButtonInner loading={loading}>{children}</ButtonInner>
    </ExternalLink>
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
