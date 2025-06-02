import { Avatar } from '@/components/avatar';
import { Features } from '@/components/features';
import { FootnoteContent, FootnoteMarker } from '@/components/footnote';
import { Link } from '@/components/link';
import { LocationCard } from '@/components/location-card';
import { MailingList } from '@/components/mailing-list';
import { Section } from '@/components/section';
import { Social } from '@/components/social';
import { Stack } from '@/components/stack';
import { Video } from '@/components/video';
import { env } from '@/lib/env';
import { interviews, speaking } from '@/lib/live';
import { createMetadata } from '@/lib/metadata';
import { projects } from '@/lib/projects';
import { resend } from '@/lib/resend';
import { social } from '@/lib/social';
import { stack } from '@/lib/stack';
import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import type { ComponentProps } from 'react';

const getSubscribers = unstable_cache(
  async () => {
    const contacts = await resend.contacts.list({
      audienceId: env.RESEND_AUDIENCE_ID,
    });

    return contacts.data?.data.length ?? 0;
  },
  ['subscribers'],
  {
    revalidate: 86400, // Cache for 24 hours
    tags: ['subscribers'],
  }
);

const location = '🇺🇸 San Francisco, California';
const timezone = 'America/Los_Angeles';

const Vercel = (props: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>Vercel</title>
    <path d="m256 48 240 416h-480z" fillRule="evenodd" fill="currentColor" />
  </svg>
);

export const metadata: Metadata = createMetadata({
  title: 'Home',
  description: `I'm an Australian Design Engineer living in ${location}. I love creating beautiful software that delights users and reimagines the way we interact with technology.`,
  ogText: `Australian Design Engineer living in ${location}.`,
});

const Home = async () => {
  const subscribers = await getSubscribers();

  return (
    <>
      <Section>
        <Avatar className="h-12 w-12" />
        <h1>Hayden Bleasel</h1>
        <p>
          I&apos;m an Australian Design Engineer living in{' '}
          <LocationCard timezone={timezone}>{location}</LocationCard>. I love
          creating beautiful software that delights users and reimagines the way
          we interact with technology. I&apos;m also an avid drone pilot, gamer
          and open source maintainer.
        </p>
        <p>
          I&apos;m currently on the Developer Experience team at{' '}
          <Vercel className="-translate-y-0.5 mr-px ml-px inline-block size-3.5" />
          <Link href="https://vercel.com">Vercel</Link> where I focus on
          building our community, sharing knowledge and helping developers build
          better products. After hours, I&apos;m exploring new ideas
          (particularly AI-native apps) and building open source software. If
          you like my OSS work, you can{' '}
          <Link href="https://github.com/sponsors/haydenbleasel">
            sponsor me
          </Link>
          .
        </p>
        <p>
          I maintain a small mailing list where I share infrequent updates on my
          projects and what&apos;s new. Join{' '}
          {new Intl.NumberFormat().format(subscribers)} readers if you&apos;re
          interested!
        </p>
        <MailingList />
        <p>
          You can also read my <Link href="/blog">blog</Link>,{' '}
          <Link href="/contact">get in touch</Link> or follow me on these
          platforms.
        </p>
        <ul className="flex flex-wrap gap-1">
          {Object.entries(social)
            .map(([id, { follow }]) => ({ id, follow }))
            .filter(({ follow }) => follow)
            .map(({ id }) => (
              <li key={id}>
                <Social id={id as keyof typeof social} />
              </li>
            ))}
        </ul>
      </Section>
      <Section delay={0.2}>
        <h2>Work</h2>
        <p>
          My previous role was Chief Product Officer at{' '}
          <Link href="https://www.corellium.com/">Corellium</Link>, pioneers of
          an incredible Arm virtualisation platform. I moved to Delray Beach,
          Florida in 2021 to lead the Product, Design and Support teams in
          blurring the line between real and virtual. Their platform is designed
          to assist with security research (typically for government agencies
          and defense contractors looking for OS-level vulnerabilities),
          pentesting, DevSecOps and training. In my last year as CPO, we
          achieved a{' '}
          <Link href="https://www.corellium.com/blog/record-growth-innovation-2024">
            50%+ increase in ARR
          </Link>{' '}
          and a 97% renewal rate; and rolled out new solutions in the Enterprise
          and Automotive space.
        </p>
        <p>
          Before that, I was Director of{' '}
          <Link href="https://jellypepper.com/">Jellypepper</Link>, an
          award-winning digital agency for disruptive startups. We worked with
          early stage tech companies in niche areas such as self-driving car
          tech, AI, biotech, crypto, drone delivery, cybersecurity and even
          orbital (outer space) logistics. Jellypepper was{' '}
          <Link href="https://raw.studio/blog/raw-studio-acquires-jellypepper-to-expand-its-reach-to-the-startup-ecosystem/">
            acquired
          </Link>{' '}
          by Raw Studio in 2024.
        </p>
        <p>
          Earlier in my career, I was the Head of Product and Design at{' '}
          <Link href="https://www.spaceship.com.au/">Spaceship</Link>, a leading
          Australian investing platform later{' '}
          <Link href="https://www.spaceship.com.au/news/etoro-completes-acquisition-spaceship/">
            acquired by eToro
          </Link>
          ; and did a product design internship at{' '}
          <Link href="https://www.palantir.com/">Palantir</Link>. Through
          various contracts, I was also fortunate enough to work with Australian
          Ethical, Canva, Clipchamp, ESLint, Google, National Geographic, Nike,
          Node.js, R/GA, Timberland, Toyota, Westfield and many more brilliant
          companies
          <FootnoteMarker index={1} />.
        </p>
        <p>
          I've also enjoyed working with open source organizations. You may have
          seen some of my work out there &mdash;{' '}
          <Link href="https://eslint.org/blog/2022/08/redesigning-eslint/">
            ESLint
          </Link>
          ,{' '}
          <Link href="https://nodejs.org/en/blog/announcements/diving-into-the-nodejs-website-redesign">
            Node.js
          </Link>{' '}
          and <Link href="https://plugins.swc.rs/">SWC plugins</Link> for
          example.
        </p>
      </Section>
      <Section delay={0.4}>
        <h2>Projects</h2>
        <p>
          I've built a lot of projects, apps and tools over the years. Many have
          failed and some have succeeded, but I've learned a lot from each of
          them.
        </p>
        <p>
          One of my earlier successes was a tool for learning, improving and
          generating code with AI called{' '}
          <Link href="https://www.refraction.com/">Refraction</Link> which was{' '}
          <Link href="https://x.com/haydenbleasel/status/1678770475647012864">
            acquired
          </Link>{' '}
          by Twistag in 2023. Refraction was used by the world's most innovative
          companies, including Amazon, Accenture, Bentley, Cisco, IKEA, Repl.it,
          Roblox, Softbank, Sega, TikTok, Uber, Yahoo and more
          <FootnoteMarker index={2} />.
        </p>
        <p>Many of my projects are still active or in progress, including:</p>
        <ul className="list-disc pl-5">
          {projects.map((project) => (
            <li key={project.name}>
              <Link href={project.link}>{project.name}</Link> -{' '}
              {project.description}
            </li>
          ))}
        </ul>
      </Section>
      <Section delay={0.6}>
        <h2>Adventures</h2>
        <p>
          I love to explore new places and capture the beauty of nature and
          urban landscapes. I currently have a DJI Mavic 3 Pro which sports a
          Hasselblad triple-camera system capable of recording 4K video at
          60FPS. I publish my individual clips on{' '}
          <Link href="https://www.instagram.com/hayden.bleasel/">
            Instagram
          </Link>{' '}
          and my full-length videos on{' '}
          <Link href="https://www.youtube.com/playlist?list=PLw95VUVc_2gh5oGx-jj9PnatiMKtQBiV2">
            YouTube
          </Link>
          .
        </p>
        <p>
          Here's my latest full-length video from Minnesota and South Dakota —
          an expedition through the frozen plains of the Midwestern United
          States.
        </p>
        <Video url="https://www.youtube.com/watch?v=cdlTnSk5DIg" />
      </Section>
      <Section delay={0.8}>
        <h2>Stack</h2>
        <p>Here's some tools, technology and products I use every day.</p>
        <Stack data={stack} />
      </Section>
      <Section delay={1}>
        <h2>Speaking and Interviews</h2>
        <p>Some conferences, meetups and interviews I've been a part of.</p>
        <Features
          data={[...speaking, ...interviews].sort((a, b) => b.year - a.year)}
        />
      </Section>
      <div className="-mx-8 border-t border-dotted p-8">
        <Section delay={1.2}>
          <FootnoteContent index={1}>
            I've also worked with Advancell, Airwallex, Audience Republic,
            Baraja, Brighte, Comfort Delgro, Elevio, Faethm, Flaunter, Flirtey,
            Futrli, Grow, Inventia, Kerbly, Lightswap, Lookahead, Notiv, Perlin,
            Pursuited, Resolution Collective, Rezi, Ribit, Shippit, Siesta
            Campers, Simply Wall St, Snug, Space Machines Company, Spaceship,
            Tank Stream Ventures, Teleqo Technologies, Tyro Payments, UpGuard,
            UTS, Zibbet and Zookal.
          </FootnoteContent>
          <FootnoteContent index={2}>
            Refraction was used by Accenture, AKQA, Amazon, Bentley, Canva,
            CapGemini, Cisco, Experian, ExpressVPN, Google, H&M, Ikea, John
            Deere, Nespresso, PandaDoc, Qantas, Rakuten, Red Bull, Repl.it,
            Roblox, Softbank, Sega, Tiktok, Uber, Washington Post, Wix, Yahoo,
            Zoho and ZoomInfo.
          </FootnoteContent>
        </Section>
      </div>
      <footer className="text-foreground-lighter text-sm leading-relaxed">
        <p>
          &copy; {new Date().getFullYear()} Hayden Bleasel. All rights reserved.
        </p>
        <Link href="https://logo.dev" aria-label="Logo API" target="_blank">
          Logos provided by Logo.dev
        </Link>
        <p>
          View the{' '}
          <Link href="https://github.com/haydenbleasel/website">
            source code
          </Link>
          .
        </p>
      </footer>
    </>
  );
};

export default Home;
