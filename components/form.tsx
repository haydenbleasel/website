import { useId } from 'react';
import * as RadixLabel from '@radix-ui/react-label';
import { cn } from '@/lib/utils';
import type { LabelProps } from '@radix-ui/react-label';
import type { ComponentProps, FC } from 'react';

type CustomProps = {
  readonly label: string;
};

type InputProps = CustomProps & Omit<ComponentProps<'input'>, 'id'>;

const baseClassName = cn(
  'w-full px-3 py-2 rounded-lg border shadow-sm block text-sm',
  'bg-white border-neutral-200 text-neutral-950 placeholder:text-neutral-400'
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
