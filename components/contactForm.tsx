'use client';
import type { FC, FormEventHandler } from 'react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import Textarea from '@/components/textarea';
import parseError from '@/lib/parseError';
import Input from '@/components/input';

const emailRegex = /^\S+@\S+\.\S+$/u;

const ContactForm: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const firstInput = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    setSending(true);

    if (!name.trim() || !email.trim() || !message.trim()) {
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
        }),
      });

      if (!response.ok) {
        const { error } = (await response.json()) as { error: string };

        throw new Error(error);
      }

      setName('');
      setEmail('');
      setMessage('');

      toast.success('Message sent!');
    } catch (error) {
      const errorMessage = parseError(error);

      toast.error(errorMessage);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    firstInput.current?.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Name"
        ref={firstInput}
        placeholder="Jane Smith"
        required
        type="text"
        id="name"
        autoFocus
        value={name}
        onValueChange={setName}
        errors={{
          'Please enter your name': !name.trim(),
        }}
      />
      <Input
        label="Email"
        placeholder="jane@acme.com"
        required
        type="email"
        id="email"
        value={email}
        onValueChange={setEmail}
        errors={{
          'Please enter your email address': !email.trim(),
          'Please enter a valid email address': !emailRegex.test(email),
        }}
      />
      <Textarea
        label="Message"
        placeholder="What's on your mind"
        required
        id="message"
        value={message}
        onValueChange={setMessage}
        errors={{
          'Please enter a message': !message.trim(),
        }}
      />
      <button
        type="submit"
        className="w-full rounded-md border border-none bg-neutral-900 px-3 py-2 text-md font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        disabled={
          !name.trim() ||
          !email.trim() ||
          !message.trim() ||
          sending ||
          !emailRegex.exec(email)
        }
      >
        {sending ? (
          <span className="mx-auto flex h-[28px] w-[28px] items-center justify-center">
            <Loader2 className="animate-spin" />
          </span>
        ) : (
          'Send'
        )}
      </button>
    </form>
  );
};

export default ContactForm;
