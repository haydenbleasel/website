'use client';

import { useState } from 'react';
import { useKeyboardEvent } from '@react-hookz/web';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { sections } from '@/data/navigation';
import { cn } from '@/lib/utils';
import type { FC } from 'react';

export const CommandBar: FC = () => {
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();
  const router = useRouter();

  useKeyboardEvent(
    'k',
    (event) => {
      if (event.metaKey) {
        event.preventDefault();
        setOpen((newOpen) => !newOpen);
      }
    },
    [],
    { eventOptions: { passive: true } }
  );

  const handleSelect = (href: string) => {
    if (href.startsWith('http')) {
      window.location.assign(href);
      return;
    }

    router.push(href);
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {sections.map((section) => (
          <CommandGroup key={section.name} heading={section.name}>
            {section.links.map((item) => (
              <CommandItem
                key={item.name}
                onSelect={() => handleSelect(item.href)}
                className="flex items-center gap-4 justify-between"
              >
                <p>{item.name}</p>
                {item.shortcut ? (
                  <kbd
                    className={cn(
                      'border rounded w-4 shrink-0 h-5 text-[10px] font-medium flex items-center justify-center',
                      'border-zinc-300 dark:border-zinc-700',
                      'text-zinc-500 dark:text-zinc-400'
                    )}
                  >
                    {item.shortcut.toUpperCase()}
                  </kbd>
                ) : null}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
        <CommandGroup heading="Theme">
          <CommandItem onSelect={() => setTheme('system')}>
            System Theme
          </CommandItem>
          <CommandItem onSelect={() => setTheme('light')}>
            Light Theme
          </CommandItem>
          <CommandItem onSelect={() => setTheme('dark')}>
            Dark Theme
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
