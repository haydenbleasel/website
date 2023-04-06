import { getLastDeployDate } from '@/lib/vercel';
import Image from '@/components/image';
import Link from '@/components/link';
import type { ReactNode } from 'react';
import { listFormatter } from '@/lib/utils';
import Section from '@/components/section';
import jellypepperClients from '@/data/jellypepper';
import freelanceClients from '@/data/freelance';
import Footnote from '@/components/footnote';

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

const Home = async (): Promise<ReactNode> => {
  const updatedAt = await getLastDeployDate();

  return (
    <main className="prose prose-neutral m-[180px] grid gap-16 dark:prose-invert">
      <Section>
        <Image
          src="/images/profile.jpg"
          width={64}
          height={64}
          alt="A photo of Hayden Bleasel."
          className="mt-0 h-16 w-16 rounded-full"
          priority
        />
        <div className="flex flex-col gap-4">
          <h1>
            Australian product designer and Typescript developer living in the
            U.S.
          </h1>
          <div className="grid">
            <small>Last updated {updatedAt}.</small>
            <small>© {new Date().getFullYear()} Hayden Bleasel.</small>
          </div>
        </div>
      </Section>
      <Section>
        <p>
          I currently lead the Product and Design teams at{' '}
          <Link href="#">Corellium</Link>, a virtual hardware lab for security
          researchers, pen-testers, IoT developers and government defense
          contractors. Our mission is to make the world a safer, more secure
          place by accelerating security R&D.
        </p>
        <p>
          While my work at Corellium is product strategy and direction, my
          background is in product design and software engineering. throughout
          my career, I&apos;ve had the privilege of working with many fantastic
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
                className="m-0 h-auto max-h-[2.5rem] w-full opacity-40"
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
          Towards the end of 2020 I also contracted for R/GA, where I worked on
          a variety of projects for large clients with various teams of talented
          people. From 2016 &mdash; 2017, I was Head of Product and Design at{' '}
          <Link href="https://read.cv/haydenbleasel/Gv4GTLVsJcTorLhf0vqB">
            Spaceship
          </Link>{' '}
          where we raised $20M+ in funding, grew a waitlist of 28K+ people and
          grew to $100M+ in FUM.
        </p>
        <p>
          In the summer of 2015, I was a Product Design intern at{' '}
          <Link href="https://read.cv/haydenbleasel/VKsHjQdAKwagBRrTGqha">
            Palantir
          </Link>{' '}
          where I worked with a small team on an anti-fraud and big data
          analysis project for a U.S. government agency. Before all that, I did
          a whole bunch of other stuff you can read on my{' '}
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
            <Link href="https://www.refraction.dev/">Refraction</Link> &mdash;
            an AI-powered code improvement suite.
          </li>
          <li>
            <Link href="https://www.waitlist.email/">Waitlist</Link> &mdash;
            fast, unbranded waitlists for developers.
          </li>
        </ul>
        <p>
          Years ago while I was at university, I created{' '}
          <Link href="https://www.beskar.co/blog/presumi">Presumi</Link> — a job
          application and resume tracking platform that I ended up licensing to
          SEEK in Hong Kong for a while. During that time, we managed 100K+ job
          applications and processed 1M+ data points.
        </p>
        <p>
          I also freelance occasionally and have worked with some brilliant
          companies and organizations
          <Footnote index={2} />.
        </p>
      </Section>
      <Section title="Education">
        <p>
          In 2016, I graduated with two degrees from the University of
          Technology, Sydney — a Bachelor of Business (majoring in Management)
          and a Bachelor of Science in Information Technology (majoring in
          Enterprise Systems Development).
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
          engagements, such as freelance and consulting roles. I&apos;m also
          open to joining boards and advisory roles. If you&apos;re looking for
          help with your product or design, please do reach out via email.
        </p>
      </Section>
      <Section>
        <div className="flex gap-4">
          <Link href="#">Email</Link>
          <Link href="https://twitter.com/haydenbleasel">Twitter</Link>
          <Link href="https://read.cv/haydenbleasel">CV</Link>
        </div>
      </Section>
      <Section>
        <ol className="text-xs text-neutral-500">
          <li id="fn-1">{listFormatter.format(jellypepperClients)}.</li>
          <li id="fn-2">{listFormatter.format(freelanceClients)}.</li>
        </ol>
      </Section>
    </main>
  );
};

export default Home;
