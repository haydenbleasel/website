'use client';

import { TooltipProvider } from '@radix-ui/react-tooltip';
import type { FC, ReactNode } from 'react';

const Providers: FC<{
  children: ReactNode;
}> = ({ children }) => <TooltipProvider>{children}</TooltipProvider>;

export default Providers;
