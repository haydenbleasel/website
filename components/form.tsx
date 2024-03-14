import { useId } from 'react';
import * as RadixLabel from '@radix-ui/react-label';
import * as RadixSelect from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LabelProps } from '@radix-ui/react-label';
import type { ComponentProps, FC } from 'react';

type CustomProps = {
  readonly label: string;
};

type InputProps = CustomProps & Omit<ComponentProps<'input'>, 'id'>;

const baseClassName = cn(
  'w-full px-3 py-[9px] rounded-lg border shadow-sm block text-sm transition-all leading-5',
  'outline-orange-500 bg-white border-neutral-200 text-neutral-950 placeholder:text-neutral-400'
);

const Label: FC<LabelProps> = ({ children, ...props }) => (
  <RadixLabel.Root className="text-sm font-medium" {...props}>
    {children}
  </RadixLabel.Root>
);

export const Input: FC<InputProps> = ({ label, ...props }) => {
  const id = useId();

  return (
    <fieldset className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        placeholder="Jane Doe"
        className={baseClassName}
        {...props}
      />
    </fieldset>
  );
};

type TextareaProps = CustomProps & Omit<ComponentProps<'textarea'>, 'id'>;

export const Textarea: FC<TextareaProps> = ({ label, ...props }) => {
  const id = useId();

  return (
    <fieldset className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <textarea
        id={id}
        placeholder="Jane Doe"
        className={cn(baseClassName, 'resize-y min-h-[5rem] max-h-[15rem]')}
        {...props}
      />
    </fieldset>
  );
};

type SelectProps = CustomProps &
  Omit<ComponentProps<'select'>, 'id'> & {
    readonly data: {
      readonly value: string;
      readonly label: string;
    }[];
  };

export const Select: FC<SelectProps> = ({ label, data }) => {
  const id = useId();

  return (
    <fieldset className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <RadixSelect.Root name="type">
        <RadixSelect.Trigger
          id={id}
          className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-gray-800 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus:ring-gray-300"
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
              'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white text-gray-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50',
              'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1'
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
                  className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                >
                  <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                    <RadixSelect.ItemIndicator>
                      <CheckIcon className="h-4 w-4" />
                    </RadixSelect.ItemIndicator>
                  </span>
                  <RadixSelect.ItemText>{item.label}</RadixSelect.ItemText>
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
