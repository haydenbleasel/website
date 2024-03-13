import Image from 'next/image';
import { Link } from '@/components/link';
import { Newsletter } from '@/components/newsletter';
import Profile from './profile.jpg';
import type { FC } from 'react';

const Home: FC = () => (
  <div className="flex items-start">
    <div className="flex-1">
      <div className="space-y-12 py-32 prose prose-neutral prose-orange max-w-xl mx-auto">
        <header className="space-y-2">
          <h1 className="text-3xl m-0">Hayden Bleasel</h1>
          <p className="m-0 text-lg">Product Designer and Software Engineer</p>
        </header>
        <main>
          <p>
            Hi, I’m Hayden Bleasel. I’m an Australian Product Designer and
            Software Engineer currently based in Delray Beach, Florida.
          </p>
          <p>
            I’m currently the Chief Product Officer at{' '}
            <Link href="https://www.corellium.com/">Corellium</Link> — a virtual
            hardware platform designed for governments, defense contractors and
            enterprises to perform security research and testing on Arm-based
            devices.
          </p>
          <p>
            After hours, I’m the founder of{' '}
            <Link href="https://www.eververse.ai/">Eververse</Link>, a new type
            of Product Management tool designed to help Product teams triage
            feedback, explore problems, ideate solutions, prioritize features
            and plan roadmaps with the help of AI.
          </p>
          <p>
            Before that, I ran an agency called{' '}
            <Link href="https://jellypepper.com/">Jellypepper</Link> where I
            worked with startups in self-driving cars, AI, biotech, crypto,
            drone delivery, cybersecurity and even outer space logistics.
            Jellypepper was{' '}
            <Link href="https://raw.studio/blog/raw-studio-acquires-jellypepper-to-expand-its-reach-to-the-startup-ecosystem/">
              acquired
            </Link>{' '}
            in 2023 by Raw Studio.
          </p>
          <p>
            I also founded{' '}
            <Link href="https://refraction.dev/">Refraction</Link>, an suite of
            AI-based code improvement tools for developers, which was{' '}
            <Link href="/blog/refraction">acquired</Link> in 2023 by Twistag.
          </p>
          <p>
            I’ve been fortunate to work with some incredible people and
            companies over the years, including Google, Facebook, Twitter,
            Dropbox, Atlassian, Canva, and many more.
          </p>
        </main>
        <footer>
          <p>Join my mailing list for infrequent updates</p>
          <Newsletter />
        </footer>
      </div>
    </div>
    <Image
      src={Profile}
      alt=""
      width={3584}
      height={4608}
      className="object-cover flex-0 h-screen sticky top-0 bottom-0 aspect-[3584/4608] w-auto max-w-[50vw]"
      quality={100}
      loading="eager"
      priority
    />
  </div>
);

export default Home;
