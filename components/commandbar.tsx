/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { Action, ActionImpl } from 'kbar';
import {
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
  KBarResults,
  useRegisterActions,
} from 'kbar';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { createElement, useState, useEffect } from 'react';
import type { Icon as IconType } from 'react-feather';
import {
  ArrowUpRight,
  Award,
  Book,
  Briefcase,
  ChevronRight,
  Code,
  Home,
  MessageSquare,
  Moon,
  Music,
  Send,
  Star,
  Sun,
  Sunset,
  ThumbsUp,
  Users,
  Zap,
} from 'react-feather';
import toast from 'react-hot-toast';
import { useLocalStorageValue } from '@react-hookz/web';
import dynamic from 'next/dynamic';
import slugify from 'slugify';
import { social } from '../utils/social';
import parseError from '../utils/parseError';
import LoadingIcon from './loadingIcon';
import Tooltip from './tooltip';

type RenderParams<T = ActionImpl | string> = {
  item: T;
  active: boolean;
};

type ItemProps = {
  id?: string;
  name: string;
  shortcut?: string;
  section?: string;
  parent?: string;
  href?: string;
  action?: () => void;
  icon?: FC;
};

type ServerAction = Omit<Action, 'perform' | 'icon'> & {
  link: string;
  icon?: string;
};

const items: ItemProps[] = [
  {
    name: 'Home',
    shortcut: 'h',
    section: 'Pages',
    href: '/',
    icon: Home,
  },
  {
    id: 'blog',
    name: 'Blog',
    section: 'Pages',
    icon: Book,
  },
  {
    id: 'projects',
    name: 'Projects',
    section: 'Pages',
    icon: Zap,
  },
  {
    id: 'work',
    name: 'Work',
    section: 'Pages',
    icon: Briefcase,
  },
  {
    name: 'All Work',
    parent: 'work',
    shortcut: 'w',
    href: '/work',
  },
  {
    name: 'Clients',
    shortcut: 'c',
    section: 'Pages',
    href: '/clients',
    icon: Users,
  },
  {
    name: 'Recommendations',
    shortcut: 'r',
    section: 'Pages',
    href: '/recommendations',
    icon: ThumbsUp,
  },
  {
    name: 'Resume',
    shortcut: '/',
    section: 'Pages',
    href: '/resume',
    icon: Send,
  },
  {
    name: 'Featured',
    shortcut: 'f',
    section: 'Pages',
    href: '/featured',
    icon: Star,
  },
  {
    name: 'Games',
    shortcut: 'g',
    section: 'Pages',
    href: '/games',
    icon: Award,
  },
  {
    name: 'All Posts',
    parent: 'blog',
    shortcut: 'b',
    href: '/blog',
  },
  {
    name: 'All Projects',
    parent: 'projects',
    shortcut: 'x',
    href: '/projects',
  },
  {
    name: 'Playlists',
    section: 'Pages',
    href: '/playlists',
    shortcut: 'p',
    icon: Music,
  },
  {
    name: 'Contact',
    section: 'Pages',
    href: '/contact',
    icon: MessageSquare,
  },
  ...social.map(({ id, name, url, invertDark }) => ({
    name,
    icon: () => (
      <Image
        src={`/social/${id}.svg`}
        width={16}
        height={16}
        quality={100}
        alt=""
        className={invertDark ? 'dark:brightness-0 dark:invert' : ''}
      />
    ),
    section: 'Social',
    href: url,
  })),
  {
    name: 'View source code',
    section: 'Social',
    icon: Code,
    href: 'https://github.com/haydenbleasel/daylight',
  },
];

const Header: FC<{ children: string }> = ({ children }) => (
  <div className="px-4 py-2 text-sm text-neutral-500 dark:text-neutral-400">
    {children}
  </div>
);

const Item: FC<RenderParams<ActionImpl> & { item: { external?: boolean } }> = ({
  item,
  active,
}) => (
  <div
    className={`flex cursor-pointer items-center justify-between gap-2 py-3 px-4 transition-colors ${
      active ? 'bg-neutral-100 dark:bg-neutral-800' : 'bg-transparent'
    }`}
  >
    <div className="flex items-center gap-1">
      {item.icon && <div className="mr-2 flex">{item.icon}</div>}
      {item.parent && (
        <>
          <span
            className={`text-md transition-colors ${
              active
                ? 'text-neutral-500 dark:text-neutral-400'
                : 'text-neutral-400 dark:text-neutral-500'
            }`}
          >
            {
              item.ancestors.find((ancestor) => ancestor.id === item.parent)
                ?.name
            }
          </span>
          <span className="text-neutral-400 dark:text-neutral-500">
            <ChevronRight size={16} />
          </span>
        </>
      )}
      <span className="text-md text-neutral-900 line-clamp-1 dark:text-white">
        {item.name}
      </span>
    </div>
    {item.shortcut && (
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-sm font-mono text-sm font-medium leading-normal transition-colors ${
          active
            ? 'bg-neutral-200 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400'
            : 'bg-neutral-100 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500'
        }`}
      >
        {item.shortcut}
      </div>
    )}
    {item.external && (
      <ArrowUpRight
        size={16}
        className="shrink-0 text-neutral-400 dark:text-neutral-500"
      />
    )}
  </div>
);

const getCustomActions = async () => {
  const contentActions = await fetch('/api/kbar', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_PASSPHRASE ?? ''}`,
    },
  });

  const { actions } = (await contentActions.json()) as {
    actions: ServerAction[];
  };

  return actions;
};

const onRender = ({ item, active }: RenderParams) => (
  <div>
    {typeof item === 'string' ? (
      <Header>{item}</Header>
    ) : (
      <Item item={item} active={active} />
    )}
  </div>
);

const CommandBar: FC = () => {
  const router = useRouter();
  const [, setTheme, removeTheme] = useLocalStorageValue<string | undefined>(
    'theme',
    undefined
  );
  const [customActions, setCustomActions] = useState<Action[]>([]);
  const { results } = useMatches();

  useEffect(() => {
    const loadContent = async () => {
      const actions = await getCustomActions();

      const newActions: Action[] = actions.map(({ link, icon, ...props }) => {
        const action: Action = {
          ...props,
          perform: link.startsWith('/')
            ? async () => router.push(link)
            : () => window.open(link, '_blank'),
        };

        if (!icon) {
          return action;
        }

        const Icon = dynamic(
          async () => {
            const feather = await import(
              /* webpackChunkName: "someModule" */
              'react-feather'
            );
            return feather[icon as keyof typeof feather] as IconType;
          },
          { ssr: false }
        );

        action.icon = (
          <Icon size={16} className="text-neutral-500 dark:text-neutral-400" />
        );

        return action;
      });

      setCustomActions(newActions);
    };

    if (!customActions.length) {
      loadContent().catch((error) => {
        const message = parseError(error);

        toast.error(message);
      });
    }
  }, [customActions.length, router]);

  useEffect(() => {
    items.push(
      {
        id: 'theme',
        name: 'Change theme...',
        shortcut: 't',
        section: 'Utilities',
        icon: Sun,
      },
      {
        name: 'Light',
        shortcut: 'l',
        parent: 'theme',
        action: () => setTheme('light'),
        icon: Sun,
      },
      {
        name: 'Dark',
        shortcut: 'd',
        parent: 'theme',
        action: () => setTheme('dark'),
        icon: Moon,
      },
      {
        name: 'System Default',
        shortcut: 's',
        parent: 'theme',
        action: () => removeTheme(),
        icon: Sunset,
      }
    );
  }, [removeTheme, setTheme]);

  const kbarActions: Action[] = items.map((item) => ({
    id: item.id ?? slugify(item.name, { lower: true, strict: true }),
    name: item.name,
    icon: item.icon ? (
      <div className="text-neutral-500 dark:text-neutral-400">
        {createElement(item.icon, { size: 16 } as Record<string, unknown>)}
      </div>
    ) : undefined,
    keywords: item.name,
    shortcut: item.shortcut ? [item.shortcut] : undefined,
    parent: item.parent,
    section: item.section,
    perform:
      item.action || item.href
        ? () => {
            if (item.action) {
              item.action();
              return;
            }

            if (item.href) {
              if (item.href.startsWith('/')) {
                router.push(item.href).catch((error) => {
                  const message = parseError(error);

                  toast.error(message);
                });
                return;
              }

              window.open(item.href, '_blank');
            }
          }
        : undefined,
  }));

  useRegisterActions(
    [...kbarActions, ...customActions],
    [kbarActions.length, customActions.length]
  );

  return (
    <KBarPortal>
      <KBarPositioner className="z-30 bg-neutral-50/80 backdrop-blur-sm dark:bg-neutral-800/80">
        <KBarAnimator className="mx-auto w-full max-w-xl rounded-md bg-white drop-shadow-2xl dark:bg-neutral-900">
          <div className="relative">
            <KBarSearch className="font-md w-full border-b border-neutral-200 bg-transparent py-3 px-4 font-normal text-neutral-900 outline-none placeholder:text-neutral-500 dark:border-neutral-700 dark:text-white" />
            {!customActions.length && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Tooltip label="Loading custom actions...">
                  <LoadingIcon />
                </Tooltip>
              </div>
            )}
          </div>
          <div className="overflow-hidden rounded-b-md">
            <KBarResults items={results} onRender={onRender} />
          </div>
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
};

export default CommandBar;
