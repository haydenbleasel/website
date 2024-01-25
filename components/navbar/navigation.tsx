'use client';

import { ExternalLinkIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEventListener } from '@react-hookz/web';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { sections } from '@/data/navigation';
import type { FC } from 'react';

export const Navigation: FC = () => {
  const pathname = usePathname();
  const router = useRouter();

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

      const collections = sections.flatMap(({ links }) => links);
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
                    active?.(pathname)
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
                      quality={100}
                    />
                  ) : null}
                  <p
                    className={cn('text-sm leading-[22px] font-medium flex-1')}
                  >
                    {name}
                  </p>
                  {shortcut ? (
                    <kbd
                      className={cn(
                        'border rounded w-4 shrink-0 h-5 text-[10px] font-medium flex items-center justify-center',
                        'border-zinc-300 dark:border-zinc-700',
                        'text-zinc-500 dark:text-zinc-400'
                      )}
                    >
                      {shortcut.toUpperCase()}
                    </kbd>
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
