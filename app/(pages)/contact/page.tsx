import { Header } from '@/components/header';
import type { Metadata } from 'next';
import type { FC } from 'react';
import { ContactForm } from './components/contact-form';

const title = 'Contact';
const description =
  "Let me know what's on your mind and I'll get back to you as soon as possible.";

export const runtime = 'nodejs';

export const metadata: Metadata = {
  title,
  description,
};

const Contact: FC = () => (
  <>
    <Header title={title} description={description} />
    <div className="not-prose mt-8 grid gap-8">
      <ContactForm />
    </div>
  </>
);

export default Contact;
