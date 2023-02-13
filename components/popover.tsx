'use client';

import {
  Root,
  Trigger,
  Anchor,
  Portal,
  Content,
} from '@radix-ui/react-popover';
import type { FC, ReactNode } from 'react';

const Popover: FC<{
  children: ReactNode;
  content: ReactNode;
}> = ({ children, content }) => (
  <Root>
    <Trigger asChild>{children}</Trigger>
    <Anchor />
    <Portal>
      <Content className="rounded border border-neutral-200 bg-white">
        {content}
      </Content>
    </Portal>
  </Root>
);

export default Popover;
