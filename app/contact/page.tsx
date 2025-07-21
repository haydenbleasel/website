import { env } from '@/lib/env';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { ReCaptchaProvider } from 'next-recaptcha-v3';
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
  <ReCaptchaProvider reCaptchaKey={env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
    <div className="gap-0">
      <h1>{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
    <div>
      <Suspense fallback={null}>
        <ContactForm />
      </Suspense>
    </div>
  </ReCaptchaProvider>
);

export default Contact;
