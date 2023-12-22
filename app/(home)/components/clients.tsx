import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/section';
import type { FC } from 'react';

const clients = [
  { name: 'Canva', image: '/clients/canva.svg' },
  { name: 'Node.js', image: '/clients/node.svg' },
  { name: 'Google', image: '/clients/google.svg' },
  { name: 'National Geographic', image: '/clients/natgeo.svg' },
  { name: 'Nike', image: '/clients/nike.svg' },
  { name: 'Timberland', image: '/clients/timberland.svg' },
  { name: 'Toyota', image: '/clients/toyota.svg' },
  { name: 'Westfield', image: '/clients/westfield.svg' },
];

export const Clients: FC = () => (
  <Section
    title="Clients"
    footer={
      <>
        See all past <Link href="/clients">clients</Link>.
      </>
    }
  >
    <div className="grid grid-cols-4 gap-px">
      {clients.map(({ name, image }) => (
        <div
          key={name}
          className="flex items-center justify-center p-4 aspect-square ring-1 ring-neutral-200 dark:ring-neutral-800"
        >
          <Image
            src={image}
            alt={name}
            className="m-0 h-16 w-16 object-contain"
            width={64}
            height={64}
          />
        </div>
      ))}
    </div>
  </Section>
);
