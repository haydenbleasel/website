import type { ChangeEventHandler, FC, HTMLProps } from 'react';
import { useId } from 'react';
import Hint from './hint';
import Label from './label';

type InputProps = HTMLProps<HTMLInputElement> & {
  onValueChange?: (value: string) => void;
  hint?: string;
  label?: string;
};

const Input: FC<InputProps> = ({ onValueChange, hint, label, ...props }) => {
  const labelId = useId();
  const hintId = useId();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    props.onChange?.(event);
    onValueChange?.(event.target.value);
  };

  return (
    <div>
      {label && <Label htmlFor={labelId}>{label}</Label>}
      <div className="mt-1">
        <input
          id={labelId}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
          aria-describedby={hintId}
          {...props}
          onChange={handleChange}
        />
      </div>
      {hint && <Hint id={hintId}>{hint}</Hint>}
    </div>
  );
};

export default Input;
