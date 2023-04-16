'use client';

import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import useContactForm from '@/hooks/useContactForm';
import type { FC } from 'react';

const ContactIcon: FC = () => {
  const { setOpen } = useContactForm();

  return (
    <button
      type="button"
      className={clsx(
        'rounded p-2',
        'text-neutral-500 dark:text-neutral-400',
        'hover:bg-neutral-100 dark:hover:bg-neutral-800'
      )}
      aria-label="Get in touch"
      onClick={() => setOpen(true)}
    >
      <ChatBubbleOvalLeftEllipsisIcon width={16} height={16} />
    </button>
  );
};

export default ContactIcon;
