'use client';

import useContactForm from '@/hooks/useContactForm';
import type { FC } from 'react';

const ContactButton: FC = () => {
  const { setOpen } = useContactForm();

  return (
    <button
      className="mt-4 inline-flex h-10 items-center justify-center rounded-md bg-neutral-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-neutral-950 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-neutral-200 dark:focus:ring-neutral-400 dark:focus:ring-offset-neutral-950"
      type="button"
      onClick={() => setOpen(true)}
    >
      Get in touch
    </button>
  );
};

export default ContactButton;
