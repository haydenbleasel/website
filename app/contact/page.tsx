import type { FC } from 'react';
import ContactForm from '@/components/contactForm';
import SocialLinks from '@/components/socialLinks';

const Contact: FC = () => (
  <main className="flex flex-col gap-6 prose-h2:m-0 prose-p:m-0">
    <h1>Contact</h1>
    <p>
      Get in touch using the form below, or connect with me on social media.
    </p>
    <div className="grid gap-8 sm:grid-cols-3">
      <div className="sm:col-span-2">
        <ContactForm />
      </div>
      <SocialLinks />
    </div>
  </main>
);

export default Contact;
