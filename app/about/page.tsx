import Image from 'next/image';

import { Link } from '@/components/link';
import { cn } from '@/lib/utils';
import { Header } from '@/components/header';
import PageLayout from '@/app/(pages)/layout';
import Avatar from './avatar.jpg';
import Profile from './profile.jpg';
import Refraction from './refraction.jpg';
import Corellium from './corellium.svg';
import Eververse from './eververse.svg';
import Jellypepper from './jellypepper.svg';
import type { StaticImageData } from 'next/image';
import type { Metadata } from 'next';
import type { FC } from 'react';

export const metadata: Metadata = {
  title: 'About',
  description:
    'I’m Hayden Bleasel — an Australian Product Designer and Software Engineer currently based in Delray Beach, Florida.',
};

type InlineImageProperties = {
  readonly src: StaticImageData | string;
  readonly text: string;
  readonly url: string;
};

const InlineImage: FC<InlineImageProperties> = ({ src, text, url }) => (
  <Link
    href={url}
    className="ml-0.5 dark:ml-0 inline-flex gap-1 items-center align-bottom"
  >
    <Image
      src={src}
      alt=""
      width={16}
      height={16}
      className="dark:hidden m-0 w-4 h-4 rounded-sm object-contain select-none"
      quality={100}
    />
    <span>{text}</span>
  </Link>
);

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

/*
 * import { cn } from '@/lib/utils';
 * import { Travel } from '../../components/travel';
 * import { Logos } from '../../components/logos';
 * import type { FC } from 'react';
 */

/*
 * const About: FC = () => (
 *   <div>
 *     <p>Hello! I'm Hayden Bleasel.</p>
 *     <p>
 *       I’ve had the privilege of working with many fantastic companies including
 *       Google, Palantir, Nike, Toyota, National Geographic, Timberland, Canva,
 *       Westfield, Australian Ethical and many more.
 *     </p>
 *     <Logos />
 *     <div
 *       className={cn(
 *         'border p-4 rounded-lg',
 *         'bg-neutral-100 border:bg-neutral-200',
 *         'dark:bg-neutral-900 dark:border-neutral-700'
 *       )}
 *     >
 *       <Travel />
 *     </div>
 *     <p>
 *       I work on Neutral — an app which so far has helped plant thousands of
 *       trees and offset hundreds of tonnes of CO₂e through global reforestation
 *       programs. I build random projects every so often like Hancock and San
 *       Andreas Radio. I also designed the initial version of Bokeh. Other than
 *       that, I'm either spending time in the gym, ideating on new side projects
 *       and occasionally working with very select clients on freelance / moonlight
 *       work. Get in touch if you want to work with me on something.
 *     </p>
 *     <p>
 *       Education Bachelor of Business (Management) University of Technology,
 *       Sydney, 2016 Bachelor of Science in Information Technology (Enterprise
 *       Systems Development) University of Technology, Sydney, 2016 CS50x: CS50's
 *       Introduction to Computer Science HarvardX, 2021 ESE101: Embedded Systems
 *       Essentials with Arm: Getting Started ArmEducation, 2022
 *     </p>
 *   </div>
 * );
 */

// export default About;
