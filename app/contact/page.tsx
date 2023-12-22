import { createMetadata } from '@/lib/metadata';
import { Container } from '@/components/container';
import ContactForm from './components/contact-form';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'Contact';
const description =
  "Let me know what's on your mind and I'll get back to you as soon as possible.";

export const metadata: Metadata = createMetadata({
  title,
  description,
  path: '/contact',
});

const Contact: FC = () => (
  <Container>
    <h1>{title}</h1>
    <p>{description}</p>
    <div className="mt-8">
      <ContactForm />
    </div>
  </Container>
);

export default Contact;
