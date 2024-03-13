'use client';

import { Suspense, useState } from 'react';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import * as Select from '@radix-ui/react-select';
import * as Label from '@radix-ui/react-label';
import { parseError } from '@/lib/utils';
import { contact } from '../actions/contact';
import type { FC, FormEventHandler } from 'react';

const emailRegex = /^\S+@\S+\.\S+$/u;

const ContactFormInner: FC = () => {
  const params = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(params.get('type') ?? 'general');
  const disabled = loading || !name || !emailRegex.test(email) || !message;

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const { error } = await contact({ name, email, message, type });

      if (error) {
        throw new Error(error);
      }

      toast.success('Message sent!');

      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      const errorMessage = parseError(error);

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg space-y-4 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4"
    >
      <div className="space-y-1">
        <Label.Root htmlFor="name">Full name</Label.Root>
        <input
          id="name"
          value={name}
          onChange={({ target }) => setName(target.value)}
          placeholder="Jane Smith"
          className="bg-white dark:bg-zinc-800"
        />
      </div>
      <div className="space-y-1">
        <Label.Root htmlFor="email">Email address</Label.Root>
        <input
          id="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          placeholder="jane@acme.com"
          className="bg-white dark:bg-zinc-800"
          pattern={emailRegex.source}
        />
      </div>
      <div className="space-y-1">
        <Label.Root htmlFor="message">Message</Label.Root>
        <textarea
          id="message"
          value={message}
          onChange={({ target }) => setMessage(target.value)}
          placeholder="Hi there, I'm interested in..."
          className="bg-white dark:bg-zinc-800"
        />
      </div>
      <div className="space-y-1">
        <Label.Root htmlFor="type">Type</Label.Root>
        <Select.Root value={type} onValueChange={setType}>
          <Select.Trigger
            className="bg-white dark:bg-zinc-800"
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
      </div>
      <Button disabled={disabled} type="submit" className="w-fit">
        Send message
      </Button>
    </form>
  );
};

export const ContactForm: FC = () => (
  <Suspense>
    <ContactFormInner />
  </Suspense>
);
