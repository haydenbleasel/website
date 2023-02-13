'use client';

import { Root, Trigger, Portal, Content, Arrow } from '@radix-ui/react-tooltip';
import type { FC, ReactNode } from 'react';

const Tooltip: FC<{
  content: string;
  children: ReactNode;
}> = ({ content, children }) => (
  <Root delayDuration={0}>
    <Trigger asChild>{children}</Trigger>
    <Portal>
      <Content className="rounded bg-neutral-900/90 px-3 py-2 text-sm text-white">
        {content}
        <Arrow className="fill-neutral-900/90" />
      </Content>
    </Portal>
  </Root>
);

export default Tooltip;
