import type { FC } from 'react';

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

const Home: FC = () => (
  <main className="grid gap-8">
    <h1>About</h1>
    <p>
      I’m an Australian Product Designer and Frontend Engineer living in Delray
      Beach, Florida. I currently lead the Product and Design teams at{' '}
      <Logo icon={Corellium as FC} href="http://corellium.com/">
        Corellium
      </Logo>
      , where we blur the line between real and virtual. After hours, I work on
      a global reforestation platform called{' '}
      <Logo icon={Neutral as FC} href="https://tryneutral.com/">
        Neutral
      </Logo>
      , with which we’ve helped plant thousands of trees and offset hundeds of
      tonnes of CO₂ equivalent.
    </p>
    <p>
      I’ve had the privilege of working with many fantastic companies including{' '}
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
      , a digital agency focused on startups in “disruptive industries” such as
      self-driving cars, AI, biotechnology, cryptocurency, renewable energy,
      drone delivery, cybersecurity and even outer-space logistics. There I
      worked with many incredible startups who raised billions of dollars in
      funding, such as{' '}
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
      where we grew a pre-launch waitlist of 28,000 people, raised $20M+ in Seed
      / Series A funding and created the future of superannuation in Australia.
    </p>
  </main>
);

export default Home;
