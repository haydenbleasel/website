'use client';

import {
  CommandBar as CommandBarComponent,
  useCommandBar,
} from '@haydenbleasel/command-bar';
import Link from 'next/link';
import type { FC } from 'react';
import { Search } from 'lucide-react';
import pages from '@/lib/navigation';

const CommandBar: FC = () => {
  const commandBar = useCommandBar();

  return (
    <CommandBarComponent.Dialog className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-50/80 backdrop-blur-sm dark:bg-zinc-800/80">
      <CommandBarComponent.Container className="w-full max-w-xl rounded-md border border-zinc-200 bg-white drop-shadow-2xl transition-transform dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex items-center border-b border-zinc-200 dark:border-zinc-700">
          <div className="p-3">
            <Search size={16} className="text-zinc-400 dark:text-zinc-600" />
          </div>
          <CommandBarComponent.Input className="w-full border-none bg-transparent py-3 text-zinc-900 shadow-none outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-zinc-600" />
        </div>
        <CommandBarComponent.List className="h-full max-h-[25rem] min-h-[15rem] overflow-auto p-4 text-sm text-zinc-500 dark:text-zinc-400">
          <CommandBarComponent.Empty>Empty State</CommandBarComponent.Empty>
          <CommandBarComponent.Loading />
          <CommandBarComponent.Group
            className="mb-4 space-y-1 last:mb-0"
            heading="Pages"
          >
            {pages.map((page) => (
              <CommandBarComponent.Item
                key={page.name}
                className="-mx-2 rounded-sm aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800"
                onSelect={() => commandBar.toggleOpen(false)}
              >
                <Link
                  href={page.href}
                  className="flex cursor-pointer items-center justify-between gap-2 p-2 text-base text-zinc-900"
                >
                  <div className="flex items-center gap-3">
                    <page.icon size={16} />
                    {page.name}
                  </div>
                </Link>
              </CommandBarComponent.Item>
            ))}

            <CommandBarComponent.Separator />
          </CommandBarComponent.Group>
        </CommandBarComponent.List>
      </CommandBarComponent.Container>
    </CommandBarComponent.Dialog>
  );
};

export default CommandBar;
