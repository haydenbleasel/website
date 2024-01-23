'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { isValidEmail } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { parseError } from '@/lib/error';
import { subscribe } from './subscribe';
import type { FC, FormEventHandler } from 'react';

export const MailingList: FC = () => {
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (disabled) {
      return;
    }

    setDisabled(true);

    try {
      const { error } = await subscribe(email);

      if (error) {
        throw new Error(error);
      }

      toast.success('Thanks for subscribing!');
    } catch (error) {
      const message = parseError(error);

      toast.error(message);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row sm:items-center gap-2 max-w-sm w-full"
    >
      <Input
        type="text"
        name="email"
        placeholder="you@example.com"
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        required
        className="bg-white dark:bg-zinc-800"
      />
      <Button
        type="submit"
        className="shrink-0"
        disabled={disabled || !email.trim() || !isValidEmail(email)}
      >
        {disabled ? 'Loading...' : 'Subscribe'}
      </Button>
    </form>
  );
};