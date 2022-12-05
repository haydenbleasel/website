import type { FC } from 'react';
import ContactForm from '@/components/contactForm';

const Contact: FC = () => (
  <main className="flex flex-col gap-6">
    <h1>Get in touch</h1>
    <ContactForm />
  </main>
);

export default Contact;
