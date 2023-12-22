'use client';

import {
  AvatarIcon,
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
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEventListener } from '@react-hookz/web';
import { cn } from '@/lib/utils';
import { PeopleIcon } from '@/components/icons';
import type { FC } from 'react';

export const Navigation: FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const pages = [
    {
      name: 'Home',
      href: '/',
      icon: HomeIcon,
      shortcut: 'h',
      active: pathname === '/',
    },
    {
      name: 'About',
      href: '/about',
      icon: AvatarIcon,
      shortcut: 'a',
      active: pathname.startsWith('/about'),
    },
    {
      name: 'Work',
      href: '/work',
      icon: ListBulletIcon,
      shortcut: 'w',
      active: pathname.startsWith('/work'),
    },
    {
      name: 'Blog',
      href: '/blog',
      icon: Pencil2Icon,
      shortcut: 'b',
      active: pathname.startsWith('/blog'),
    },
    {
      name: 'Stack',
      href: '/stack',
      icon: LayersIcon,
      shortcut: 's',
      active: pathname.startsWith('/stack'),
    },
    {
      name: 'Clients',
      href: '/clients',
      icon: PeopleIcon,
      shortcut: 'c',
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
      name: 'Video',
      href: '/video',
      icon: VideoIcon,
      shortcut: 'v',
      active: pathname.startsWith('/video'),
    },
  ];

  const resources = [
    {
      name: 'Design',
      href: '/design',
      icon: FigmaLogoIcon,
      shortcut: 'f',
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

  const connect = [
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
      shortcut: 'o',
      active: pathname.startsWith('/contact'),
    },
    {
      name: 'X',
      href: 'https://twitter.com/haydenbleasel',
      icon: ChatBubbleIcon,
      active: false,
    },
    {
      name: 'Store',
      href: 'https://store.haydenbleasel.com/',
      icon: CrumpledPaperIcon,
    },
  ];

  const sections = [
    { links: pages },
    { name: 'Resources', links: resources },
    { name: 'Connect', links: connect },
  ];

  useEventListener(
    typeof window === 'undefined' ? null : window,
    'keydown',
    (event: KeyboardEvent) => {
      const page = [...pages, ...resources, ...connect].find(
        ({ shortcut }) => shortcut === event.key
      );

      if (page && !event.metaKey && !event.ctrlKey && !event.altKey) {
        router.push(page.href);
      }
    },
    { passive: true }
  );

  return (
    <nav>
      {sections.map((section, sectionIndex) => (
        <section className="p-4" key={sectionIndex}>
          {section.name ? (
            <p className="mx-2 mb-2 text-xs font-semibold tracking-wide uppercase text-zinc-600 dark:text-zinc-400">
              {section.name}
            </p>
          ) : null}
          <div className="flex flex-col gap-0.5">
            {section.links.map(
              ({ name, href, icon: Icon, shortcut, active }) => (
                <Link
                  href={href}
                  key={name}
                  className={cn(
                    'p-2 flex items-center gap-2.5 rounded-md border',
                    active
                      ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-700'
                      : 'text-zinc-500 dark:text-zinc-400 border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <p
                    className={cn('text-sm leading-[22px] font-medium flex-1')}
                  >
                    {name}
                  </p>
                  {shortcut ? (
                    <div
                      className={cn(
                        'border rounded w-4 shrink-0 h-5 text-xs font-medium flex items-center justify-center',
                        'border-zinc-300 dark:border-zinc-700',
                        'text-zinc-500 dark:text-zinc-400'
                      )}
                    >
                      {shortcut}
                    </div>
                  ) : null}
                  {href.startsWith('http') ? (
                    <ExternalLinkIcon className="w-4 h-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
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
