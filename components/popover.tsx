import type { FC, ReactNode } from 'react';
import React from 'react';
import { Root, Trigger, Portal, Content, Arrow } from '@radix-ui/react-popover';
import type { PopoverProps as RadixPopoverProps } from '@radix-ui/react-popover';
import clsx from 'clsx';

type PopoverProps = RadixPopoverProps & {
  trigger: ReactNode;
  children: ReactNode;
};

const Popover: FC<PopoverProps> = ({ trigger, children, ...props }) => (
  <Root {...props}>
    <Trigger asChild>{trigger}</Trigger>
    <Portal>
      <Content
        className={clsx(
          'flex items-center rounded-md border shadow-lg shadow-zinc-800/5 outline-none',
          'border-zinc-100 bg-white',
          'dark:border-zinc-800 dark:bg-zinc-900'
        )}
        sideOffset={8}
      >
        <div className="max-h-[40vh] overflow-y-auto p-2">{children}</div>
        <Arrow className="fill-white dark:fill-zinc-900" />
      </Content>
    </Portal>
  </Root>
);

export default Popover;
