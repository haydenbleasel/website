import clsx from 'clsx';
import type { FC } from 'react';
import { useId } from 'react';
import Label from './label';

type ButtonGroupProps = {
  options: {
    label: string;
    value: string;
  }[];
  value: string;
  label?: string;
  onChangeValue: (value: string) => void;
};

const ButtonGroup: FC<ButtonGroupProps> = ({
  options,
  value,
  onChangeValue,
  label,
}) => {
  const id = useId();

  return (
    <div className="inline-flex flex-col gap-1">
      {label && <Label htmlFor={id}>{label}</Label>}
      <span className="isolate inline-flex rounded-md shadow-sm">
        {options.map((item, index) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onChangeValue(item.value)}
            className={clsx(
              'relative inline-flex items-center border px-4 py-2 text-sm font-medium transition-colors focus:z-10 focus:outline-none focus:ring-1',
              value === item.value
                ? 'border-teal-500 bg-teal-500 text-white hover:bg-teal-600'
                : 'border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50',
              value !== item.value &&
                'dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800',
              !index && 'rounded-l-md',
              index === options.length - 1 && 'rounded-r-md',
              Boolean(index) && '-ml-px',
              'focus:border-teal-500 focus:ring-teal-500',
              'dark:focus:border-teal-400 dark:focus:ring-teal-400'
            )}
          >
            {item.label}
          </button>
        ))}
      </span>
    </div>
  );
};

export default ButtonGroup;
