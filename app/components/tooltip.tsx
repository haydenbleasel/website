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
        className="bg-white px-3 py-2 rounded-md shadow-sm"
      >
        {label}
        <Arrow className="fill-white" />
      </Content>
    </Portal>
  </Root>
);

export default Tooltip;
