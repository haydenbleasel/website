import type { ForwardRefRenderFunction, HTMLProps } from 'react';
import { forwardRef } from 'react';
import { Root } from '@radix-ui/react-label';

type TextareaProps = Omit<HTMLProps<HTMLTextAreaElement>, 'onChange'> & {
  onChange: (value: string) => void;
  errors?: Record<string, boolean>;
};

const TextareaRef: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextareaProps
> = ({ label, onChange, className = '', errors, ...props }, ref) => (
  <div
    className={`flex animate-enter flex-col gap-1 text-lg opacity-0 ${className}`}
  >
    <div className="flex items-center justify-between">
      <Root
        className="block text-sm font-medium text-neutral-500 dark:text-neutral-400"
        htmlFor={props.id}
      >
        {label}
      </Root>
      {props.value && errors && Object.keys(errors).length > 0 && (
        <div className="text-sm font-medium text-red-500 dark:text-red-400">
          {Object.keys(errors).map(
            (error) => errors[error] && <div key={error}>{error}</div>
          )}
        </div>
      )}
    </div>
    <textarea
      className="max-h-[20rem] min-h-[8rem] w-full resize-y rounded-sm border border-neutral-200 bg-transparent px-3 py-2 text-md text-neutral-900 outline-neutral-900 placeholder:text-neutral-500 dark:border-neutral-700"
      onChange={({ target }) => onChange(target.value)}
      ref={ref}
      {...props}
    />
  </div>
);

const Textarea = forwardRef(TextareaRef);

export default Textarea;
