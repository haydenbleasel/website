'use client';
import type { FC, FormEventHandler } from 'react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Button from './button';
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
      />
      <Input
        label="Email"
        placeholder="jane@acme.com"
        required
        type="email"
        id="email"
        value={email}
        onValueChange={setEmail}
      />
      <Textarea
        label="Message"
        placeholder="What's on your mind"
        required
        id="message"
        value={message}
        onValueChange={setMessage}
      />
      <Button
        type="submit"
        disabled={
          !name.trim() ||
          !email.trim() ||
          !message.trim() ||
          sending ||
          !emailRegex.exec(email)
        }
        loading={sending}
      >
        Send
      </Button>
    </form>
  );
};

export default ContactForm;
