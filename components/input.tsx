import clsx from 'clsx';
import type { ChangeEventHandler, FC, HTMLProps } from 'react';
import { useId } from 'react';
import Hint from './hint';
import Label from './label';

type InputProps = HTMLProps<HTMLInputElement> & {
  onValueChange?: (value: string) => void;
  hint?: string;
  label?: string;
};

const Input: FC<InputProps> = ({
  className,
  onValueChange,
  hint,
  label,
  ...props
}) => {
  const labelId = useId();
  const hintId = useId();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    props.onChange?.(event);
    onValueChange?.(event.target.value);
  };

  return (
    <div className={clsx('flex flex-col gap-1', className)}>
      {label && <Label htmlFor={labelId}>{label}</Label>}
      <input
        id={labelId}
        className={clsx(
          'block w-full rounded-md shadow-sm',
          'border-zinc-300 bg-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500',
          'dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-400 dark:focus:border-emerald-400 dark:focus:ring-emerald-400'
        )}
        aria-describedby={hintId}
        {...props}
        onChange={handleChange}
      />
      {hint && <Hint id={hintId}>{hint}</Hint>}
    </div>
  );
};

export default Input;
