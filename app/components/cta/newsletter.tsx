'use client';

import { subscribe } from '@/app/actions/subscribe';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
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
      <form action={formAction}>
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
        />
        <SubmitButton />
      </form>
      {state.message ? <p aria-live="polite">{state.message}</p> : undefined}
    </>
  );
};
