import Link from 'next/link';
import type { FC, ReactNode } from 'react';

import clsx from 'clsx';
import { Fragment } from 'react';
import Image from '@/components/image';
import Logo from '@/components/logo';
import Corellium from '@/public/logos/corellium.svg';
import Neutral from '@/public/logos/neutral.svg';
import getLocation from '@/lib/twitter';

import Post from '@/components/post';
import Airwallex from '@/public/logos/airwallex.svg';
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
import getSteamGames from '@/lib/steam';
import formatList from '@/lib/formatList';
import education from '@/content/education.json';
import Divider from '@/components/divider';

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
    (game) => game.achievements.achieved === game.achievements.total
  );
  const mostPlayedGames = formatList(
    games
      .sort((gameA, gameB) => gameB.playtime - gameA.playtime)
      .slice(0, 5)
      .map((game) => game.name)
  );

  return (
    <main className="grid gap-12 prose-h2:m-0 prose-p:m-0">
      <header className="grid gap-8">
        <Image
          src="/avatar.jpg"
          alt=""
          width={64}
          height={64}
          className="m-0 h-16 w-16 overflow-hidden rounded-full"
          priority
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
          <p
            className={clsx(
              'font-light',
              'text-zinc-500',
              'dark:text-zinc-400'
            )}
          >
            Chief Product Officer at Corellium
          </p>
          {location && (
            <div className="mt-3 inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
              </span>
              <span className="text-sm font-normal">
                Currently in {location}
              </span>
            </div>
          )}
        </div>
      </header>
      <div className="grid gap-4">
        <p>
          Product designer and frontend engineer. Blurring the line between real
          and virtual at{' '}
          <Logo icon={Corellium as FC} href="https://www.corellium.com/">
            Corellium
          </Logo>
          . Scaling planetary reforestation with{' '}
          <Logo icon={Neutral as FC} href="https://tryneutral.com/">
            Neutral
          </Logo>
          . Building stuff at{' '}
          <Logo icon={Beskar as FC} href="https://www.beskar.co/">
            Beskar
          </Logo>
          . Occasional freelancer / consultant →{' '}
          <Link href="/contact">get in touch</Link>.
        </p>

        <hr className="my-8" />

        <p>
          I&apos;m an Australian Product Designer and Frontend Engineer living
          in Delray Beach, Florida. I currently lead the Product and Design
          teams at{' '}
          <Logo icon={Corellium as FC} href="https://www.corellium.com/">
            Corellium
          </Logo>
          , where we blur the line between real and virtual. After hours, I work
          on a global reforestation platform called{' '}
          <Logo icon={Neutral as FC} href="https://tryneutral.com/">
            Neutral
          </Logo>
          , with which we&apos;ve helped plant thousands of trees and offset
          hundreds of tonnes of CO₂e.
        </p>

        <p>
          I&apos;ve had the privilege of working with many fantastic companies
          including{' '}
          <Logo icon={Google as FC} href="https://www.google.com/">
            Google
          </Logo>
          ,{' '}
          <Logo icon={Palantir as FC} href="https://www.palantir.com/">
            Palantir
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
          There I worked with many incredible startups who raised billions of
          dollars in funding, such as{' '}
          <Logo icon={Airwallex as FC} href="https://www.airwallex.com/us">
            Airwallex
          </Logo>
          , and a handful of which were acquired, such as{' '}
          <Logo icon={Clipchamp as FC} href="https://clipchamp.com/en/">
            Clipchamp
          </Logo>
          .
        </p>
        <p>
          Before all that, I was Head of Product and Design at{' '}
          <Logo icon={Spaceship as FC} href="https://www.spaceship.com.au/">
            Spaceship
          </Logo>{' '}
          where we grew a pre-launch waitlist of 28,000 people, raised $20M+ in
          Seed / Series A funding and created the future of superannuation in
          Australia.
        </p>
        <p>I&apos;ve studied at university and occasionally study online.</p>
        <div>
          {education.map((edu, index) => (
            <Fragment key={edu.name}>
              {index > 0 && <Divider />}
              <Post
                title={edu.name}
                description={edu.institution}
                date={String(edu.year)}
                slug={edu.link}
              />
            </Fragment>
          ))}
        </div>
        <p>
          I also play a lot of games, you can find me on{' '}
          <Link href="https://steamcommunity.com/id/0x_crusader/">Steam</Link>.
          I have {totalHours} hours of tracked playtime, {totalAchievements}{' '}
          achievements across {games.length} games and {perfectGames.length}{' '}
          perfect games (where all achievements are unlocked). My most played
          games are {mostPlayedGames}.
        </p>
        <p>
          Other than that, I&apos;m either spending time in the gym, ideating on
          new side projects and occasionally working with very select clients on
          freelance / moonlight work.
        </p>
      </div>
    </main>
  );
};

export default Home;
