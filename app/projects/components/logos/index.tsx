import Image from 'next/image';
import Marquee from 'react-fast-marquee';

import { Section } from '@/components/section';
import Accenture from './files/accenture.svg';
import Akqa from './files/akqa.svg';
import Amazon from './files/amazon.svg';
import Bentley from './files/bentley.svg';
import Canva from './files/canva.svg';
import Capgemini from './files/capgemini.svg';
import Cisco from './files/cisco.svg';
import Experian from './files/experian.svg';
import Expressvpn from './files/expressvpn.svg';
import Google from './files/google.svg';
import Hm from './files/h-m.svg';
import Ikea from './files/ikea.svg';
import JohnDeere from './files/john-deere.svg';
import Nespresso from './files/nespresso.svg';
import Pandadoc from './files/pandadoc.svg';
import Qantas from './files/qantas.svg';
import Rakuten from './files/rakuten.svg';
import Redbull from './files/redbull.svg';
import Replit from './files/repl-it.svg';
import Roblox from './files/roblox.svg';
import Sega from './files/sega.svg';
import Softbank from './files/softbank.svg';
import Tiktok from './files/tiktok.svg';
import Uber from './files/uber.svg';
import WashingtonPost from './files/washington-post.svg';
import Wix from './files/wix.svg';
import Yahoo from './files/yahoo.svg';
import Zoho from './files/zoho.svg';
import Zoominfo from './files/zoominfo.svg';

const logos = [
  Accenture,
  Akqa,
  Amazon,
  Bentley,
  Canva,
  Capgemini,
  Cisco,
  Experian,
  Expressvpn,
  Google,
  Hm,
  Ikea,
  JohnDeere,
  Nespresso,
  Pandadoc,
  Qantas,
  Rakuten,
  Redbull,
  Replit,
  Roblox,
  Sega,
  Softbank,
  Tiktok,
  Uber,
  WashingtonPost,
  Wix,
  Yahoo,
  Zoho,
  Zoominfo,
];

export const Logos = () => (
  <Section className="flex flex-col gap-8 py-16">
    <p className="text-center text-muted-foreground text-sm">
      My projects have been used by the world&apos;s most innovative companies
    </p>
    <Marquee autoFill>
      {logos.map((logo) => (
        <Image
          src={logo}
          alt=""
          width={80}
          height={40}
          key={logo.src}
          className="mx-12 h-10 w-20 object-contain opacity-50 invert"
        />
      ))}
    </Marquee>
  </Section>
);
