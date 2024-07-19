'use client';

import { Card } from '@/components/card';
import { Input, Select, Textarea } from '@/components/form';
import { cn } from '@/lib/utils';
import type { FC } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { contact } from '../actions/contact';

const SubmitButton: FC = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className={cn(
        'bg-orange-500 text-white rounded-lg px-6 py-2.5 text-sm font-medium',
        'disabled:opacity-50 disabled:cursor-not-allowed'
      )}
    >
      Send message
    </button>
  );
};

const typeOptions = [
  {
    value: 'general',
    label: 'General inquiry',
    subtitle: 'I have a job offer / question / feedback.',
  },
  {
    value: 'contract',
    label: 'Contract work',
    subtitle: 'I want to hire you for a project.',
  },
  {
    value: 'advisory',
    label: 'Advisory work',
    subtitle: 'Can you join my board or be an advisor?',
  },
  {
    value: 'agency',
    label: 'Agency introduction',
    subtitle: "I'm looking for an good design / dev agency.",
  },
];

export const ContactForm: FC = () => {
  const [state, formAction] = useFormState(contact as never, {
    message: '',
  });

  return (
    <Card title="Get in touch">
      <form action={formAction} className="w-full space-y-4 p-4">
        <Input
          label="Full name"
          placeholder="Jane Doe"
          name="name"
          required
          maxLength={180}
        />
        <Input
          label="Email address"
          type="email"
          name="email"
          placeholder="jane@example.com"
          required
          maxLength={180}
        />
        <Textarea
          label="Message"
          name="message"
          placeholder="Hi there! I wanted to reach out to you about..."
          required
          maxLength={1000}
        />
        <Select label="Type" name="type" data={typeOptions} />
        <SubmitButton />
        <output aria-live="polite" className="text-sm block">
          {state.message}
        </output>
      </form>
    </Card>
  );
};
