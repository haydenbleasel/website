'use client';
import type { FC, ReactNode } from 'react';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';

type ProvidersProps = {
  children: ReactNode;
};

const Providers: FC<ProvidersProps> = ({ children }) => (
  <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
);

export default Providers;
