import Image from 'next/image';

import { Link } from '@/components/link';
import { cn } from '@/lib/utils';
import { Header } from '@/components/header';
import PageLayout from '@/app/(pages)/layout';
import { Travel } from '../components/travel';
import Avatar from './avatar.jpg';
import Profile from './profile.jpg';
import Refraction from './refraction.jpg';
import Corellium from './corellium.svg';
import Eververse from './eververse.svg';
import Jellypepper from './jellypepper.svg';
import { InlineImage } from './inline-image';
import type { COBEOptions } from 'cobe';
import type { StaticImageData } from 'next/image';
import type { Metadata } from 'next';
import type { FC } from 'react';

export const metadata: Metadata = {
  title: 'About',
  description:
    'I’m Hayden Bleasel — an Australian Product Designer and Software Engineer currently based in Delray Beach, Florida.',
};

const lived: COBEOptions['markers'] = [
  // Sydney, Australia
  { location: [-33.8688, 151.2093], size: 0.2 },

  // Boca Raton, Florida
  { location: [26.4615, -80.0728], size: 0.2 },

  // Palo Alto, California
  { location: [37.4419, -122.143], size: 0.2 },
];

const visited: COBEOptions['markers'] = [
  // Boston, Massachusetts
  { location: [42.3601, -71.0589], size: 0.1 },

  // Honolulu, Hawaii
  { location: [21.3069, -157.8583], size: 0.1 },

  // San Francisco, California
  { location: [37.7749, -122.4194], size: 0.1 },

  // Los Angeles, California
  { location: [34.0522, -118.2437], size: 0.1 },

  // Las Vegas, Nevada
  { location: [36.1699, -115.1398], size: 0.1 },

  // New York, New York
  { location: [40.7128, -74.006], size: 0.1 },

  // Nuremberg, Germany
  { location: [49.452, 11.0768], size: 0.1 },

  // Melbourne, Australia
  { location: [-37.8136, 144.9631], size: 0.1 },

  // Brisbane, Australia
  { location: [-27.4698, 153.0251], size: 0.1 },

  // Rotorua, New Zealand
  { location: [-38.1368, 176.2497], size: 0.1 },

  // Reno, Nevada
  { location: [39.5296, -119.8138], size: 0.1 },

  // Boulder, Colorado
  { location: [40.015, -105.2705], size: 0.1 },

  // Denver, Colorado
  { location: [39.7392, -104.9903], size: 0.1 },
];

const About: FC = () => (
  <div className="flex items-start">
    <div className="flex-1">
      <div className="max-w-[38rem] mx-auto">
        <PageLayout>
          <Image
            src={Avatar}
            alt=""
            width={96}
            height={96}
            className={cn(
              'block xl:hidden m-0',
              'object-cover w-12 h-12 rounded-full'
            )}
            quality={100}
            loading="eager"
            priority
          />
          <Header
            title="About"
            description="I’m Hayden Bleasel — an Australian Product Designer and Software Engineer currently based in Delray Beach, Florida."
          />
          <main>
            <p>
              I’m currently the Chief Product Officer at{' '}
              <InlineImage
                src={Corellium as StaticImageData}
                text="Corellium"
                url="https://www.corellium.com/"
              />{' '}
              — a virtual hardware platform designed for governments, defense
              contractors and enterprises to perform security research and
              testing on Arm-based devices.
            </p>
            <p>
              After hours, I’m working on{' '}
              <InlineImage
                src={Eververse as StaticImageData}
                text="Eververse"
                url="https://www.eververse.ai/"
              />
              , a new type of Product Management tool designed to help Product
              teams triage feedback, explore problems, ideate solutions,
              prioritize features and plan roadmaps with the help of AI.
            </p>
            <p>
              Previously, I ran an agency called{' '}
              <InlineImage
                src={Jellypepper as StaticImageData}
                text="Jellypepper"
                url="https://jellypepper.com/"
              />{' '}
              where I worked with startups in self-driving cars, AI, biotech,
              crypto, drone delivery, cybersecurity and even outer space
              logistics. Jellypepper was{' '}
              <Link href="https://raw.studio/blog/raw-studio-acquires-jellypepper-to-expand-its-reach-to-the-startup-ecosystem/">
                acquired
              </Link>{' '}
              in 2023 by Raw Studio.
            </p>
            <p>
              I also founded{' '}
              <InlineImage
                src={Refraction}
                text="Refraction"
                url="https://refraction.dev/"
              />
              , a suite of AI-based code improvement tools for developers, which
              was <Link href="/blog/refraction">acquired</Link> in 2023 by
              Twistag.
            </p>
            <p>
              I&apos;ve lived in Sydney, Palo Alto and now Florida; but
              I&apos;ve also visited a few other places around the world.
              Eventually I&apos;ll make it everywhere.
            </p>
            <div
              className={cn(
                'aspect-[4/3] rounded-xl border overflow-hidden',
                'bg-neutral-100 border-neutral-200',
                'dark:bg-neutral-800 dark:border-neutral-700'
              )}
            >
              <Travel
                width={576}
                height={(576 * 3) / 4}
                markers={[...lived, ...visited]}
              />
            </div>
            <p>
              I’ve had the privilege of working with many fantastic companies
              including Google, Palantir, Nike, Toyota, National Geographic,
              Timberland, Canva, Westfield, Australian Ethical and many more.
            </p>
            <p>
              I have a Bachelor of Business (Management) and Bachelor of Science
              in Information Technology (Enterprise Systems Development) from
              the University of Technology, Sydney.
            </p>
            <p>
              In my spare time, I enjoy working out, building open source
              projects like{' '}
              <Link href="https://www.next-forge.com/">next-forge</Link> and{' '}
              <Link href="https://www.ultracite.dev/">Ultracite</Link>, flying
              my{' '}
              <Link href="https://www.youtube.com/playlist?list=PLw95VUVc_2gh5oGx-jj9PnatiMKtQBiV2">
                drone
              </Link>{' '}
              and playing video games.
            </p>
          </main>
        </PageLayout>
      </div>
    </div>
    <Image
      src={Profile}
      alt=""
      width={3584}
      height={4608}
      className={cn(
        'hidden xl:block',
        'object-cover flex-0 h-screen sticky top-0 bottom-0 aspect-[3584/4608] w-auto max-w-[50vw] select-none'
      )}
      quality={100}
      loading="eager"
      priority
    />
  </div>
);

export default About;