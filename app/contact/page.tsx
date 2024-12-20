import { Section } from '@/components/section';
import { basehub } from 'basehub';
import { Suspense } from 'react';
import { ContactForm } from './components/contact-form';
import { Hero } from './components/hero';

export const generateMetadata = async () => {
  const { contact } = await basehub().query({
    contact: {
      metadata: {
        title: true,
        description: true,
      },
    },
  });

  return {
    title: contact.metadata.title,
    description: contact.metadata.description,
  };
};

const ContactPage = () => (
  <Section className="grid divide-y border-t sm:grid-cols-2 sm:divide-x sm:divide-y-0">
    <div className="p-8">
      <Hero />
    </div>
    <div className="p-8">
      <Suspense fallback={null}>
        <ContactForm />
      </Suspense>
    </div>
  </Section>
);

export default ContactPage;
