'use client';
import type { FC } from 'react';
import * as Separator from '@radix-ui/react-separator';

const Divider: FC = () => (
  <Separator.Root className="border-t border-zinc-200 dark:border-zinc-700" />
);

export default Divider;
