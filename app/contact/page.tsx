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
  <Section className="grid grid-cols-2 gap-8 divide-x border-t">
    <div className="p-8">
      <h1 className="font-bold text-5xl leading-tight tracking-tight">
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
