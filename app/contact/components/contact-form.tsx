'use client';

import { Suspense, useState } from 'react';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { isValidEmail } from '@/lib/email';
import { parseError } from '@/lib/error';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  const disabled = loading || !name || !isValidEmail(email) || !message;

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
        <Label htmlFor="name">Full name</Label>
        <Input
          id="name"
          value={name}
          onChange={({ target }) => setName(target.value)}
          placeholder="Jane Smith"
          className="bg-white dark:bg-zinc-800"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          placeholder="jane@acme.com"
          className="bg-white dark:bg-zinc-800"
          pattern={emailRegex.source}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={message}
          onChange={({ target }) => setMessage(target.value)}
          placeholder="Hi there, I'm interested in..."
          className="bg-white dark:bg-zinc-800"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="type">Type</Label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger
            className="bg-white dark:bg-zinc-800"
            aria-label="Select a type"
          >
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">Just saying hi!</SelectItem>
            <SelectItem value="contract">Contract work</SelectItem>
            <SelectItem value="advisory">Advisory work</SelectItem>
            <SelectItem value="agency">Agency introduction</SelectItem>
          </SelectContent>
        </Select>
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
