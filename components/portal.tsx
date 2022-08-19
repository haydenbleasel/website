import { Root } from '@radix-ui/react-portal';
import type { FC, ReactNode } from 'react';

type PortalProps = {
  children: ReactNode;
};

const Portal: FC<PortalProps> = (props) => <Root {...props} />;

export default Portal;
