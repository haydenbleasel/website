import { Section } from '@/components/section';
import { basehub } from 'basehub';
import { Suspense } from 'react';
import Balancer from 'react-wrap-balancer';
import { ContactForm } from './components/contact-form';

export const generateMetadata = async () => {
  const { contact } = await basehub({ cache: 'no-store' }).query({
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
      <h1 className="font-bold text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl">
        <Balancer>Let&apos;s talk about your next project.</Balancer>
      </h1>
    </div>
    <div className="p-8">
      <Suspense fallback={null}>
        <ContactForm />
      </Suspense>
    </div>
  </Section>
);

export default ContactPage;
