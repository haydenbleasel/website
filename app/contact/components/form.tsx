'use client';

import { contact } from '@/app/actions/contact';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';
import { cn } from '@/lib/utils';
import { ArrowRightIcon, Loader2Icon } from 'lucide-react';
import { Form } from 'radix-ui';
import { useActionState } from 'react';
import { toast } from 'sonner';

const initialState = {
  message: '',
  error: '',
};

export const emailRegex = /.+@.+/u;

export const ContactForm = () => {
  const [state, formAction, isPending] = useActionState(contact, initialState);

  if (state.error) {
    toast.error(state.error);
  }
  if (state.message) {
    toast.success(state.message);
  }

  return (
    <Form.Root action={formAction} className="grid w-full gap-6">
      <Input
        label="Name"
        name="name"
        placeholder="Jane Doe"
        required
        maxLength={256}
      />
      <Input
        label="Email address"
        name="email"
        placeholder="jane@example.com"
        pattern={emailRegex.source}
        required
        maxLength={256}
      />
      <Textarea
        label="Message"
        name="message"
        placeholder="Hi there! I wanted to reach out to you about..."
        required
        maxLength={1000}
      />

      <Form.Submit asChild>
        <button
          type="submit"
          disabled={isPending}
          className={cn(
            'flex w-fit cursor-pointer select-none items-center justify-center gap-2 rounded-md bg-foreground px-3 py-2 text-background text-sm',
            'disabled:cursor-not-allowed disabled:opacity-50'
          )}
        >
          {isPending ? (
            <div className="flex h-5 w-5 items-center justify-center">
              <Loader2Icon className="h-4 w-4 animate-spin" />
            </div>
          ) : (
            <>
              Send message
              <ArrowRightIcon className="h-4 w-4" />
            </>
          )}
        </button>
      </Form.Submit>
    </Form.Root>
  );
};
