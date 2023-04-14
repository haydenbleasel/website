'use client';

import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import clsx from 'clsx';
import Input from './input';
import Textarea from './textarea';

const ContactForm: FC<{ children: ReactNode }> = ({ children }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <AlertDialogPrimitive.Root>
      <AlertDialogPrimitive.Trigger asChild>
        {children}
      </AlertDialogPrimitive.Trigger>
      <AlertDialogPrimitive.Portal>
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <AlertDialogPrimitive.Overlay
            className={clsx(
              'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in'
            )}
          />
          <AlertDialogPrimitive.Content
            className={clsx(
              'fixed z-50 grid w-full max-w-lg scale-100 gap-4 bg-white p-6 opacity-100 animate-in fade-in-90 slide-in-from-bottom-10 sm:rounded-lg sm:zoom-in-90 sm:slide-in-from-bottom-0 md:w-full',
              'dark:bg-neutral-950',
              'prose'
            )}
          >
            <div className="flex flex-col space-y-2 text-center sm:text-left">
              <AlertDialogPrimitive.Title
                className={clsx(
                  'text-lg font-semibold text-neutral-950',
                  'dark:text-neutral-50',
                  'mb-0'
                )}
              >
                Get in touch
              </AlertDialogPrimitive.Title>
              <AlertDialogPrimitive.Description
                className={clsx(
                  'text-sm text-neutral-500',
                  'dark:text-neutral-400'
                )}
              >
                I&apos;ll get back to you as soon as possible.
              </AlertDialogPrimitive.Description>
            </div>
            <div className="grid gap-4 py-4">
              <Input
                label="Name"
                value={name}
                onChangeText={setName}
                placeholder="Jane Doe"
              />
              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="
                janedoe@example.com"
              />
              <Textarea
                label="Message"
                value={message}
                onChangeText={setMessage}
                placeholder="Hi, I would like to..."
              />
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <AlertDialogPrimitive.Action
                className={clsx(
                  'inline-flex h-10 items-center justify-center rounded-md bg-neutral-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-neutral-200 dark:focus:ring-neutral-400 dark:focus:ring-offset-neutral-950'
                )}
              >
                Submit
              </AlertDialogPrimitive.Action>
              <AlertDialogPrimitive.Cancel
                className={clsx(
                  'mt-2 inline-flex h-10 items-center justify-center rounded-md border border-neutral-200 bg-transparent px-4 py-2 text-sm font-semibold text-neutral-950 transition-colors hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:focus:ring-neutral-400 dark:focus:ring-offset-neutral-950 sm:mt-0'
                )}
              >
                Cancel
              </AlertDialogPrimitive.Cancel>
            </div>
          </AlertDialogPrimitive.Content>
        </div>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
};

export default ContactForm;
