import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/container';
import Profile from './profile.jpg';
import type { FC } from 'react';

const About: FC = () => (
  <Container>
    <h1>About</h1>

    <Image
      src={Profile}
      width={1158}
      height={1593}
      alt=""
      placeholder="blur"
      className="rounded overflow-hidden float-right max-w-[15rem] m-8 my-0"
    />

    <p>
      Hi, I&apos;m Hayden Bleasel. I&apos;m a product designer, TypeScript
      engineer and indie maker currently based in Delray Beach, Florida.
    </p>
    <p>
      I&apos;m the CPO at <Link href="/work/corellium">Corellium</Link> — a
      virtual hardware platform for government agencies and large enterprises to
      perform security research, penetration testing and development on mobile
      and IoT devices. I run the product management, customer support and design
      teams.
    </p>
    <p>
      Previously I ran an agency called{' '}
      <Link href="/work/jellypepper">Jellypepper</Link>. We worked with startups
      in self-driving car tech, AI, biotech, crypto, drone delivery,
      cybersecurity and even orbital (outer space) logistics. Jellypepper was{' '}
      <Link href="https://raw.studio/blog/raw-studio-acquires-jellypepper-to-expand-its-reach-to-the-startup-ecosystem/">
        acquired
      </Link>{' '}
      in 2023 by Raw Studio, where I joined them as an Advisor.
    </p>
    <p>
      I have limited availability and occasionally take on freelance projects
      and consulting. I&apos;m also open to joining boards and advisory roles.
      If you&apos;re interested, please get in touch.
    </p>
  </Container>
);

export default About;
