import { useId } from 'react';
import * as RadixLabel from '@radix-ui/react-label';
import * as RadixSelect from '@radix-ui/react-select';
import { cn } from '@/lib/utils';
import type { LabelProps } from '@radix-ui/react-label';
import type { ComponentProps, FC } from 'react';

type CustomProps = {
  readonly label: string;
};

type InputProps = CustomProps & Omit<ComponentProps<'input'>, 'id'>;

const baseClassName = cn(
  'w-full px-3 py-2 rounded-lg border shadow-sm block text-sm transition-all',
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

type SelectProps = CustomProps & Omit<ComponentProps<'select'>, 'id'>;

export const Select: FC<SelectProps> = ({ label }) => {
  const id = useId();

  return (
    <fieldset className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <RadixSelect.Root value="" onValueChange={() => {}}>
        <RadixSelect.Trigger
          id={id}
          className={cn(
            'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
          )}
          aria-label="Select a type"
        >
          <RadixSelect.Value placeholder="Select a type" />
        </RadixSelect.Trigger>
        <RadixSelect.Content>
          <RadixSelect.Item value="general">Just saying hi!</RadixSelect.Item>
          <RadixSelect.Item value="contract">Contract work</RadixSelect.Item>
          <RadixSelect.Item value="advisory">Advisory work</RadixSelect.Item>
          <RadixSelect.Item value="agency">
            Agency introduction
          </RadixSelect.Item>
        </RadixSelect.Content>
      </RadixSelect.Root>
    </fieldset>
  );
};
