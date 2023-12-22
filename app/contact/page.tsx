import { createMetadata } from '@/lib/metadata';
import { Container } from '@/components/container';
import ContactForm from './components/contact-form';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'Contact';
const description =
  "Let us know what's on your mind. We'll get back to you as soon as possible.";

export const metadata: Metadata = createMetadata({
  title,
  description,
  path: '/contact',
});

const Contact: FC = () => (
  <Container>
    <div className="space-y-1">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
        {title}
      </h1>
      <p className="mt-2 max-w-[750px] text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
        {description}
      </p>
    </div>
    <ContactForm />
  </Container>
);

export default Contact;
