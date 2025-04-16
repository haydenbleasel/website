'use client';

import { contact } from '@/app/actions/contact';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';
import { cn } from '@/lib/utils';
import { ArrowRightIcon, Loader2Icon } from 'lucide-react';
import { useReCaptcha } from 'next-recaptcha-v3';
import { Form } from 'radix-ui';
import { type FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

export const emailRegex = /.+@.+/u;

export const ContactForm = () => {
  const { executeRecaptcha } = useReCaptcha();
  const [loading, setLoading] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const token = await executeRecaptcha('form_submit');
      const form = event.target;

      if (!(form instanceof HTMLFormElement)) {
        toast.error('Form is not an HTMLFormElement');
        return;
      }

      const formData = new FormData(form);

      formData.append('token', token);

      const response = await contact(formData);

      if (response.error) {
        throw new Error(response.error);
      }

      toast.success(response.message);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'An error occurred while sending the message';

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form.Root onSubmit={handleSubmit} className="grid w-full gap-6">
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
      <div className="hidden">
        <Input
          label="Subject"
          name="subject"
          placeholder="I want to know more about your services"
          maxLength={256}
        />
      </div>
      <Form.Submit asChild>
        <button
          type="submit"
          disabled={loading}
          className={cn(
            'flex w-fit cursor-pointer select-none items-center justify-center gap-2 rounded-md bg-foreground px-3 py-2 text-background text-sm',
            'disabled:cursor-not-allowed disabled:opacity-50'
          )}
        >
          {loading ? (
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
