import { CommandBar, useCommandBar } from '@haydenbleasel/command-bar';
import useTheme from '@haydenbleasel/use-theme';
import dynamic from 'next/dynamic';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import type { ComponentProps, FC } from 'react';
import { useEffect, useState } from 'react';
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
  ComponentProps<typeof CommandBar.Item> & {
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
    <CommandBar.Item
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
    </CommandBar.Item>
  );
};

const Group: FC<ComponentProps<typeof CommandBar.Group>> = (props) => (
  <CommandBar.Group className="mb-4 space-y-1 last:mb-0" {...props} />
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
  const { open, toggleOpen, page, setPage, search } = useCommandBar();
  const [loading, setLoading] = useState(true);
  const [, setTheme] = useTheme();
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
    const onRouteChangeComplete = () => toggleOpen(false);

    router.events.on('routeChangeComplete', onRouteChangeComplete);
    onRouteChangeComplete();

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [router.events, toggleOpen]);

  return (
    <CommandBar.Dialog
      open={open}
      onOpenChange={toggleOpen}
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-50/80 backdrop-blur-sm dark:bg-neutral-800/80"
    >
      <CommandBar.Container className="w-full max-w-xl rounded-md border border-neutral-200 bg-white drop-shadow-2xl transition-transform dark:border-neutral-700 dark:bg-neutral-900">
        <div className="relative flex items-center gap-2 border-b border-neutral-200 px-3 dark:border-neutral-700">
          <Search
            size={16}
            className="text-neutral-500 dark:text-neutral-400"
          />
          <CommandBar.Input className="w-full bg-transparent py-3 text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-white dark:placeholder:text-neutral-600" />
          {loading && <LoadingIcon />}
        </div>
        <CommandBar.List className="h-full max-h-[25rem] min-h-[15rem] overflow-auto p-4 text-sm text-neutral-500 dark:text-neutral-400">
          <CommandBar.Empty>No results found.</CommandBar.Empty>

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
                onSelect={() => setTheme(null)}
                icon={Sunset}
              >
                System Default
              </Item>
            </>
          )}
        </CommandBar.List>
      </CommandBar.Container>
    </CommandBar.Dialog>
  );
};

export default CommandMenu;