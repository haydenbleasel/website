import { cn } from '@/lib/utils';
import * as RadixLabel from '@radix-ui/react-label';
import type { LabelProps } from '@radix-ui/react-label';
import * as RadixSelect from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useId, useState } from 'react';
import type { ChangeEventHandler, ComponentProps, FC } from 'react';

type CustomProperties = {
  readonly label: string;
};

type InputProperties = CustomProperties & Omit<ComponentProps<'input'>, 'id'>;

const baseClassName = cn(
  'w-full px-3 py-[9px] rounded-lg border shadow-sm block text-sm transition-all leading-5',
  'outline-orange-500 bg-white border-neutral-200 text-neutral-950 placeholder:text-neutral-400',
  'dark:bg-neutral-950 dark:border-neutral-700 dark:text-white dark:placeholder:text-neutral-500'
);

const Label: FC<LabelProps> = ({ children, ...properties }) => (
  <RadixLabel.Root className="font-medium text-sm" {...properties}>
    {children}
  </RadixLabel.Root>
);

const Counter: FC<{ readonly count: number; readonly maxLength: number }> = ({
  count,
  maxLength,
}) => (
  <p className="text-right text-neutral-500 text-xs dark:text-neutral-400">
    {count}/{maxLength}
  </p>
);

export const Input: FC<InputProperties> = ({
  label,
  maxLength,
  onChange,
  ...properties
}) => {
  const id = useId();
  const [count, setCount] = useState(0);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event);
    setCount(event.target.value.length);
  };

  return (
    <fieldset className="space-y-1">
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor={id}>{label}</Label>
        {maxLength ? (
          <Counter count={count} maxLength={maxLength} />
        ) : undefined}
      </div>
      <input
        id={id}
        placeholder="Jane Doe"
        className={baseClassName}
        maxLength={maxLength}
        onChange={handleChange}
        {...properties}
      />
    </fieldset>
  );
};

type TextareaProperties = CustomProperties &
  Omit<ComponentProps<'textarea'>, 'id'>;

export const Textarea: FC<TextareaProperties> = ({
  label,
  maxLength,
  onChange,
  ...properties
}) => {
  const id = useId();
  const [count, setCount] = useState(0);

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    onChange?.(event);
    setCount(event.target.value.length);
  };

  return (
    <fieldset className="space-y-1">
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor={id}>{label}</Label>
        {maxLength ? (
          <Counter count={count} maxLength={maxLength} />
        ) : undefined}
      </div>
      <textarea
        id={id}
        placeholder="Jane Doe"
        className={cn(baseClassName, 'max-h-[15rem] min-h-[5rem] resize-y')}
        maxLength={maxLength}
        onChange={handleChange}
        {...properties}
      />
    </fieldset>
  );
};

type SelectProperties = CustomProperties &
  Omit<ComponentProps<'select'>, 'id'> & {
    readonly data: {
      readonly value: string;
      readonly label: string;
      readonly subtitle: string;
    }[];
  };

export const Select: FC<SelectProperties> = ({ label, data, name }) => {
  const id = useId();

  return (
    <fieldset className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <RadixSelect.Root name={name} defaultValue={data[0].value}>
        <RadixSelect.Trigger
          id={id}
          className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-neutral-950 text-sm shadow-sm ring-offset-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:text-white dark:ring-offset-neutral-950 dark:focus:ring-neutral-300 dark:placeholder:text-neutral-400 [&>span]:line-clamp-1"
          aria-label="Select a type"
        >
          <RadixSelect.Value placeholder="Select a type" />
          <RadixSelect.Icon asChild>
            <ChevronDownIcon className="h-4 w-4 opacity-50" />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content
            className={cn(
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-neutral-200 bg-white text-neutral-950 shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50',
              'data-[side=left]:-translate-x-1 data-[side=top]:-translate-y-1 data-[side=right]:translate-x-1 data-[side=bottom]:translate-y-1'
            )}
            position="popper"
          >
            <RadixSelect.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
              <ChevronUpIcon className="h-4 w-4" />
            </RadixSelect.ScrollUpButton>
            <RadixSelect.Viewport
              className={cn(
                'p-1',
                'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
              )}
            >
              {data.map((item) => (
                <RadixSelect.Item
                  key={item.value}
                  value={item.value}
                  className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50"
                >
                  <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                    <RadixSelect.ItemIndicator>
                      <CheckIcon className="h-4 w-4" />
                    </RadixSelect.ItemIndicator>
                  </span>
                  <RadixSelect.ItemText>{item.label}</RadixSelect.ItemText>
                  <span className="ml-2 hidden text-gray-500 sm:block dark:text-gray-400">
                    {item.subtitle}
                  </span>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
            <RadixSelect.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
              <ChevronDownIcon className="h-4 w-4" />
            </RadixSelect.ScrollDownButton>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </fieldset>
  );
};
