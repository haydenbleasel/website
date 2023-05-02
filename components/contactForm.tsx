'use client';

import { useState } from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import clsx from 'clsx';
import { toast } from '@/components/toaster';
import { parseError } from '@/lib/error';
import contactTypes from '@/lib/contact';
import useContactForm from '@/hooks/useContactForm';
import Select from './select';
import Textarea from './textarea';
import Input from './input';
import type { FC, FormEventHandler } from 'react';

const emailRegex = /^\S+@\S+\.\S+$/u;

const ContactForm: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState(contactTypes[0].value);
  const [sending, setSending] = useState(false);
  const { open, setOpen } = useContactForm();

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    setSending(true);

    if (!name.trim() || !email.trim() || !message.trim() || !type.trim()) {
      toast.error('Please fill out all fields');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            process.env.NEXT_PUBLIC_API_PASSPHRASE ?? ''
          }`,
        },
        body: JSON.stringify({
          name,
          email,
          message,
          type,
        }),
      });

      const data = (await response.json()) as { message: string };

      if (!response.ok) {
        throw new Error(data.message);
      }

      setName('');
      setEmail('');
      setMessage('');

      toast.success(data.message);
    } catch (error) {
      const errorMessage = parseError(error);

      toast.error(errorMessage);
    } finally {
      setSending(false);
    }
  };

  return (
    <AlertDialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <AlertDialogPrimitive.Portal>
        <form
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          onSubmit={handleSubmit}
        >
          <AlertDialogPrimitive.Overlay
            className={clsx(
              'fixed inset-0 z-50 backdrop-blur-sm transition-opacity animate-in fade-in',
              'bg-black/50',
              'dark:bg-neutral-900/50'
            )}
            onClick={() => setOpen(false)}
          />
          <AlertDialogPrimitive.Content
            className={clsx(
              'fixed z-50 grid w-full max-w-lg scale-100 gap-4 bg-white p-4 opacity-100 animate-in fade-in-90 slide-in-from-bottom-10 sm:rounded-lg sm:p-6 sm:zoom-in-90 sm:slide-in-from-bottom-0 md:w-full',
              'dark:bg-neutral-950',
              'prose'
            )}
          >
            <div className="flex flex-col space-y-2 text-center sm:text-left">
              <AlertDialogPrimitive.Title
                className={clsx(
                  'mb-0 text-lg font-semibold',
                  'text-neutral-950',
                  'dark:text-neutral-50'
                )}
              >
                Get in touch
              </AlertDialogPrimitive.Title>
              <AlertDialogPrimitive.Description
                className={clsx(
                  'text-sm',
                  'text-neutral-500',
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
                autoFocus
                required
                spellCheck
              />
              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="
                janedoe@example.com"
                pattern={emailRegex.source}
                required
              />
              <Select
                label="I would like to..."
                name="type"
                placeholder="Select a type"
                data={[
                  {
                    label: 'Types',
                    items: contactTypes,
                  },
                ]}
                value={type}
                onValueChange={setType}
                required
              />
              <Textarea
                label="Message"
                value={message}
                onChangeText={setMessage}
                placeholder="Hi, I would like to..."
                required
              />
            </div>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                className={clsx(
                  'inline-flex h-10 items-center justify-center rounded-md bg-neutral-950 px-4 py-2 text-base font-semibold text-white transition-colors hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-neutral-950 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-neutral-200 dark:focus:ring-neutral-400 dark:focus:ring-offset-neutral-950 sm:text-sm'
                )}
                type="submit"
                disabled={
                  sending ||
                  !name.trim() ||
                  !email.trim() ||
                  !message.trim() ||
                  !type.trim()
                }
              >
                {sending ? 'Sending...' : 'Send'}
              </button>
              <AlertDialogPrimitive.Cancel
                className={clsx(
                  'mt-2 inline-flex h-10 items-center justify-center rounded-md border border-neutral-200 bg-transparent px-4 py-2 text-base font-semibold text-neutral-950 transition-colors hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:focus:ring-neutral-400 dark:focus:ring-offset-neutral-950 sm:mt-0 sm:text-sm'
                )}
                disabled={sending}
              >
                Cancel
              </AlertDialogPrimitive.Cancel>
            </div>
          </AlertDialogPrimitive.Content>
        </form>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
};

export default ContactForm;
