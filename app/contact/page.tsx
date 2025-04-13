import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ContactForm } from './components/form';

const title = 'Contact';
const description = "Let's chat.";

export const metadata: Metadata = createMetadata({
  title,
  description,
  ogText: 'Want to chat about something? Get in touch.',
});

const Contact = () => (
  <>
    <Section className="gap-0">
      <h1>{title}</h1>
      <p className="text-foreground-lighter">{description}</p>
    </Section>
    <Section delay={0.2}>
      <Suspense fallback={null}>
        <ContactForm />
      </Suspense>
    </Section>
  </>
);

export default Contact;
