'use client';

import { subscribe } from '@/app/actions/subscribe';
import { Input } from '@/components/input';
import { ArrowRightIcon, Loader2Icon } from 'lucide-react';
import { Form } from 'radix-ui';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

const initialState = {
  message: '',
  error: '',
};

export const emailRegex = /.+@.+/u;

export const MailingList = () => {
  const [state, formAction, isPending] = useActionState(
    subscribe,
    initialState
  );

  useEffect(() => {
    if (state.message) {
      toast.success(state.message);
    }
  }, [state.message]);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state.error]);

  return (
    <Form.Root action={formAction} className="relative my-3">
      <Input
        id="email"
        label="Email address"
        name="email"
        type="email"
        placeholder="jane@acme.com"
        pattern={emailRegex.source}
        className="pr-8"
        required
      />

      <Form.Submit asChild>
        <button
          type="submit"
          className="absolute right-0 bottom-0 flex aspect-square size-9 cursor-pointer items-center justify-center rounded-full"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2Icon size={16} className="animate-spin" />
          ) : (
            <ArrowRightIcon size={16} />
          )}
        </button>
      </Form.Submit>
    </Form.Root>
  );
};
