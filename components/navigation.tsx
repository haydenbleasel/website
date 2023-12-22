import {
  AvatarIcon,
  CalendarIcon,
  ChatBubbleIcon,
  EnvelopeClosedIcon,
  GlobeIcon,
  HomeIcon,
  ListBulletIcon,
  Pencil2Icon,
  ReaderIcon,
  TokensIcon,
} from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { Link } from './link';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { ActiveProvider } from './active-provider';
import type { FC } from 'react';

const pages = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Work', href: '/work', icon: ListBulletIcon },
  { name: 'Blog', href: '/blog', icon: Pencil2Icon },
  { name: 'Stack', href: '/stack', icon: ReaderIcon },
  { name: 'Mailing List', href: '/mailing-list', icon: EnvelopeClosedIcon },
  { name: 'Clients', href: '/clients', icon: AvatarIcon },
  { name: 'Apps', href: '/apps', icon: TokensIcon },
  { name: 'Speaking', href: '/speaking', icon: CalendarIcon },
  { name: 'Features', href: '/features', icon: GlobeIcon },
  { name: 'Contact', href: '/contact', icon: ChatBubbleIcon },
];

export const Navigation: FC = () => (
  <div
    className={cn(
      'z-50 py-16 sm:py-0 sm:backdrop-blur-sm border-t sm:border-b sm:border-x sm:shadow sm:fixed sm:left-1/2 sm:-translate-x-1/2 sm:bottom-8 sm:rounded-full',
      'sm:bg-white/90 border-neutral-200',
      'dark:sm:bg-neutral-950/90 dark:border-neutral-800'
    )}
  >
    <div className="flex flex-col sm:flex-row flex-wrap sm:flex-nowrap sm:items-center sm:p-1">
      {pages.map(({ name, href, icon: Icon }) => (
        <Tooltip key={name} delayDuration={0}>
          <TooltipTrigger asChild>
            <Link href={href}>
              <ActiveProvider href={href}>
                <div
                  className={cn(
                    'flex items-center gap-2 p-3 bg-transparent transition-colors relative rounded-full',
                    'group-[.active-page]:bg-neutral-100',
                    'dark:group-[.active-page]:bg-neutral-800'
                  )}
                >
                  <Icon
                    className={cn(
                      'w-4 h-4 transition-colors',
                      'text-neutral-600 hover:text-neutral-900',
                      'dark:text-neutral-400 dark:hover:text-white',
                      'group-[.active-page]:text-neutral-900',
                      'dark:group-[.active-page]:text-white'
                    )}
                  />
                  <span className="sm:sr-only">{name}</span>
                </div>
              </ActiveProvider>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <span className="text-sm">{name}</span>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  </div>
);
