import Image from 'next/image';
import { Section } from '@/components/section';
import type { FC } from 'react';

const socialLinks = [
  {
    href: 'https://twitter.com/haydenbleasel',
    name: 'X',
    image: '/social/x.svg',
  },
  {
    href: 'https://github.com/haydenbleasel',
    name: 'GitHub',
    image: '/social/github.svg',
  },
  {
    href: 'https://www.instagram.com/hayden.bleasel/',
    name: 'Instagram',
    image: '/social/instagram.svg',
  },
  {
    href: 'https://www.producthunt.com/@haydenbleasel',
    name: 'Product Hunt',
    image: '/social/producthunt.svg',
  },
  {
    href: 'https://www.linkedin.com/in/haydenbleasel/',
    name: 'LinkedIn',
    image: '/social/linkedin.svg',
  },
  {
    href: 'https://dribbble.com/haydenbleasel',
    name: 'Dribbble',
    image: '/social/dribbble.svg',
  },
];

export const Social: FC = () => (
  <Section title="Connect">
    <div className="flex items-center gap-8">
      {socialLinks.map(({ href, name, image }) => (
        <a key={href} href={href} target="_blank" rel="noopener noreferrer">
          <Image
            src={image}
            alt={name}
            className="m-0 w-5 h-5 hover:brightness-0 dark:hover:invert transition-all"
            width={20}
            height={20}
          />
          <span className="sr-only">{name}</span>
        </a>
      ))}
    </div>
  </Section>
);
