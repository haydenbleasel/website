import type { FC } from 'react';
import type { TooltipContentProps } from '@radix-ui/react-tooltip';
import { Root, Trigger, Content, Arrow } from '@radix-ui/react-tooltip';

type TooltipProps = TooltipContentProps & {
  label: string;
};

const Tooltip: FC<TooltipProps> = ({ label, children, ...props }) => (
  <Root>
    <Trigger className="flex animate-enter opacity-0">{children}</Trigger>
    <Content
      side="top"
      align="center"
      sideOffset={0}
      alignOffset={0}
      className="rounded-sm bg-neutral-900/90 py-1 px-2 text-sm text-white shadow-lg backdrop-blur-sm"
      {...props}
    >
      {label}
      <Arrow className="fill-neutral-900/90" />
    </Content>
  </Root>
);

export default Tooltip;
