import { env } from '@/lib/env';
import { social } from '@/lib/social';
import type { Person, WithContext } from 'schema-dts';

const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
const baseUrl = `${protocol}://${env.VERCEL_PROJECT_PRODUCTION_URL}`;

const person: WithContext<Person> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Hayden Bleasel',
  description: 'Design Engineer',
  gender: 'male',
  nationality: 'Australian',
  url: baseUrl,
  image: new URL('/profile.jpg', baseUrl).toString(),
  sameAs: Object.values(social).map(({ href }) => href),
  alumniOf: 'University of Technology Sydney',
};

export const JsonLd = () => (
  <script type="application/ld+json">{JSON.stringify(person)}</script>
);
