import type { FC } from 'react';
import ContactForm from '@/components/contactForm';
import SocialLinks from '@/components/socialLinks';

const Contact: FC = () => (
  <main className="flex flex-col gap-6 prose-p:m-0 prose-p:text-gray-500">
    <h1>Contact</h1>
    <p>
      Get in touch using the form below, or connect with me on social media.
    </p>
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <ContactForm />
      </div>
      <SocialLinks />
    </div>
  </main>
);

export default Contact;
