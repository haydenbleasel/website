import { PaperPlaneIcon } from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/container';
import { Prose } from '@/components/prose';
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/social-icons';
import { createMetadata } from '@/lib/metadata';
import { SocialLink } from './components/social-link';
import portraitImage from './images/portrait.jpg';

export const metadata: Metadata = createMetadata({
  title: 'About',
  description:
    'I’m Hayden Bleasel. I live in San Francisco, where work for Vercel.',
});

const About = () => (
  <Container className="mt-16 sm:mt-32">
    <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
      <div className="lg:pl-20">
        <div className="max-w-xs px-2.5 lg:max-w-none">
          <Image
            alt=""
            className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            sizes="(min-width: 1024px) 32rem, 20rem"
            src={portraitImage}
          />
        </div>
      </div>
      <div className="lg:order-first lg:row-span-2">
        <h1 className="font-bold text-4xl text-zinc-800 tracking-tighter sm:text-5xl dark:text-zinc-100">
          I’m Hayden Bleasel, an Australian designer, engineer and founder.
        </h1>
        <Prose className="mt-6">
          <p>
            I'm currently based in San Francisco and work on the Developer
            Experience team at{' '}
            <a
              href="https://vercel.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Vercel
            </a>
            , where I focus on creating tools, libraries and resources to help
            developers build better products.
          </p>
          <p>
            My previous role was Chief Product Officer at{' '}
            <a
              href="https://www.corellium.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Corellium
            </a>
            , pioneers of an incredible Arm virtualisation platform. I moved to
            Delray Beach, Florida in 2021 to lead the Product, Design and
            Support teams in blurring the line between real and virtual for
            government agencies and enterprises. Corellium was{' '}
            <a
              href="https://techcrunch.com/2025/06/05/phone-unlocking-firm-cellebrite-to-acquire-mobile-testing-startup-corellium-for-170m/"
              rel="noopener noreferrer"
              target="_blank"
            >
              acquired
            </a>{' '}
            by Cellebrite in 2025.
          </p>
          <p>
            Before that, I was Director of{' '}
            <a
              href="https://jellypepper.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Jellypepper
            </a>
            , an award-winning digital agency for disruptive startups. We worked
            with early stage tech companies in niche areas such as self-driving
            car tech, AI, biotech, crypto, drone delivery, cybersecurity and
            even orbital (outer space) logistics. Jellypepper was{' '}
            <a
              href="https://raw.studio/blog/raw-studio-acquires-jellypepper-to-expand-its-reach-to-the-startup-ecosystem/"
              rel="noopener noreferrer"
              target="_blank"
            >
              acquired
            </a>{' '}
            by Raw Studio in 2024.
          </p>
          <p>
            Earlier in my career, I was the Head of Product and Design at{' '}
            <a
              href="https://www.spaceship.com.au/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Spaceship
            </a>{' '}
            (a leading Australian investing platform later{' '}
            <a
              href="https://www.spaceship.com.au/news/etoro-completes-acquisition-spaceship/"
              rel="noopener noreferrer"
              target="_blank"
            >
              acquired
            </a>{' '}
            by eToro); contracted for{' '}
            <a
              href="https://www.rga.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              R/GA
            </a>{' '}
            and did a product design internship at{' '}
            <a
              href="https://www.palantir.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Palantir
            </a>{' '}
            in Palo Alto, California.
          </p>
          <p>
            I've had the pleasure of working with open source organizations. You
            may have seen some of my work out there — I rebranded{' '}
            <a
              href="https://eslint.org/blog/2022/08/redesigning-eslint/"
              rel="noopener noreferrer"
              target="_blank"
            >
              ESLint
            </a>{' '}
            and redesigned the{' '}
            <a
              href="https://nodejs.org/en/blog/announcements/diving-into-the-nodejs-website-redesign"
              rel="noopener noreferrer"
              target="_blank"
            >
              Node.js
            </a>{' '}
            website. I've also been fortunate enough to work on a contracting
            basis with Australian Ethical, Canva, Clipchamp, Google, National
            Geographic, Nike, R/GA, Timberland, Toyota, Westfield and many more
            brilliant companies
            <sup>
              <a
                className="text-xs text-zinc-500 dark:text-zinc-400"
                href="#footnote-1"
                id="footnote-ref-1"
              >
                1
              </a>
            </sup>
            .
          </p>
          <p>
            After hours, I'm exploring new ideas (particularly AI-native apps)
            and building open source software. If you like my OSS work, you can{' '}
            <a
              href="https://github.com/sponsors/haydenbleasel"
              rel="noopener noreferrer"
              target="_blank"
            >
              sponsor me
            </a>
            . When I'm not coding, I love to travel and capture the beauty of
            nature and urban landscapes. I publish my individual clips on{' '}
            <a
              href="https://www.instagram.com/hayden.bleasel/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Instagram
            </a>{' '}
            and my full-length videos on{' '}
            <a
              href="https://www.youtube.com/playlist?list=PLw95VUVc_2gh5oGx-jj9PnatiMKtQBiV2"
              rel="noopener noreferrer"
              target="_blank"
            >
              YouTube
            </a>
            .
          </p>
          <small className="text-xs text-zinc-500 leading-normal dark:text-zinc-400">
            <p id="footnote-1">
              1. Advancell, Airwallex, Audience Republic, Baraja, Brighte,
              Comfort Delgro, Elevio, Faethm, Flaunter, Flirtey, Futrli, Grow,
              Inventia, Kerbly, Lightswap, Lookahead, Notiv, Perlin, Profound,
              Pursuited, Resolution Collective, Rezi, Ribit, Shippit, Siesta
              Campers, Simply Wall St, Snug, Space Machines Company, Spaceship,
              Tank Stream Ventures, Teleqo Technologies, Tyro Payments, UpGuard,
              UTS, Zibbet and Zookal.
            </p>
          </small>
        </Prose>
      </div>
      <div className="lg:pl-20">
        <ul>
          <SocialLink href="https://x.com/haydenbleasel" icon={XIcon}>
            Follow on X
          </SocialLink>
          <SocialLink
            className="mt-4"
            href="https://www.instagram.com/hayden.bleasel/"
            icon={InstagramIcon}
          >
            Follow on Instagram
          </SocialLink>
          <SocialLink
            className="mt-4"
            href="https://github.com/haydenbleasel"
            icon={GitHubIcon}
          >
            Follow on GitHub
          </SocialLink>
          <SocialLink
            className="mt-4"
            href="https://www.linkedin.com/in/haydenbleasel/"
            icon={LinkedInIcon}
          >
            Follow on LinkedIn
          </SocialLink>
          <SocialLink
            className="mt-8 border-zinc-100 border-t pt-8 dark:border-zinc-700/40"
            href="mailto:hello@haydenbleasel.com"
            icon={PaperPlaneIcon}
          >
            hello@haydenbleasel.com
          </SocialLink>
        </ul>
      </div>
    </div>
  </Container>
);

export default About;
