'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Card } from '@/components/card';
import { Input, Select, Textarea } from '@/components/form';
import { cn } from '@/lib/utils';
import { contact } from '../actions/contact';
import type { FC } from 'react';

const SubmitButton: FC = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className={cn(
        'bg-orange-500 text-white rounded-lg px-6 py-2.5 text-sm font-medium'
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

  return (
    <Card title="Get in touch">
      <form action={formAction} className="w-full space-y-4 p-4">
        <Input label="Full name" placeholder="Jane Doe" name="name" required />
        <Input
          label="Email address"
          type="email"
          name="email"
          placeholder="jane@example.com"
          required
        />
        <Textarea
          label="Message"
          name="message"
          placeholder="Hi there! I wanted to reach out to you about..."
          required
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
        <output aria-live="polite" className="sr-only">
          {state.message}
        </output>
      </form>
    </Card>
  );
};
