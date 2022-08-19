import type { KeyTextField, PrismicDocumentWithUID } from '@prismicio/types';
import type { GetStaticProps } from 'next';
import type { FC, FormEventHandler } from 'react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Input from '../components/input';
import Layout from '../components/layout';
import LoadingIcon from '../components/loadingIcon';
import Textarea from '../components/textarea';
import { getPage } from '../utils/prismic';

type ContactProps = {
  data: {
    title: KeyTextField;
    description: KeyTextField;
  };
};

const emailRegex = /^\S+@\S+\.\S+$/u;

const Contact: FC<ContactProps> = ({ data }) => {
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
      const errorMessage =
        error instanceof Error ? error.message : (error as string);

      toast.error(errorMessage);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    firstInput.current?.focus();
  }, []);

  return (
    <Layout title={data.title} description={data.description}>
      <p className="animate-enter text-lg opacity-0 animation-delay-100">
        {data.description}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Name"
          className="animation-delay-200"
          ref={firstInput}
          placeholder="Jane Smith"
          required
          type="text"
          id="name"
          autoFocus
          value={name}
          onChange={setName}
        />
        <Input
          label="Email"
          className="animation-delay-300"
          placeholder="jane@acme.com"
          required
          type="email"
          id="email"
          value={email}
          onChange={setEmail}
        />
        <Textarea
          label="Message"
          className="animation-delay-300"
          placeholder="What's on your mind"
          required
          id="message"
          value={message}
          onChange={setMessage}
        />
        <fieldset className="animate-enter opacity-0 animation-delay-500">
          <button
            type="submit"
            className="w-full rounded-md border bg-neutral-900 px-3 py-2 text-md font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
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
                <LoadingIcon />
              </span>
            ) : (
              'Send'
            )}
          </button>
        </fieldset>
      </form>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const { data } = (await getPage(
    { previewData },
    'contact'
  )) as PrismicDocumentWithUID;

  return {
    props: {
      data,
    },
  };
};

export default Contact;
