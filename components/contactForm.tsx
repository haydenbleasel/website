'use client';
import type { FC, FormEventHandler } from 'react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Button from './button';
import ButtonGroup from './buttonGroup';
import Select from './select';
import Textarea from '@/components/textarea';
import parseError from '@/lib/parseError';
import Input from '@/components/input';

const emailRegex = /^\S+@\S+\.\S+$/u;
const budgetOptions = [
  { label: '< $10K', value: 'low' },
  { label: '$10K - $25K', value: 'medium' },
  { label: '$25K - $50K', value: 'high' },
  { label: '> $50K', value: 'super-high' },
];

const ContactForm: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [type, setType] = useState<string>('contact');
  const [project, setProject] = useState('');
  const [budget, setBudget] = useState<typeof budgetOptions[number]['value']>(
    budgetOptions[1].value
  );
  const firstInput = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    setSending(true);

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill out all fields');
      return;
    }

    if (type === 'freelance' && !project.trim()) {
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
          ...(type === 'freelance' && {
            project,
            budget: budgetOptions.find((option) => option.value === budget)
              ?.label,
          }),
        }),
      });

      if (!response.ok) {
        const { error } = (await response.json()) as { error: string };

        throw new Error(error);
      }

      setName('');
      setEmail('');
      setMessage('');
      setProject('');

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
      <div>
        <ButtonGroup
          label="I would like to..."
          options={[
            { label: 'Have a chat', value: 'contact' },
            { label: 'Hire you for freelance work', value: 'freelance' },
          ]}
          value={type}
          onChangeValue={setType}
        />
      </div>
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
        placeholder="What's on your mind?"
        required
        id="message"
        value={message}
        onValueChange={setMessage}
      />
      {type === 'freelance' && (
        <>
          <Textarea
            label="Project"
            placeholder="Tell me about your project..."
            required
            id="project"
            value={project}
            onValueChange={setProject}
          />
          <Select
            label="Budget"
            options={budgetOptions}
            selected={budget}
            onChangeSelected={setBudget}
          />
        </>
      )}
      <Button
        type="submit"
        disabled={
          !name.trim() ||
          !email.trim() ||
          !message.trim() ||
          sending ||
          !emailRegex.exec(email) ||
          (type === 'freelance' && !project.trim())
        }
        loading={sending}
      >
        Send
      </Button>
    </form>
  );
};

export default ContactForm;
