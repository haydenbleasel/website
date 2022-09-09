import { useKeyboardEvent, useLocalStorageValue } from '@react-hookz/web';
import { Command } from 'cmdk';
import dynamic from 'next/dynamic';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import type { ComponentProps, FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { Icon, Icon as IconType } from 'react-feather';
import {
  ChevronRight,
  Compass,
  ArrowUpRight,
  Award,
  Book,
  Briefcase,
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
  Search,
} from 'react-feather';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import parseError from '../utils/parseError';
import { social } from '../utils/social';
import LoadingIcon from './loadingIcon';

type ServerItemProps = {
  name: string;
  href?: string;
  icon?: string;
};

const pages = [
  {
    icon: Home,
    href: '/',
    name: 'Home',
  },
  {
    icon: Users,
    href: '/clients',
    name: 'Clients',
  },
  {
    icon: ThumbsUp,
    href: '/recommendations',
    name: 'Recommendations',
  },
  {
    icon: Send,
    href: '/resume',
    name: 'Resume',
  },
  {
    icon: Star,
    href: '/featured',
    name: 'Featured',
  },
  {
    icon: Award,
    href: '/games',
    name: 'Games',
  },
  {
    icon: Compass,
    href: '/education',
    name: 'Education',
  },
  {
    icon: Music,
    href: '/playlists',
    name: 'Playlists',
  },
  {
    icon: MessageSquare,
    href: '/contact',
    name: 'Contact',
  },
];

const Item: FC<
  ComponentProps<typeof Command.Item> & {
    href?: string;
    icon?: Icon;
    page?: boolean;
    group?: string;
  }
> = ({ icon: Icon, children, onSelect, href, page, group, ...props }) => {
  let handleSelect = onSelect;
  let external = false;
  const router = useRouter();

  if (href) {
    if (href.startsWith('/')) {
      handleSelect = async () => router.push(href);
    } else {
      external = true;
      handleSelect = () => window.open(href, '_blank');
    }
  }

  return (
    <Command.Item
      className="-mx-2 flex cursor-pointer items-center justify-between gap-2 rounded-sm p-2 text-md aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800"
      onSelect={handleSelect}
      {...props}
    >
      <div className="flex items-center gap-2">
        {Icon && (
          <Icon size={16} className="text-neutral-400 dark:text-neutral-600" />
        )}
        {group && (
          <>
            <span className="shrink-0 text-neutral-600 line-clamp-1 dark:text-neutral-400">
              {group}
            </span>
            <ChevronRight
              size={16}
              className="shrink-0 text-neutral-400 dark:text-neutral-600"
            />
          </>
        )}
        <span className="text-neutral-900 line-clamp-1 dark:text-white">
          {children}
        </span>
      </div>
      {external && (
        <ArrowUpRight
          className="shrink-0 text-neutral-400 dark:text-neutral-600"
          size={16}
        />
      )}
      {page && (
        <ChevronRight
          className="shrink-0 text-neutral-400 dark:text-neutral-600"
          size={16}
        />
      )}
    </Command.Item>
  );
};

const Group: FC<ComponentProps<typeof Command.Group>> = (props) => (
  <Command.Group className="mb-4 space-y-1 last:mb-0" {...props} />
);

const SocialItem: FC<typeof social[number]> = ({
  id,
  name,
  url,
  invertDark,
}) => {
  const icon: FC = () => (
    <Image
      src={`/social/${id}.svg`}
      width={16}
      height={16}
      quality={100}
      alt=""
      className={invertDark ? 'dark:brightness-0 dark:invert' : ''}
    />
  );

  return (
    <Item key={id} icon={icon} href={url}>
      {name}
    </Item>
  );
};

const hydrateItem = (
  { icon, name, ...props }: ServerItemProps,
  group?: string
) => {
  const Icon = icon
    ? (dynamic(
        async () => {
          const feather = await import(
            /* webpackChunkName: "someModule" */
            'react-feather'
          );
          return feather[icon as keyof typeof feather] as IconType;
        },
        { ssr: false }
      ) as FC)
    : undefined;

  return (
    <Item key={name} group={group} icon={Icon} {...props}>
      {name}
    </Item>
  );
};

const CommandMenu: FC = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<string>('');
  const [, setTheme, removeTheme] = useLocalStorageValue<string | undefined>(
    'theme',
    undefined
  );
  const customMenuItems = useSWR<{
    projects: ServerItemProps[];
    caseStudies: ServerItemProps[];
    landingPages: ServerItemProps[];
    workPosts: ServerItemProps[];
    devPosts: ServerItemProps[];
    mediumPosts: ServerItemProps[];
  }>('/api/command-bar', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useKeyboardEvent(
    true,
    (event) => {
      if (event.key === 'j' && event.metaKey) {
        setOpen((oldOpen) => !oldOpen);
        return;
      }

      if (!search || page) {
        if (event.key === 'Escape' || event.key === 'Backspace') {
          setPage('');
          return;
        }
      }

      if (event.key === 'Escape') {
        setOpen(false);
      }
    },
    [],
    { eventOptions: { passive: true } }
  );

  useEffect(() => {
    inputRef.current?.focus();
    setSearch('');

    dialogRef.current?.style.setProperty('transform', 'scale(0.98)');

    setTimeout(() => {
      dialogRef.current?.style.setProperty('transform', 'scale(1)');
    }, 100);
  }, [page]);

  useEffect(() => {
    if (customMenuItems.error) {
      const message = parseError(customMenuItems.error);
      toast.error(message);
    }
  }, [customMenuItems.error]);

  useEffect(() => {
    if (customMenuItems.data) {
      setLoading(false);
    }
  }, [customMenuItems.data]);

  useEffect(() => {
    const onRouteChangeComplete = () => setOpen(false);

    router.events.on('routeChangeComplete', onRouteChangeComplete);
    onRouteChangeComplete();

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <Command.Dialog
      value={value}
      onValueChange={setValue}
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-50/80 backdrop-blur-sm dark:bg-neutral-800/80"
    >
      <div
        className="w-full max-w-xl rounded-md border border-neutral-200 bg-white drop-shadow-2xl transition-transform dark:border-neutral-700 dark:bg-neutral-900"
        ref={dialogRef}
      >
        <div className="relative flex items-center gap-2 border-b border-neutral-200 px-3 dark:border-neutral-700">
          <Search
            size={16}
            className="text-neutral-500 dark:text-neutral-400"
          />
          <Command.Input
            className="w-full bg-transparent py-3 text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-white dark:placeholder:text-neutral-600"
            placeholder={page ? `${page}...` : 'Start typing...'}
            value={search}
            onValueChange={setSearch}
            ref={inputRef}
          />
          {loading && <LoadingIcon />}
        </div>
        <Command.List className="h-full max-h-[25rem] min-h-[15rem] overflow-auto p-4 text-sm text-neutral-500 dark:text-neutral-400">
          <Command.Empty>No results found.</Command.Empty>

          {(Boolean(search) || !page) && (
            <>
              <Group heading="Pages">
                {pages.map(({ name, ...props }) => (
                  <Item key={name} {...props}>
                    {name}
                  </Item>
                ))}
                <Item icon={Book} onSelect={() => setPage('Blog')} page>
                  Blog
                </Item>
                <Item icon={Zap} onSelect={() => setPage('Projects')} page>
                  Projects
                </Item>
                <Item icon={Briefcase} onSelect={() => setPage('Work')} page>
                  Work
                </Item>
                {customMenuItems.data?.landingPages.map((item) =>
                  hydrateItem(item)
                )}
              </Group>

              <Group heading="Social">
                {social.map(SocialItem)}
                <Item
                  icon={Code}
                  href="https://github.com/haydenbleasel/daylight"
                >
                  View source code
                </Item>
              </Group>

              <Group heading="Utilities">
                <Item icon={Sun} onSelect={() => setPage('Theme')} page>
                  Change theme...
                </Item>
              </Group>
            </>
          )}

          {(Boolean(search) || page === 'Work') && (
            <>
              <Item href="/work" group="Work">
                All work
              </Item>
              {customMenuItems.data?.workPosts.map((item) =>
                hydrateItem(item, 'Work')
              )}
            </>
          )}

          {(Boolean(search) || page === 'Blog') && (
            <>
              <Item href="/blog" group="Blog">
                All posts
              </Item>
              {customMenuItems.data?.caseStudies.map((item) =>
                hydrateItem(item, 'Blog')
              )}
              {customMenuItems.data?.devPosts.map((item) =>
                hydrateItem(item, 'Blog')
              )}
              {customMenuItems.data?.mediumPosts.map((item) =>
                hydrateItem(item, 'Blog')
              )}
            </>
          )}

          {(Boolean(search) || page === 'Projects') && (
            <>
              <Item href="/projects" group="Projects">
                All projects
              </Item>
              {customMenuItems.data?.projects.map((item) =>
                hydrateItem(item, 'Projects')
              )}
            </>
          )}

          {(Boolean(search) || page === 'Theme') && (
            <>
              <Item
                group="Theme"
                value="light"
                onSelect={() => setTheme('light')}
                icon={Sun}
              >
                Light
              </Item>
              <Item
                group="Theme"
                value="dark"
                onSelect={() => setTheme('dark')}
                icon={Moon}
              >
                Dark
              </Item>
              <Item
                group="Theme"
                value="default"
                onSelect={() => removeTheme()}
                icon={Sunset}
              >
                System Default
              </Item>
            </>
          )}
        </Command.List>
      </div>
    </Command.Dialog>
  );
};

export default CommandMenu;
