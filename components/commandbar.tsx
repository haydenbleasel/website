/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { Action, ActionImpl } from 'kbar';
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
  KBarResults,
  useRegisterActions,
} from 'kbar';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { ChevronRight } from 'react-feather';
import toast from 'react-hot-toast';
import { useLocalStorage } from 'react-use';

type RenderParams<T = ActionImpl | string> = {
  item: T;
  active: boolean;
};

const RenderResults: FC = () => {
  const { results } = useMatches();

  const onRender = useCallback(
    (props: RenderParams) =>
      typeof props.item === 'string' ? (
        <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
          {props.item}
        </div>
      ) : (
        <div
          className={`flex cursor-pointer items-center justify-between py-3 px-4 transition-colors ${
            props.active ? 'bg-gray-100 dark:bg-gray-800' : 'bg-transparent'
          }`}
        >
          <div className="flex items-center gap-1">
            {props.item.parent && (
              <>
                <span
                  className={`text-md transition-colors ${
                    props.active
                      ? 'text-gray-500 dark:text-gray-400'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {
                    props.item.ancestors.find(
                      (ancestor) =>
                        ancestor.id === (props.item as ActionImpl).parent
                    )?.name
                  }
                </span>
                <span className="text-gray-400 dark:text-gray-500">
                  <ChevronRight size={16} />
                </span>
              </>
            )}
            <span className="text-md text-gray-900 line-clamp-1 dark:text-white">
              {props.item.name}
            </span>
          </div>
          {props.item.shortcut && (
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-md transition-colors ${
                props.active
                  ? 'bg-gray-200 dark:bg-gray-700'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              <span
                className={`font-mono text-sm font-medium leading-normal transition-colors ${
                  props.active
                    ? 'text-gray-500 dark:text-gray-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                {props.item.shortcut}
              </span>
            </div>
          )}
        </div>
      ),
    []
  );

  return <KBarResults items={results} onRender={onRender} />;
};

type ServerAction = Omit<Action, 'perform'> & {
  link: string;
};

const LoadCustomActions = () => {
  const [customActions, setCustomActions] = useState<Action[]>([]);
  const { push } = useRouter();

  useEffect(() => {
    const loadContent = async () => {
      const contentActions = await fetch('/api/kbar');
      const { actions } = (await contentActions.json()) as {
        actions: ServerAction[];
      };

      const newActions: Action[] = actions.map(({ link, ...props }) => ({
        ...props,
        perform: async () => push(link),
      }));

      setCustomActions(newActions);
    };

    if (!customActions.length) {
      loadContent().catch((error) => {
        const message =
          error instanceof Error ? error.message : (error as string);
        toast.error(message);
      });
    }
  }, [customActions.length, push]);

  useRegisterActions(customActions, [customActions]);

  return null;
};

const CommandBar: FC = ({ children }) => {
  const { push } = useRouter();
  const [theme, setTheme, removeTheme] = useLocalStorage<string | undefined>(
    'theme',
    undefined
  );
  const actions = [
    {
      id: 'home',
      name: 'Home',
      shortcut: ['h'],
      keywords: 'home',
      section: 'Pages',
      perform: async () => push('/'),
    },
    {
      id: 'blog',
      name: 'Blog',
      keywords: 'blog',
      section: 'Pages',
    },
    {
      id: 'clients',
      name: 'Clients',
      shortcut: ['c'],
      keywords: 'clients',
      section: 'Pages',
      perform: async () => push('/clients'),
    },
    {
      id: 'work',
      name: 'Work',
      shortcut: ['w'],
      keywords: 'work',
      section: 'Pages',
      perform: async () => push('/work'),
    },
    {
      id: 'neutral',
      name: 'Neutral',
      shortcut: ['n'],
      keywords: 'neutral',
      section: 'Pages',
      perform: async () => push('/neutral'),
    },
    {
      id: 'recommendations',
      name: 'Recommendations',
      shortcut: ['r'],
      keywords: 'recommendations',
      section: 'Pages',
      perform: async () => push('/recommendations'),
    },
    {
      id: 'resume',
      name: 'Resume',
      shortcut: ['/'],
      keywords: 'resume',
      section: 'Pages',
      perform: async () => push('/resume'),
    },
    {
      id: 'featured',
      name: 'Featured',
      shortcut: ['f'],
      keywords: 'featured',
      section: 'Pages',
      perform: async () => push('/featured'),
    },
    {
      id: 'blog-index',
      name: 'All Posts',
      parent: 'blog',
      shortcut: ['b'],
      perform: async () => push('/blog'),
    },
    {
      id: 'playlists',
      name: 'Playlists',
      keywords: 'playlists',
      section: 'Pages',
      perform: async () => push('/playlists'),
      shortcut: ['p'],
    },
    {
      id: 'theme',
      name: 'Change theme...',
      shortcut: ['t'],
      keywords: 'theme',
      section: 'Utilities',
    },
    {
      id: 'lightMode',
      name: 'Light',
      shortcut: ['l'],
      keywords: 'light',
      parent: 'theme',
      perform: () => setTheme('light'),
    },
    {
      id: 'darkMode',
      name: 'Dark',
      shortcut: ['d'],
      keywords: 'dark',
      parent: 'theme',
      perform: () => setTheme('dark'),
    },
    {
      id: 'systemTheme',
      name: 'System Default',
      shortcut: ['s'],
      keywords: 'light',
      parent: 'theme',
      perform: () => removeTheme(),
    },
  ];

  useEffect(() => {
    if (
      theme === 'dark' ||
      (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <KBarProvider actions={actions}>
      <LoadCustomActions />
      <KBarPortal>
        <KBarPositioner className="z-30 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
          <KBarAnimator className="mx-auto w-full max-w-xl overflow-hidden rounded-lg bg-white drop-shadow-2xl dark:bg-gray-900">
            <KBarSearch className="font-md w-full border-b border-gray-100 bg-transparent py-3 px-4 font-normal text-gray-900 outline-none dark:border-gray-800 dark:text-white" />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  );
};

export default CommandBar;
