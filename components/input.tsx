import { cn } from '@/lib/utils';
import { Form } from 'radix-ui';
import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
};

export const Input = ({ label, name, className, ...props }: InputProps) => (
  <Form.Field className="grid gap-1" name={name}>
    <div className="flex items-baseline justify-between">
      <Form.Label className="inline-block select-none text-muted-foreground text-sm">
        {label}
      </Form.Label>
      <Form.Message className="text-error text-sm" match="badInput">
        Please enter a valid {name}.
      </Form.Message>
      <Form.Message className="text-error text-sm" match="patternMismatch">
        Please enter a valid {name}.
      </Form.Message>
      <Form.Message className="text-error text-sm" match="rangeOverflow">
        The {name} is high.
      </Form.Message>
      <Form.Message className="text-error text-sm" match="rangeUnderflow">
        The {name} is low.
      </Form.Message>
      <Form.Message className="text-error text-sm" match="stepMismatch">
        The {name} must be a multiple of {props.step}.
      </Form.Message>
      <Form.Message className="text-error text-sm" match="tooLong">
        The {name} must be less than {props.maxLength} characters.
      </Form.Message>
      <Form.Message className="text-error text-sm" match="tooShort">
        The {name} must be at least {props.minLength} characters.
      </Form.Message>
      <Form.Message className="text-error text-sm" match="tooLong">
        The {name} must be less than {props.maxLength} characters.
      </Form.Message>
      <Form.Message className="text-error text-sm" match="tooShort">
        The {name} must be at least {props.minLength} characters.
      </Form.Message>
      <Form.Message className="text-error text-sm" match="typeMismatch">
        {name} is not a valid {props.type}.
      </Form.Message>
      <Form.Message className="text-muted-foreground text-sm" match="valid">
        Looks good!
      </Form.Message>
      <Form.Message
        className="text-muted-foreground text-sm"
        match="valueMissing"
      >
        Please enter your {name}.
      </Form.Message>
    </div>
    <Form.Control asChild>
      <input
        className={cn(
          'w-full rounded-md bg-secondary px-3 py-2 text-foreground outline-none',
          'placeholder:text-muted-foreground',
          'sm:text-sm',
          className
        )}
        {...props}
      />
    </Form.Control>
  </Form.Field>
);
