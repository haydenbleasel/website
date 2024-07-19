'use client';

import { subscribe } from '@/actions/subscribe';
import { cn } from '@/lib/utils';
import type { FC } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

const SubmitButton: FC = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className={cn(
        'absolute right-0.5 top-0.5 rounded-full bg-orange-500 text-white text-sm font-medium py-2 px-6 select-none',
        'disabled:opacity-50 disabled:cursor-not-allowed'
      )}
      type="submit"
      disabled={pending}
    >
      Join
    </button>
  );
};

export const Newsletter: FC = () => {
  const [state, formAction] = useFormState(subscribe as never, {
    message: '',
  });

  return (
    <div className="space-y-2">
      <p className="mb-0">
        Join 2200+ readers and get infrequent updates on new projects.
      </p>
      <form action={formAction} className="relative max-w-96">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          aria-label="Email"
          id="email"
          name="email"
          type="email"
          placeholder="jane@acme.com"
          pattern=".+@.+\..+"
          required
          className={cn(
            'rounded-full text-sm py-2.5 pl-4 pr-[94px] w-full',
            'bg-neutral-100 text-neutral-950 placeholder:text-neutral-500 outline-orange-500',
            'dark:bg-neutral-900 dark:text-white dark:placeholder-text-neutral-600'
          )}
        />
        <SubmitButton />
      </form>
      {state.message ? (
        <p aria-live="polite" className="mt-4 text-sm block m-0">
          {state.message}
        </p>
      ) : undefined}
    </div>
  );
};
