'use client';
import type { FC, ReactNode } from 'react';
import { useEffect } from 'react';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import { toast, Toaster } from 'react-hot-toast';
import useOnline from '@haydenbleasel/use-online';

type ProvidersProps = {
  children: ReactNode;
};

const Providers: FC<ProvidersProps> = ({ children }) => {
  const isOnline = useOnline();

  useEffect(() => {
    if (!isOnline) {
      toast.error(
        'You have been disconnected from the internet. Certain features may not work until you reconnect.'
      );
    }
  }, [isOnline]);

  return (
    <>
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      <Toaster position="bottom-right" />
    </>
  );
};

export default Providers;
