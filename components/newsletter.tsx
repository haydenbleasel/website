'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { subscribe } from '@/actions/subscribe';
import type { FC } from 'react';

const SubmitButton: FC = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className="absolute right-0.5 top-0.5 rounded-full bg-orange-500 text-white text-sm font-medium py-2 px-6"
      type="submit"
      disabled={pending}
    >
      Join
    </button>
  );
};

export const Newsletter: FC = () => {
  const [state, formAction] = useFormState(subscribe, {
    message: '',
  });

  return (
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
        className="bg-neutral-50 rounded-full text-sm py-2.5 pl-4 pr-[94px] w-full"
      />
      <SubmitButton />
      <p aria-live="polite">{state.message}</p>
    </form>
  );
};
