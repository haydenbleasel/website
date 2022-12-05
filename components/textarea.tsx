import clsx from 'clsx';
import type { ChangeEventHandler, FC, HTMLProps } from 'react';
import { useId } from 'react';
import Hint from './hint';
import Label from './label';

type TextAreaProps = HTMLProps<HTMLTextAreaElement> & {
  onValueChange?: (value: string) => void;
  hint?: string;
  label?: string;
};

const TextArea: FC<TextAreaProps> = ({
  onValueChange,
  hint,
  label,
  ...props
}) => {
  const labelId = useId();
  const hintId = useId();

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    props.onChange?.(event);
    onValueChange?.(event.target.value);
  };

  return (
    <div>
      {label && <Label htmlFor={labelId}>{label}</Label>}
      <div className="mt-1">
        <textarea
          id={labelId}
          className={clsx(
            'block w-full rounded-md shadow-sm',
            'border-zinc-300 bg-white placeholder:text-zinc-500 focus:border-teal-500 focus:ring-teal-500',
            'dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-400 dark:focus:border-teal-400 dark:focus:ring-teal-400'
          )}
          aria-describedby={hintId}
          {...props}
          onChange={handleChange}
        />
      </div>
      {hint && <Hint id={hintId}>{hint}</Hint>}
    </div>
  );
};

export default TextArea;
