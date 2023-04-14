import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';
import { useId, forwardRef } from 'react';
import Label from './label';
import Hint from './hint';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  onChangeText?: (value: string) => void;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, onChangeText, ...props }, ref) => {
    const id = useId();

    const handleChange: InputHTMLAttributes<HTMLInputElement>['onChange'] = (
      event
    ) => {
      props.onChange?.(event);
      onChangeText?.(event.target.value);
    };

    return (
      <div className="grid w-full items-center gap-1.5">
        {props.label && <Label htmlFor={id}>{props.label}</Label>}
        <input
          id={id}
          className={clsx(
            'flex h-10 w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-50 dark:focus:ring-neutral-400 dark:focus:ring-offset-neutral-900',
            className
          )}
          ref={ref}
          onChange={handleChange}
          {...props}
        />
        {props.hint && <Hint>{props.hint}</Hint>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export default Input;
