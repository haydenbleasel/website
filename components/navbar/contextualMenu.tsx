'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { Root } from '@radix-ui/react-separator';
import { CircleEllipsis } from 'lucide-react';
import clsx from 'clsx';
import Popover from '../popover';
import useContextMenu from './useContextMenu';

const Separator: FC = () => <Root className="w-px h-full bg-gray-200" />;

const ContextualMenu: FC = () => {
  const { content } = useContextMenu();
  const [open, setOpen] = useState(false);

  if (!content) {
    return null;
  }

  return (
    <>
      <Separator />
      <div className="flex items-center px-1">
        <div className="p-2 group relative">
          <Popover
            onOpenChange={setOpen}
            trigger={
              <CircleEllipsis
                size={20}
                className={clsx(
                  'text-gray-500 group-hover:text-teal-600 transition-colors cursor-pointer',
                  open && 'text-teal-600'
                )}
              />
            }
          >
            {content}
          </Popover>
          <span className="sr-only">More</span>
          <span
            className={clsx(
              'opacity-0 group-hover:opacity-100 transition-opacity absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0',
              open && 'opacity-100'
            )}
          />
        </div>
      </div>
    </>
  );
};

export default ContextualMenu;
