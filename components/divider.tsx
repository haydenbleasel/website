'use client';
import type { FC } from 'react';
import * as Separator from '@radix-ui/react-separator';

const Divider: FC = () => (
  <Separator.Root className="border-t border-zinc-200" />
);

export default Divider;
