import Link from 'next/link';
import type { FC, ReactNode } from 'react';
import { get } from '@vercel/edge-config';

import clsx from 'clsx';
import Image from 'next/image';
import Logo from '@/components/logo';
import Corellium from '@/public/logos/corellium.svg';

import AustralianEthical from '@/public/logos/australian-ethical.svg';
import Beskar from '@/public/logos/beskar.svg';
import Canva from '@/public/logos/canva.svg';
import Clipchamp from '@/public/logos/clipchamp.svg';
import Google from '@/public/logos/google.svg';
import Jellypepper from '@/public/logos/jellypepper.svg';
import NatGeo from '@/public/logos/natgeo.svg';
import Nike from '@/public/logos/nike.svg';
import Palantir from '@/public/logos/palantir.svg';
import RGA from '@/public/logos/rga.svg';
import Spaceship from '@/public/logos/spaceship.svg';
import Timberland from '@/public/logos/timberland.svg';
import Toyota from '@/public/logos/toyota.svg';
import Westfield from '@/public/logos/westfield.svg';
import formatList from '@/lib/formatList';
import ContactForm from '@/components/contactForm';
import SocialLinks from '@/components/socialLinks';
import Divider from '@/components/divider';

const clients = [
  'AdvanCell',
  'Airwallex',
  'Audience Republic',
  'Baraja',
  'Brighte',
  'Canva',
  'Clipchamp',
  'Corellium',
  'ESLint',
  'Elevio',
  'Faethm',
  'Flaunter',
  'Flirtey',
  'Futrli',
  'Grow',
  'Inventia',
  'Kerbly',
  'Notiv',
  'Perlin',
  'Pursuited',
  'Resolution Collective',
  'Rezi',
  'Ribit',
  'Shippit',
  'Siesta Campers',
  'Simply Wall St',
  'Snug',
  'Space Machines Company',
  'Tank Stream Ventures',
  'UpGuard',
  'Zibbet',
  'Zookal',
  'MindArc',
  'Gunmetal Studio',
  'Sumry',
  'UTS',
  'Tyro Payments',
].sort((companyA, companyB) => companyA.localeCompare(companyB));

const Home = async (): Promise<ReactNode> => {
  const location = await get<string>('location');

  return (
    <main className="grid lg:grid-cols-3">
      <header className="top-0 flex flex-col items-start justify-between gap-8 border-neutral-200 px-4 pt-12 lg:sticky lg:h-screen lg:border-r lg:p-16">
        <div>
          <Image
            src="/avatar.jpg"
            alt=""
            width={64}
            height={64}
            className="m-0 h-16 w-16 overflow-hidden rounded-full"
            priority
            quality={100}
          />
          <div className="grid">
            <h1
              className={clsx(
                'mt-8 text-xl font-semibold',
                'text-neutral-900',
                'dark:text-white'
              )}
            >
              Hayden Bleasel
            </h1>
            <p className="mt-1 text-neutral-500 dark:text-neutral-400">
              Chief Product Officer at Corellium
            </p>
            {location && (
              <div className="mt-3 inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-sm font-medium tracking-tight">
                  Currently in {location}
                </span>
              </div>
            )}
            <div className="mt-8 text-neutral-500 dark:text-neutral-400">
              <Link
                href="https://read.cv/haydenbleasel"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-neutral-900 underline"
              >
                Download my CV
              </Link>{' '}
              or <ContactForm />.
            </div>
          </div>
        </div>
        <SocialLinks />
      </header>
      <div className="lg:col-span-2">
        <div className="prose prose-lg prose-neutral mx-auto px-4 py-12 font-serif dark:prose-invert sm:py-32">
          <p>
            Hello, I&apos;m Hayden Bleasel. I&apos;m an Australian product
            designer and frontend engineer living in the United States.{' '}
            I&apos;ve had the privilege of working with many fantastic companies
            including{' '}
            <Logo icon={Google as FC} href="https://www.google.com/">
              Google
            </Logo>
            ,{' '}
            <Logo icon={Nike as FC} href="https://www.nike.com/">
              Nike
            </Logo>
            ,{' '}
            <Logo icon={Toyota as FC} href="https://www.toyota.com/">
              Toyota
            </Logo>
            ,{' '}
            <Logo
              icon={Timberland as FC}
              href="https://www.timberland.com/homepage.html"
            >
              Timberland
            </Logo>
            ,{' '}
            <Logo
              icon={NatGeo as FC}
              href="https://www.nationalgeographic.com/"
            >
              National Geographic
            </Logo>
            ,{' '}
            <Logo icon={Canva as FC} href="https://www.canva.com/en_gb/">
              Canva
            </Logo>
            ,{' '}
            <Logo icon={Westfield as FC} href="https://www.westfield.com/">
              Westfield
            </Logo>{' '}
            and{' '}
            <Logo
              icon={AustralianEthical as FC}
              href="https://www.australianethical.com.au/"
            >
              Australian Ethical
            </Logo>
            .
          </p>
          <p>
            I&apos;m currently leading the Product and Design at{' '}
            <Logo icon={Corellium as FC} href="https://www.corellium.com/">
              Corellium
            </Logo>
            , a virtual hardware lab for government defense contractors,
            security researchers, penetration testers and IoT developers. Our
            mission is to make the world more secure by providing a platform for
            hypervisor virtualization and advanced research.
          </p>

          <p>
            After hours, I run{' '}
            <Logo icon={Beskar as FC} href="https://www.beskar.co/">
              Beskar
            </Logo>
            , a digital playground and my corner of the internet to publish
            content, build apps and experiment with new technologies. So far,
            I&apos;ve published a few apps such as:
          </p>
          <ul>
            <li>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://tryneutral.com/"
              >
                Neutral
              </Link>{' '}
              — a carbon offsetting app.
            </li>
            <li>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://neutral.sh"
              >
                Neutral API
              </Link>{' '}
              — for scaling global reforestation (coming soon).
            </li>
            <li>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.refraction.dev"
              >
                Refraction
              </Link>{' '}
              — an AI-powered code improvement suite.
            </li>
            <li>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.waitlist.email"
              >
                waitlist.email
              </Link>{' '}
              — fast, unbranded waitlists for developers
            </li>
            <li>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.desync.art"
              >
                Desync
              </Link>{' '}
              — share and find inspiration from AI-generated art.
            </li>
          </ul>
          <p>
            Towards the end of 2020, I contracted for{' '}
            <Logo icon={RGA as FC} href="https://rga.com/">
              R/GA
            </Logo>
            , a innovation consultancy and digital design and advertising
            agency, where I worked on a variety of projects for large clients
            with various teams of talented people.
          </p>
          <p>
            From 2017 to 2021, I ran an agency called{' '}
            <Logo icon={Jellypepper as FC} href="https://jellypepper.com/">
              Jellypepper
            </Logo>{' '}
            where I focused on startups in “disruptive industries” such as
            self-driving cars, AI, biotechnology, cryptocurrency, renewable
            energy, drone delivery, cybersecurity and even outer-space
            logistics. Many of the startups I worked with continued on to raise
            millions of dollars in funding and some even went on to be acquired,
            such as{' '}
            <Logo icon={Clipchamp as FC} href="https://clipchamp.com/en/">
              Clipchamp
            </Logo>{' '}
            by Microsoft.
          </p>

          <p>
            From 2016 — 2017, I was Head of Product and Design at{' '}
            <Logo icon={Spaceship as FC} href="https://www.spaceship.com.au/">
              Spaceship
            </Logo>
            , a technology-focused superannuation fund that gave investors
            exposure to tech companies so they can “invest where the world is
            going, not where it&apos;s been”. We raised $1.6M from
            Atlassian&apos;s Mike Cannon-Brookes and ShowPo&apos;s Jane Lu, then
            a further $19.5M from NEA, Sequoia Capital and Valar Ventures.
          </p>

          <p>
            In the summer of 2015, I was a Product Design intern at{' '}
            <Logo icon={Palantir as FC} href="https://www.palantir.com/">
              Palantir
            </Logo>{' '}
            where I was fortunate enough to work with a small team on an
            anti-fraud and big data analysis project for a U.S. government
            agency.
          </p>

          <p>
            Prior to this, I was a Frontend Engineer at Sumry, partner at
            Gunmetal Studio, Automation Engineer at MindArc, Frontend Engineer
            at Zookal and so on. You can find a more detailed list of my
            experience on my{' '}
            <Link
              href="https://read.cv/haydenbleasel"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              read.cv
            </Link>{' '}
            or{' '}
            <Link
              href="https://www.linkedin.com/in/haydenbleasel/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              LinkedIn
            </Link>
            .
          </p>

          <Divider />

          <p>
            In 2016, I graduated with two degrees from the University of
            Technology, Sydney &mdash; a Bachelor of Business (Management) and a
            Bachelor of Science in Information Technology (Enterprise Systems
            Development).
          </p>
          <p>
            I also completed{' '}
            <Link
              href="https://courses.edx.org/certificates/9d821d3e4d0d44afbe871ceb31c9d135"
              target="_blank"
              rel="noopener noreferrer"
            >
              HarvardX&apos;s CS50x
            </Link>{' '}
            Computer Science course in 2021 and{' '}
            <Link
              href="https://courses.edx.org/certificates/598d25a2674c43fabed9da38302ca532"
              target="_blank"
              rel="noopener noreferrer"
            >
              Arm&apos;s ESE101
            </Link>{' '}
            Embedded Systems course in 2022.
          </p>

          <Divider />

          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            As a complete list of companies and clients, I have worked with{' '}
            {formatList(clients)}.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Home;
