import type { ForwardRefRenderFunction, HTMLProps } from 'react';
import { forwardRef } from 'react';
import { Root } from '@radix-ui/react-label';

type InputProps = Omit<HTMLProps<HTMLInputElement>, 'onChange'> & {
  onChange: (value: string) => void;
};

const InputRef: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, onChange, className = '', ...props },
  ref
) => (
  <div
    className={`flex animate-enter flex-col gap-1 text-lg opacity-0 ${className}`}
  >
    <Root
      className="block text-sm font-medium text-neutral-600 dark:text-neutral-400"
      htmlFor={props.id}
    >
      {label}
    </Root>
    <input
      className="w-full rounded-sm border px-3 py-2 text-md text-neutral-900 outline-neutral-900 placeholder:text-neutral-500"
      onChange={({ target }) => onChange(target.value)}
      ref={ref}
      {...props}
    />
  </div>
);

const Input = forwardRef(InputRef);

export default Input;
