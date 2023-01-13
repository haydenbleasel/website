import Link from 'next/link';
import type { FC, ReactNode } from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import Logo from '@/components/logo';
import Corellium from '@/public/logos/corellium.svg';
import Neutral from '@/public/logos/neutral.svg';
import getLocation from '@/lib/twitter';

import AustralianEthical from '@/public/logos/australian-ethical.svg';
import Beskar from '@/public/logos/beskar.svg';
import Canva from '@/public/logos/canva.svg';
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
import getSteamGames from '@/lib/steam';
import formatList from '@/lib/formatList';
import ContactForm from '@/components/contactForm';
import SocialLinks from '@/components/socialLinks';

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

const Footnote: FC<{
  children: string;
}> = ({ children }) => (
  <Link href={`#footnote-${children}`}>
    <sup className="text-zinc-400 dark:text-zinc-500">{children}</sup>
  </Link>
);

const Home = async (): Promise<ReactNode> => {
  const location = await getLocation();
  const games = await getSteamGames();
  const totalPlaytime = games.reduce((acc, game) => acc + game.playtime, 0);
  const totalHours = Math.floor(totalPlaytime / 60);
  const totalAchievements = games.reduce(
    (acc, { achievements }) => acc + achievements.achieved,
    0
  );
  const perfectGames = games.filter(
    (game) =>
      game.achievements.total > 0 &&
      game.achievements.achieved === game.achievements.total
  );
  const mostPlayedGames = formatList(
    games
      .sort((gameA, gameB) => gameB.playtime - gameA.playtime)
      .slice(0, 5)
      .map((game) => game.name)
  );

  return (
    <main className="grid gap-12">
      <header className="grid gap-8">
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
              'text-base font-medium',
              'text-zinc-900',
              'dark:text-white'
            )}
          >
            Hayden Bleasel
          </h1>
          <p className={clsx('text-zinc-500', 'dark:text-zinc-400')}>
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
        </div>
      </header>
      <div className="grid gap-4">
        <p>
          Australian product designer and frontend engineer living in the U.S.
          Currently leading Product and Design at{' '}
          <Logo icon={Corellium as FC} href="https://www.corellium.com/">
            Corellium
          </Logo>
          , scaling global reforestation with{' '}
          <Logo icon={Neutral as FC} href="https://tryneutral.com/">
            Neutral
          </Logo>{' '}
          and building stuff at{' '}
          <Logo icon={Beskar as FC} href="https://www.beskar.co/">
            Beskar
          </Logo>
          . You can{' '}
          <Link
            href="https://read.cv/haydenbleasel"
            target="_blank"
            rel="noopener noreferrer"
          >
            download my CV
          </Link>{' '}
          or{' '}
          <Link
            href="https://dribbble.com/haydenbleasel"
            target="_blank"
            rel="noopener noreferrer"
          >
            browse my portfolio
          </Link>
          .
        </p>
        <p>
          Occasional freelancer / consultant → <ContactForm />.
        </p>
        <hr />
        <p>
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
          <Logo icon={NatGeo as FC} href="https://www.nationalgeographic.com/">
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
          , some of which through{' '}
          <Logo icon={RGA as FC} href="https://rga.com/">
            R/GA
          </Logo>
          .
        </p>
        <p>
          I previously ran{' '}
          <Logo icon={Jellypepper as FC} href="https://jellypepper.com/">
            Jellypepper
          </Logo>
          , a digital agency focused on startups in “disruptive industries” such
          as self-driving cars, AI, biotechnology, cryptocurrency, renewable
          energy, drone delivery, cybersecurity and even outer-space logistics.
          Before all that, I was Head of Product and Design at{' '}
          <Logo icon={Spaceship as FC} href="https://www.spaceship.com.au/">
            Spaceship
          </Logo>
          , interned at{' '}
          <Logo icon={Palantir as FC} href="https://www.palantir.com/">
            Palantir
          </Logo>{' '}
          and worked with a whole bunch of other companies
          <Footnote>1</Footnote>.
        </p>
        <p>
          In 2016, I graduated with two degrees from the University of
          Technology, Sydney &mdash; a Bachelor of Business (Management) and a
          Bachelor of Science in Information Technology (Enterprise Systems
          Development). I also completed{' '}
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
        <p>
          I also play a lot of games, you can find me on{' '}
          <Link href="https://steamcommunity.com/id/0x_crusader/">Steam</Link>.
          I have {totalHours} hours of tracked playtime, {totalAchievements}{' '}
          achievements across {games.length} games and {perfectGames.length}{' '}
          perfect games<Footnote>2</Footnote>. My most played games are{' '}
          {mostPlayedGames}.
        </p>
        <hr />
        <p id="footnote-1" className="text-sm text-zinc-500 dark:text-zinc-400">
          <sup>1</sup> I have also worked with {formatList(clients)}.
        </p>
        <p id="footnote-2" className="text-sm text-zinc-500 dark:text-zinc-400">
          <sup>2</sup> A perfect game is one where you&apos;ve wasted so much
          time, you&apos;ve managed to complete the entire game and collect all
          achievements.
        </p>
        <hr />
        <SocialLinks />
      </div>
    </main>
  );
};

export default Home;
