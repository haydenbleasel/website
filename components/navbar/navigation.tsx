'use client';

import {
  CalendarIcon,
  ChatBubbleIcon,
  EnvelopeClosedIcon,
  ExternalLinkIcon,
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
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEventListener } from '@react-hookz/web';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { PeopleIcon } from '@/components/icons';

import Twitter from './icons/x.svg';
import Instagram from './icons/instagram.svg';
import GitHub from './icons/github.svg';
import ProductHunt from './icons/producthunt.svg';
import LinkedIn from './icons/linkedin.svg';
import Dribbble from './icons/dribbble.svg';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import type { FC } from 'react';

type NavbarItem = {
  readonly name: string;
  readonly href: string;
  readonly icon?: typeof HomeIcon | typeof PeopleIcon;
  readonly image?: StaticImport;
  readonly shortcut?: string;
  readonly active?: boolean;
};

export const Navigation: FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const pages: NavbarItem[] = [
    {
      name: 'Home',
      href: '/',
      icon: HomeIcon,
      shortcut: 'h',
      active: pathname === '/',
    },
    {
      name: 'Mailing List',
      href: '/mailing-list',
      icon: EnvelopeClosedIcon,
      shortcut: 'm',
      active: pathname.startsWith('/mailing-list'),
    },
    {
      name: 'Contact',
      href: '/contact',
      icon: ChatBubbleIcon,
      shortcut: 'c',
      active: pathname.startsWith('/contact'),
    },
  ];

  const work: NavbarItem[] = [
    {
      name: 'Work',
      href: '/work',
      icon: ListBulletIcon,
      shortcut: 'w',
      active: pathname.startsWith('/work'),
    },
    {
      name: 'Clients',
      href: '/clients',
      icon: PeopleIcon,
      shortcut: 'l',
      active: pathname.startsWith('/clients'),
    },
    {
      name: 'Apps',
      href: '/apps',
      icon: TokensIcon,
      shortcut: 'a',
      active: pathname.startsWith('/apps'),
    },
    {
      name: 'Speaking',
      href: '/speaking',
      icon: CalendarIcon,
      shortcut: 't',
      active: pathname.startsWith('/speaking'),
    },
    {
      name: 'Features',
      href: '/features',
      icon: GlobeIcon,
      shortcut: 'f',
      active: pathname.startsWith('/features'),
    },
    {
      name: 'Services',
      href: '/services',
      icon: BellIcon,
      shortcut: 'r',
      active: pathname.startsWith('/services'),
    },
    {
      name: 'Stack',
      href: '/stack',
      icon: LayersIcon,
      shortcut: 's',
      active: pathname.startsWith('/stack'),
    },
  ];

  const personal: NavbarItem[] = [
    {
      name: 'Blog',
      href: '/blog',
      icon: Pencil2Icon,
      shortcut: 'b',
      active: pathname.startsWith('/blog'),
    },
    {
      name: 'Gaming',
      href: '/gaming',
      icon: DiscordLogoIcon,
      shortcut: 'n',
      active: pathname.startsWith('/gaming'),
    },
    {
      name: 'Video',
      href: '/video',
      icon: VideoIcon,
      shortcut: 'v',
      active: pathname.startsWith('/video'),
    },
  ];

  const resources: NavbarItem[] = [
    {
      name: 'Design',
      href: '/design',
      icon: FigmaLogoIcon,
      shortcut: 'd',
      active: pathname.startsWith('/design'),
    },
    {
      name: 'Code',
      href: '/code',
      icon: GitHubLogoIcon,
      shortcut: 'g',
      active: pathname.startsWith('/code'),
    },
  ];

  const connect: NavbarItem[] = [
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

  const collections = [
    ...pages,
    ...resources,
    ...work,
    ...personal,
    ...connect,
  ];

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

  const sections = [
    { links: pages },
    { name: 'Work', links: work },
    { name: 'Personal', links: personal },
    { name: 'Resources', links: resources },
    { name: 'Connect', links: connect },
  ];

  useEventListener(
    typeof window === 'undefined' ? null : window,
    'keydown',
    (event: KeyboardEvent) => {
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.target !== document.body
      ) {
        return;
      }

      const page = collections.find(({ shortcut }) => shortcut === event.key);

      if (page) {
        router.push(page.href);
      }
    },
    { passive: true }
  );

  return (
    <nav>
      {sections.map((section, sectionIndex) => (
        <section className="p-3 space-y-2" key={sectionIndex}>
          {section.name ? (
            <p className="mx-3 text-xs font-semibold tracking-wide uppercase text-zinc-600 dark:text-zinc-400">
              {section.name}
            </p>
          ) : null}
          <div className="space-y-0.5">
            {section.links.map(
              ({ name, href, icon: Icon, image, shortcut, active }) => (
                <Link
                  href={href}
                  key={name}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    href.startsWith('http') ? 'noopener noreferrer' : undefined
                  }
                  className={cn(
                    'group px-3 py-2 flex items-center gap-2.5 rounded-md border transition-colors',
                    active
                      ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-700'
                      : 'text-zinc-500 dark:text-zinc-400 border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'
                  )}
                >
                  {Icon ? <Icon className="w-4 h-4 shrink-0" /> : null}
                  {image ? (
                    <Image
                      src={image}
                      alt={name}
                      className="m-0 w-4 h-4 group-hover:brightness-0 dark:group-hover:invert transition-all"
                      width={20}
                      height={20}
                    />
                  ) : null}
                  <p
                    className={cn('text-sm leading-[22px] font-medium flex-1')}
                  >
                    {name}
                  </p>
                  {shortcut ? (
                    <div
                      className={cn(
                        'border rounded w-4 shrink-0 h-5 text-[10px] font-medium flex items-center justify-center',
                        'border-zinc-300 dark:border-zinc-700',
                        'text-zinc-500 dark:text-zinc-400'
                      )}
                    >
                      {shortcut.toUpperCase()}
                    </div>
                  ) : null}
                  {href.startsWith('http') ? (
                    <ExternalLinkIcon
                      className={cn(
                        'w-4 h-4 shrink-0 transition-colors',
                        'text-zinc-400 group-hover:text-zinc-500',
                        'dark:text-zinc-500 dark:group-hover:text-zinc-400'
                      )}
                    />
                  ) : null}
                </Link>
              )
            )}
          </div>
        </section>
      ))}
    </nav>
  );
};
