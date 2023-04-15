import Image from '@/components/image';
import Link from '@/components/link';
import type { FC } from 'react';
import { getDate, listFormatter } from '@/lib/utils';
import Section from '@/components/section';
import jellypepperClients from '@/data/jellypepper';
import freelanceClients from '@/data/freelance';
import Footnote from '@/components/footnote';
import type { Metadata } from 'next';

import avatar from '@/public/images/profile.jpg';
import clsx from 'clsx';

const logos = [
  '/images/australian-ethical.svg',
  '/images/canva.svg',
  '/images/google.svg',
  '/images/national-geographic.svg',
  '/images/nike.svg',
  '/images/timberland.svg',
  '/images/toyota.svg',
  '/images/westfield.svg',
];

const updatedAt = getDate();

export const metadata: Metadata = {
  title: 'Hayden Bleasel — Product and Design Lead at Corellium',
  description:
    "Hi, I'm Hayden Bleasel — Australian product designer and TypeScript developer living in the U.S.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? ''),
};

const Home: FC = () => (
  <main className="prose prose-neutral mx-4 my-24 grid gap-16 dark:prose-invert sm:m-[11%] lg:m-[180px]">
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
          Australian product designer and TypeScript developer living in the
          U.S.
        </h1>
        <div className="grid">
          <small>Last updated {updatedAt}.</small>
          <small>Currently in Delray Beach, Florida.</small>
          <small>© {new Date().getFullYear()} Hayden Bleasel.</small>
        </div>
      </div>
    </Section>
    <Section>
      <p>
        I currently lead the Product and Design teams at{' '}
        <Link href="https://read.cv/haydenbleasel/LoRxZsHDY2SYlrWBolbo">
          Corellium
        </Link>
        , a virtual hardware lab for security researchers, pen-testers, IoT
        developers and government defense contractors. Our mission is to make
        the world a safer, more secure place by accelerating security R&amp;D.
      </p>
      <p>
        While my work at Corellium is product strategy and direction, my
        background is in product design and software engineering. Throughout my
        career, I&apos;ve had the privilege of working with many fantastic
        companies and people.
      </p>
      <div className="mt-8 grid grid-cols-4 gap-x-16 gap-y-8">
        {logos.map((logo) => (
          <div className="flex aspect-video w-full items-center" key={logo}>
            <Image
              src={logo}
              width={113}
              height={113}
              alt=""
              className={clsx(
                'm-0 h-auto max-h-[2.5rem] w-full opacity-40',
                'dark:brightness-0 dark:invert'
              )}
            />
          </div>
        ))}
      </div>
    </Section>
    <Section title="Work">
      <p>
        Prior to joining Corellium, I spent several years running{' '}
        <Link href="https://read.cv/haydenbleasel/5CvDIZ8dRNaTGxz8pKNZ">
          Jellypepper
        </Link>
        , a creative agency, where I worked with many incredible startups
        <Footnote index={1} /> in “disruptive industries” such as self-driving
        cars, AI, biotechnology, cryptocurrency, drone delivery, cybersecurity
        and even orbital (outer space) logistics.
      </p>
      <p>
        Towards the end of 2020 I contracted for R/GA as an Experience Designer,
        where I worked on a variety of projects for large clients with various
        teams of talented people.
      </p>
      <p>
        From 2016 &mdash; 2017, I was Head of Product and Design at{' '}
        <Link href="https://read.cv/haydenbleasel/Gv4GTLVsJcTorLhf0vqB">
          Spaceship
        </Link>{' '}
        where we raised $20M+ in funding, grew a waitlist of 28K+ people and
        grew to $100M+ in funds under management.
      </p>
      <p>
        In the summer of 2015, I was a Product Design intern at{' '}
        <Link href="https://read.cv/haydenbleasel/VKsHjQdAKwagBRrTGqha">
          Palantir
        </Link>{' '}
        where I worked with a small team on an anti-fraud and big data analysis
        project for a U.S. government agency.
      </p>
      <p>
        For more work history, see my{' '}
        <Link href="https://read.cv/haydenbleasel">CV</Link>.
      </p>
    </Section>
    <Section title="After Hours">
      <p>
        After hours I run <Link href="https://www.beskar.co/">Beskar</Link>{' '}
        &mdash; a digital playground and my corner of the internet to publish
        content, build apps and experiment with new technologies. So far,
        I&apos;ve built a handful of apps, including:
      </p>
      <ul>
        <li>
          <Link href="https://tryneutral.com/">Neutral</Link> &mdash; a carbon
          offsetting app.
        </li>
        <li>
          <Link href="https://www.refraction.dev/">Refraction</Link> &mdash; an
          AI-powered code improvement suite.
        </li>
        <li>
          <Link href="https://www.waitlist.email/">Waitlist</Link> &mdash; fast,
          unbranded waitlists for developers.
        </li>
      </ul>
      <p>
        Years ago, I created{' '}
        <Link href="https://www.beskar.co/blog/presumi">Presumi</Link> (closed)
        — a job application and resume tracking platform. I licensed it to SEEK
        in Hong Kong for a while, where we managed 100K+ job applications and
        processed 1M+ data points.
      </p>
      <p>
        I also freelance occasionally and have worked with some brilliant
        companies and organizations
        <Footnote index={2} />.
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
        <Link href="https://courses.edx.org/certificates/9d821d3e4d0d44afbe871ceb31c9d135">
          HarvardX&apos;s CS50x
        </Link>{' '}
        Computer Science course in 2021 and{' '}
        <Link href="https://courses.edx.org/certificates/598d25a2674c43fabed9da38302ca532">
          Arm&apos;s ESE101
        </Link>{' '}
        Embedded Systems course in 2022.
      </p>
    </Section>
    <Section title="Availability">
      <p>
        I have limited availability and occasionally take on shorter
        engagements, such as freelance and consulting roles. I&apos;m also open
        to joining boards and advisory roles. If you&apos;re looking for help
        with your product or design, please do reach out via email.
      </p>
    </Section>
    <Section>
      <ol className="text-xs text-neutral-500">
        <li id="fn-1">{listFormatter.format(jellypepperClients)}.</li>
        <li id="fn-2">{listFormatter.format(freelanceClients)}.</li>
      </ol>
    </Section>
  </main>
);

export default Home;
