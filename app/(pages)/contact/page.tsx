import { Header } from '@/components/header';
import { ContactForm } from './components/contact-form';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'Contact';
const description =
  "Let me know what's on your mind and I'll get back to you as soon as possible.";

export const metadata: Metadata = {
  title,
  description,
};

const Contact: FC = () => (
  <>
    <Header title={title} description={description} />
    <div className="mt-8 grid gap-8 not-prose">
      <ContactForm />
    </div>
  </>
);

export default Contact;
