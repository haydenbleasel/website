'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState, useFormStatus } from 'react-dom';
import { Card } from '@/components/card';
import { Input, Select, Textarea } from '@/components/form';
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
        <Select
          label="Type"
          data={[
            {
              value: 'general',
              label: 'Just saying hi!',
            },
            {
              value: 'contract',
              label: 'Contract work',
            },
            {
              value: 'advisory',
              label: 'Advisory work',
            },
            {
              value: 'agency',
              label: 'Agency introduction',
            },
          ]}
        />
        <SubmitButton />
      </form>
    </Card>
  );
};
