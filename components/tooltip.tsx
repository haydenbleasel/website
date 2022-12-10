'use client';

import { Root, Trigger, Portal, Content, Arrow } from '@radix-ui/react-tooltip';
import type { FC, ReactNode } from 'react';

type TooltipProps = {
  label: ReactNode;
  children: ReactNode;
};

const Tooltip: FC<TooltipProps> = ({ label, children }) => (
  <Root>
    <Trigger asChild>{children}</Trigger>
    <Portal>
      <Content
        sideOffset={4}
        className="rounded-md bg-zinc-900/90 px-[10px] py-[6px] text-sm text-white shadow-sm backdrop-blur-sm dark:bg-white/90 dark:text-zinc-900"
      >
        {label}
        <Arrow className="fill-zinc-900 dark:fill-white" />
      </Content>
    </Portal>
  </Root>
);

export default Tooltip;
