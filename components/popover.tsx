import type { FC, ReactNode } from 'react';
import React from 'react';
import { Root, Trigger, Portal, Content, Arrow } from '@radix-ui/react-popover';
import type { PopoverProps as RadixPopoverProps } from '@radix-ui/react-popover';

type PopoverProps = RadixPopoverProps & {
  trigger: ReactNode;
  children: ReactNode;
};

const Popover: FC<PopoverProps> = ({ trigger, children, ...props }) => (
  <Root {...props}>
    <Trigger asChild>{trigger}</Trigger>
    <Portal>
      <Content
        className="bg-white flex shadow-lg shadow-gray-800/5 items-center border-gray-100 border rounded-md"
        sideOffset={8}
      >
        <div className="max-h-[40vh] p-2 overflow-y-auto">{children}</div>
        <Arrow className="fill-white" />
      </Content>
    </Portal>
  </Root>
);

export default Popover;
