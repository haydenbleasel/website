import type { FC, ReactNode } from 'react';
import { Fragment } from 'react';

import Link from 'next/link';
import Post from '../blog/post';
import Logo from '@/components/logo';
import Airwallex from '@/public/logos/airwallex.svg';
import AustralianEthical from '@/public/logos/australian-ethical.svg';
import Canva from '@/public/logos/canva.svg';
import Corellium from '@/public/logos/corellium.svg';
import Clipchamp from '@/public/logos/clipchamp.svg';
import Google from '@/public/logos/google.svg';
import Jellypepper from '@/public/logos/jellypepper.svg';
import NatGeo from '@/public/logos/natgeo.svg';
import Neutral from '@/public/logos/neutral.svg';
import Nike from '@/public/logos/nike.svg';
import Palantir from '@/public/logos/palantir.svg';
import RGA from '@/public/logos/rga.svg';
import Spaceship from '@/public/logos/spaceship.svg';
import Timberland from '@/public/logos/timberland.svg';
import Toyota from '@/public/logos/toyota.svg';
import Westfield from '@/public/logos/westfield.svg';
import { social } from '@/lib/social';
import getSteamGames from '@/lib/steam';
import formatList from '@/lib/formatList';
import education from '@/content/education.json';
import Divider from '@/components/divider';

const steamUrl = social.find(({ name }) => name === 'Steam')?.url ?? '';

const About = async (): Promise<ReactNode> => {
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
    <main className="grid gap-8 prose-h2:m-0 prose-p:m-0">
      <h1>About</h1>
      <p>
        I&apos;m an Australian Product Designer and Frontend Engineer living in
        Delray Beach, Florida. I currently lead the Product and Design teams at{' '}
        <Logo icon={Corellium as FC} href="http://corellium.com/">
          Corellium
        </Logo>
        , where we blur the line between real and virtual. After hours, I work
        on a global reforestation platform called{' '}
        <Logo icon={Neutral as FC} href="https://tryneutral.com/">
          Neutral
        </Logo>
        , with which we&apos;ve helped plant thousands of trees and offset
        hundeds of tonnes of CO₂e.
      </p>
      <div className="grid gap-4">
        <h2>Work History</h2>
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
          as self-driving cars, AI, biotechnology, cryptocurency, renewable
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
          <Logo icon={Spaceship as FC} href="https://spaceship.com.au/">
            Spaceship
          </Logo>{' '}
          where we grew a pre-launch waitlist of 28,000 people, raised $20M+ in
          Seed / Series A funding and created the future of superannuation in
          Australia.
        </p>
      </div>
      <div className="grid gap-4">
        <h2>Education</h2>
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
      </div>
      <div className="grid gap-4">
        <h2>Other</h2>
        <p>
          I also play a lot of games, you can find me on{' '}
          <Link href={steamUrl}>Steam</Link>. I have {totalHours} hours of
          tracked playtime, {totalAchievements} achievements across{' '}
          {games.length} games and {perfectGames.length} perfect games (where
          all achievements are unlocked). My most played games are{' '}
          {mostPlayedGames}.
        </p>
        <p>
          Other than that, I&apos;m either spending time in the gym, ideating on
          new side projects and occasionally working with very select clients on
          freelance / moonlight work.
        </p>
        <p>
          <Link href="/contact">Get in touch</Link> if you want to work with me
          on something.
        </p>
      </div>
    </main>
  );
};

export default About;
