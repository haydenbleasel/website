import type { ForwardRefRenderFunction, HTMLProps } from 'react';
import { forwardRef } from 'react';
import { Root } from '@radix-ui/react-label';

type TextareaProps = Omit<HTMLProps<HTMLTextAreaElement>, 'onChange'> & {
  onChange: (value: string) => void;
};

const TextareaRef: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextareaProps
> = ({ label, onChange, className = '', ...props }, ref) => (
  <div
    className={`flex animate-enter flex-col gap-1 text-lg opacity-0 ${className}`}
  >
    <Root
      className="block text-md text-neutral-500 dark:text-neutral-400"
      htmlFor={props.id}
    >
      {label}
    </Root>
    <textarea
      className="max-h-[20rem] min-h-[8rem] w-full resize-y rounded-md border px-3 py-2 text-md text-neutral-900 placeholder:text-neutral-500"
      onChange={({ target }) => onChange(target.value)}
      ref={ref}
      {...props}
    />
  </div>
);

const Textarea = forwardRef(TextareaRef);

export default Textarea;
