'use client';

import {
  CommandBar as CommandBarComponent,
  useCommandBar,
} from '@haydenbleasel/command-bar';
import type { ComponentProps, FC } from 'react';
import { Moon, Search, Sun } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useTheme from '@haydenbleasel/use-theme';
import pages from '@/lib/navigation';

const List: FC<ComponentProps<typeof CommandBarComponent.List>> = (props) => (
  <CommandBarComponent.List
    className="h-full max-h-[25rem] min-h-[15rem] overflow-auto p-4 text-sm text-zinc-500 dark:text-zinc-400"
    {...props}
  />
);

const Item: FC<ComponentProps<typeof CommandBarComponent.Item>> = (props) => (
  <CommandBarComponent.Item
    className="-mx-2 flex cursor-pointer items-center justify-between gap-2 rounded-sm p-2 text-base text-zinc-900 aria-selected:bg-zinc-100 dark:text-white dark:aria-selected:bg-zinc-800"
    {...props}
  />
);

const Group: FC<ComponentProps<typeof CommandBarComponent.Group>> = (props) => (
  <CommandBarComponent.Group className="mb-4 space-y-1 last:mb-0" {...props} />
);

const CommandBar: FC = () => {
  const commandBar = useCommandBar();
  const router = useRouter();
  const [theme, setTheme] = useTheme();
  const ThemeIcon = theme === 'dark' ? Sun : Moon;

  return (
    <CommandBarComponent.Dialog className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-50/80 backdrop-blur-sm dark:bg-zinc-800/80">
      <CommandBarComponent.Container className="w-full max-w-xl rounded-md border border-zinc-200 bg-white drop-shadow-2xl transition-transform dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex items-center border-b border-zinc-200 dark:border-zinc-700">
          <div className="p-3">
            <Search size={16} className="text-zinc-400 dark:text-zinc-600" />
          </div>
          <CommandBarComponent.Input className="w-full border-none bg-transparent py-3 text-zinc-900 shadow-none outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-zinc-600" />
        </div>
        <List>
          <CommandBarComponent.Empty>
            <p>Sorry, no results found.</p>
          </CommandBarComponent.Empty>
          <CommandBarComponent.Loading />
          <Group heading="Pages">
            {pages.map((page) => (
              <Item
                key={page.name}
                onSelect={() => {
                  commandBar.toggleOpen(false);
                  router.push(page.href);
                }}
              >
                <div className="flex items-center gap-3">
                  <page.icon size={16} />
                  {page.name}
                </div>
              </Item>
            ))}
          </Group>
          <Group heading="Utilities">
            <Item
              onSelect={() => {
                commandBar.toggleOpen(false);
                setTheme(theme === 'dark' ? 'light' : 'dark');
              }}
            >
              <div className="flex items-center gap-3">
                <ThemeIcon size={16} />
                Toggle Theme
              </div>
            </Item>
          </Group>
        </List>
      </CommandBarComponent.Container>
    </CommandBarComponent.Dialog>
  );
};

export default CommandBar;
