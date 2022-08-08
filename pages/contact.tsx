import type { KeyTextField, PrismicDocumentWithUID } from '@prismicio/types';
import type { GetStaticProps } from 'next';
import type { FC, FormEventHandler } from 'react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Layout from '../components/layout';
import LoadingIcon from '../components/loadingIcon';
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
        <fieldset className="flex animate-enter flex-col gap-1 text-lg opacity-0 animation-delay-200">
          <label
            className="block text-md text-gray-500 dark:text-gray-400"
            htmlFor="name"
          >
            Name
          </label>
          <input
            ref={firstInput}
            className="w-full rounded-md border px-3 py-2 text-md text-gray-900 placeholder:text-gray-500"
            placeholder="Jane Smith"
            required
            type="text"
            id="name"
            autoFocus
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </fieldset>
        <fieldset className="flex animate-enter flex-col gap-1 text-lg opacity-0 animation-delay-300">
          <label
            className="block text-md text-gray-500 dark:text-gray-400"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full rounded-md border px-3 py-2 text-md text-gray-900 placeholder:text-gray-500"
            placeholder="jane@acme.com"
            required
            pattern={emailRegex.source}
            type="email"
            id="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </fieldset>
        <fieldset className="flex animate-enter flex-col gap-1 text-lg opacity-0 animation-delay-400">
          <label
            className="block text-md text-gray-500 dark:text-gray-400"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            className="max-h-[20rem] min-h-[8rem] w-full resize-y rounded-md border px-3 py-2 text-md text-gray-900 placeholder:text-gray-500"
            placeholder="What's on your mind?"
            required
            id="message"
            value={message}
            onChange={({ target }) => setMessage(target.value)}
          />
        </fieldset>
        <fieldset className="animate-enter opacity-0 animation-delay-500">
          <button
            type="submit"
            className="w-full rounded-md border bg-gray-900 px-3 py-2 text-md font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
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
