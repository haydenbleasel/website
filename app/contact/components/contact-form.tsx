'use client';

import * as Select from '@radix-ui/react-select';
import * as Label from '@radix-ui/react-label';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState, useFormStatus } from 'react-dom';
import { Card } from '@/components/card';
import { Input, Textarea } from '@/components/form';
import { cn } from '@/lib/utils';
import { contact } from '../actions/contact';
import type { FC } from 'react';

const formSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  message: z.string().min(1).max(1000),
  type: z.enum(['general', 'contract', 'advisory', 'agency']),
});

const SubmitButton: FC = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className={cn(
        'bg-orange-500 text-white rounded-lg px-6 py-3 text-sm font-medium'
      )}
    >
      Send message
    </button>
  );
};

export const ContactForm: FC = () => {
  const [state, formAction] = useFormState(contact, {
    message: '',
  });
  const { register, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      type: 'general',
    },
  });

  return (
    <Card title="Get in touch">
      <form
        onSubmit={handleSubmit(formAction)}
        className="w-full space-y-4 p-4"
      >
        <Input label="Full name" {...register('name')} placeholder="Jane Doe" />
        <Input
          label="Email address"
          {...register('email')}
          placeholder="jane@example.com"
        />
        <Textarea
          label="Message"
          {...register('message')}
          placeholder="Hi there! I wanted to reach out to you about..."
        />
        <fieldset className="space-y-1">
          <Label.Root htmlFor="type">Type</Label.Root>
          <Select.Root value="" onValueChange={() => {}}>
            <Select.Trigger
              className="bg-white dark:bg-neutral-900"
              aria-label="Select a type"
            >
              <Select.Value placeholder="Select a type" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="general">Just saying hi!</Select.Item>
              <Select.Item value="contract">Contract work</Select.Item>
              <Select.Item value="advisory">Advisory work</Select.Item>
              <Select.Item value="agency">Agency introduction</Select.Item>
            </Select.Content>
          </Select.Root>
        </fieldset>
        <SubmitButton />
      </form>
    </Card>
  );
};
