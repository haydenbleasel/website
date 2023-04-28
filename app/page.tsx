import { get } from '@vercel/edge-config';
import Image from '@/components/image';
import Link from '@/components/link';
import { formatList, getDate } from '@/lib/utils';
import Section from '@/components/section';
import Footnote from '@/components/footnote';

import avatar from '@/public/images/profile.jpg';
import Logos from '@/components/logos';
import ContactButton from '@/components/contactButton';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const updatedAt = getDate();

export const metadata: Metadata = {
  title: 'Hayden Bleasel — Product and Design Lead at Corellium',
  description:
    "Hi, I'm Hayden Bleasel — Australian product designer and TypeScript developer creating internet software.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? ''),
};

const Home = async (): Promise<ReactNode> => {
  const edge = await get<{
    location: string;
    rga: string[];
    jellypepper: string[];
    freelance: string[];
  }>('daylight');

  if (!edge) {
    throw new Error('Failed to fetch Edge config');
  }

  return (
    <>
      <Section>
        <Image
          src={avatar}
          width={64}
          height={64}
          alt="A photo of Hayden Bleasel."
          className="mt-0 h-16 w-16 rounded-full"
          priority
          placeholder="blur"
        />
        <div className="flex flex-col gap-4">
          <h1>
            Australian product designer and TypeScript developer creating
            internet software.
          </h1>
          <div className="grid">
            <small>Currently living in {edge.location}.</small>
            <small>Last updated {updatedAt}.</small>
            <small>© {new Date().getFullYear()} Hayden Bleasel.</small>
          </div>
        </div>
      </Section>
      <Section>
        <p>
          I currently lead the Product and Design teams at{' '}
          <Link href="https://link.haydenbleasel.com/corellium">Corellium</Link>
          , a virtual hardware lab for security researchers, pen-testers, IoT
          developers and government defense contractors. Our mission is to make
          the world a safer, more secure place by accelerating security R&amp;D.
        </p>
        <p>
          While my work at Corellium is product strategy and direction, my
          background is in product design and software engineering. Throughout
          my career, I&apos;ve had the privilege of working with many fantastic
          companies and people.
        </p>
        <Logos />
      </Section>
      <Section title="Work">
        <p>
          Prior to joining Corellium, I spent several years running{' '}
          <Link href="https://link.haydenbleasel.com/jellypepper">
            Jellypepper
          </Link>
          , a creative agency, where I worked with many incredible startups
          <Footnote index={1} /> in “disruptive industries” such as self-driving
          cars, AI, biotechnology, cryptocurrency, drone delivery, cybersecurity
          and even orbital (outer space) logistics.
        </p>
        <p>
          Towards the end of 2020 I contracted for R/GA as an Experience
          Designer, where I worked on a variety of projects for large clients
          <Footnote index={2} /> with various teams of talented people.
        </p>
        <p>
          From 2016 &mdash; 2017, I was Head of Product and Design at{' '}
          <Link href="https://link.haydenbleasel.com/spaceship">Spaceship</Link>{' '}
          where we raised $20M+ in funding, grew a waitlist of 28K+ people and
          grew to $100M+ in funds under management.
        </p>
        <p>
          In the summer of 2015, I was a Product Design intern at{' '}
          <Link href="https://link.haydenbleasel.com/palantir">Palantir</Link>{' '}
          where I worked with a small team on an anti-fraud and big data
          analysis project for a U.S. government agency.
        </p>
        <p>
          For more work history, see my{' '}
          <Link href="https://link.haydenbleasel.com/cv">CV</Link>.
        </p>
      </Section>
      <Section title="After Hours">
        <p>
          After hours I run{' '}
          <Link href="https://link.haydenbleasel.com/beskar">Beskar</Link>{' '}
          &mdash; a digital playground and my corner of the internet to publish
          content, build apps and experiment with new technologies. So far,
          I&apos;ve built a handful of apps and tools, including:
        </p>
        <ul>
          <li>
            <Link href="https://link.haydenbleasel.com/refraction">
              Refraction
            </Link>{' '}
            &mdash; an AI-powered code improvement suite.
          </li>
          <li>
            <Link href="https://link.haydenbleasel.com/neutral">Neutral</Link>{' '}
            &mdash; a carbon offsetting app.
          </li>
          <li>
            <Link href="https://link.haydenbleasel.com/waitlist">Waitlist</Link>{' '}
            &mdash; fast, unbranded waitlists for developers.
          </li>
          <li>
            <Link href="https://link.haydenbleasel.com/harmony">Harmony</Link>{' '}
            &mdash; a unified, opinionated linting config.
          </li>
        </ul>
        <p>
          Years ago, I created{' '}
          <Link href="https://link.haydenbleasel.com/presumi">Presumi</Link>{' '}
          (closed) — a job application and resume tracking platform. I licensed
          it to SEEK in Hong Kong for a while, where we managed 100K+ job
          applications and processed 1M+ data points.
        </p>
        <p>
          I also freelance occasionally and have worked with some brilliant
          companies and organizations
          <Footnote index={3} />.
        </p>
      </Section>
      <Section title="Education">
        <p>
          In 2016, I graduated from the University of Technology, Sydney with a
          Bachelor of Business (Management) and a Bachelor of Science in
          Information Technology (Enterprise Systems Development).
        </p>
        <p>
          I also completed{' '}
          <Link href="https://link.haydenbleasel.com/cs50x">
            HarvardX&apos;s CS50x
          </Link>{' '}
          Computer Science course in 2021 and{' '}
          <Link href="https://link.haydenbleasel.com/ese101">
            Arm&apos;s ESE101
          </Link>{' '}
          Embedded Systems course in 2022.
        </p>
      </Section>
      <Section title="Availability">
        <p>
          I have limited availability and occasionally take on select projects,
          such as freelance and consulting roles. I&apos;m also open to joining
          boards and advisory roles. If you&apos;re interested, please get in
          touch.
        </p>
        <ContactButton />
      </Section>
      <Section>
        <ol className="text-xs text-neutral-500">
          <li id="fn-1">{formatList(edge.jellypepper)}.</li>
          <li id="fn-2">{formatList(edge.rga)}.</li>
          <li id="fn-3">{formatList(edge.freelance)}.</li>
        </ol>
      </Section>
    </>
  );
};

export default Home;
