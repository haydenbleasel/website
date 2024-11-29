'use client';

import { subscribe } from '@/app/actions/subscribe';
import { cn } from '@/lib/utils';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className={cn(
        'absolute top-0.5 right-0.5 select-none rounded-full bg-orange-500 px-6 py-2 font-medium text-sm text-white',
        'disabled:cursor-not-allowed disabled:opacity-50'
      )}
      type="submit"
      disabled={pending}
    >
      Join
    </button>
  );
};

export const Newsletter = () => {
  const [state, formAction] = useActionState(subscribe as never, {
    message: '',
  });

  return (
    <>
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
            'w-full rounded-full py-2.5 pr-[94px] pl-4 text-sm',
            'bg-neutral-100 text-neutral-950 outline-orange-500 placeholder:text-neutral-500',
            'dark:bg-neutral-900 dark:text-white dark:placeholder-text-neutral-600'
          )}
        />
        <SubmitButton />
      </form>
      {state.message ? (
        <p aria-live="polite" className="m-0 mt-4 block text-sm">
          {state.message}
        </p>
      ) : undefined}
    </>
  );
};
