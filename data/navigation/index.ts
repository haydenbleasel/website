import {
  CalendarIcon,
  ChatBubbleIcon,
  EnvelopeClosedIcon,
  FigmaLogoIcon,
  GlobeIcon,
  HomeIcon,
  ListBulletIcon,
  Pencil2Icon,
  TokensIcon,
  VideoIcon,
  GitHubLogoIcon,
  LayersIcon,
  CrumpledPaperIcon,
  BellIcon,
  DiscordLogoIcon,
} from '@radix-ui/react-icons';
import { PeopleIcon } from '@/components/icons';

import Twitter from './icons/x.svg';
import Instagram from './icons/instagram.svg';
import GitHub from './icons/github.svg';
import ProductHunt from './icons/producthunt.svg';
import LinkedIn from './icons/linkedin.svg';
import Dribbble from './icons/dribbble.svg';

import type { StaticImport } from 'next/dist/shared/lib/get-img-props';

type NavigationItem = {
  readonly name: string;
  readonly href: string;
  readonly icon?: typeof HomeIcon | typeof PeopleIcon;
  readonly image?: StaticImport;
  readonly shortcut?: string;
  readonly active?: (path: string) => boolean;
};

export const pages: NavigationItem[] = [
  {
    name: 'Home',
    href: '/',
    icon: HomeIcon,
    shortcut: 'h',
    active: (pathname: string) => pathname === '/',
  },
  {
    name: 'Mailing List',
    href: '/mailing-list',
    icon: EnvelopeClosedIcon,
    shortcut: 'm',
    active: (pathname: string) => pathname.startsWith('/mailing-list'),
  },
  {
    name: 'Contact',
    href: '/contact',
    icon: ChatBubbleIcon,
    shortcut: 'c',
    active: (pathname: string) => pathname.startsWith('/contact'),
  },
];

export const work: NavigationItem[] = [
  {
    name: 'Work',
    href: '/work',
    icon: ListBulletIcon,
    shortcut: 'w',
    active: (pathname: string) => pathname.startsWith('/work'),
  },
  {
    name: 'Clients',
    href: '/clients',
    icon: PeopleIcon,
    shortcut: 'l',
    active: (pathname: string) => pathname.startsWith('/clients'),
  },
  {
    name: 'Apps',
    href: '/apps',
    icon: TokensIcon,
    shortcut: 'a',
    active: (pathname: string) => pathname.startsWith('/apps'),
  },
  {
    name: 'Speaking',
    href: '/speaking',
    icon: CalendarIcon,
    shortcut: 't',
    active: (pathname: string) => pathname.startsWith('/speaking'),
  },
  {
    name: 'Features',
    href: '/features',
    icon: GlobeIcon,
    shortcut: 'f',
    active: (pathname: string) => pathname.startsWith('/features'),
  },
  {
    name: 'Services',
    href: '/services',
    icon: BellIcon,
    shortcut: 'r',
    active: (pathname: string) => pathname.startsWith('/services'),
  },
  {
    name: 'Stack',
    href: '/stack',
    icon: LayersIcon,
    shortcut: 's',
    active: (pathname: string) => pathname.startsWith('/stack'),
  },
];

export const personal: NavigationItem[] = [
  {
    name: 'Blog',
    href: '/blog',
    icon: Pencil2Icon,
    shortcut: 'b',
    active: (pathname: string) => pathname.startsWith('/blog'),
  },
  {
    name: 'Gaming',
    href: '/gaming',
    icon: DiscordLogoIcon,
    shortcut: 'n',
    active: (pathname: string) => pathname.startsWith('/gaming'),
  },
  {
    name: 'Video',
    href: '/video',
    icon: VideoIcon,
    shortcut: 'v',
    active: (pathname: string) => pathname.startsWith('/video'),
  },
];

export const resources: NavigationItem[] = [
  {
    name: 'Design',
    href: '/design',
    icon: FigmaLogoIcon,
    shortcut: 'd',
    active: (pathname: string) => pathname.startsWith('/design'),
  },
  {
    name: 'Code',
    href: '/code',
    icon: GitHubLogoIcon,
    shortcut: 'g',
    active: (pathname: string) => pathname.startsWith('/code'),
  },
];

export const connect: NavigationItem[] = [
  {
    name: 'Store',
    href: 'https://store.haydenbleasel.com/',
    icon: CrumpledPaperIcon,
  },
  {
    href: 'https://twitter.com/haydenbleasel',
    name: 'X',
    image: Twitter as StaticImport,
  },
  {
    href: 'https://github.com/haydenbleasel',
    name: 'GitHub',
    image: GitHub as StaticImport,
  },
  {
    href: 'https://www.instagram.com/hayden.bleasel/',
    name: 'Instagram',
    image: Instagram as StaticImport,
  },
  {
    href: 'https://www.producthunt.com/@haydenbleasel',
    name: 'Product Hunt',
    image: ProductHunt as StaticImport,
  },
  {
    href: 'https://www.linkedin.com/in/haydenbleasel/',
    name: 'LinkedIn',
    image: LinkedIn as StaticImport,
  },
  {
    href: 'https://dribbble.com/haydenbleasel',
    name: 'Dribbble',
    image: Dribbble as StaticImport,
  },
];

export const sections = [
  { links: pages },
  { name: 'Work', links: work },
  { name: 'Personal', links: personal },
  { name: 'Resources', links: resources },
  { name: 'Connect', links: connect },
];

const collections = sections.flatMap(({ links }) => links);
const shortcuts = collections.map(({ shortcut }) => shortcut).filter(Boolean);

if (shortcuts.length !== new Set(shortcuts).size) {
  const duplicates = shortcuts.filter(
    (shortcut, index, array) => array.indexOf(shortcut) !== index
  );

  throw new Error(
    `Duplicate shortcuts found: ${duplicates
      .map((shortcut) => `"${shortcut}"`)
      .join(', ')}`
  );
}
