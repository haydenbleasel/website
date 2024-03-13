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
  <main className="px-4 py-16 sm:py-32">
    <div className="space-y-12 prose prose-neutral prose-orange mx-auto">
      <header className="space-y-2">
        <h1 className="text-3xl m-0">{title}</h1>
        <p className="m-0 text-lg">{description}</p>
      </header>
      <div className="mt-8 grid gap-8 not-prose">
        <ContactForm />
      </div>
    </div>
  </main>
);

export default Contact;
