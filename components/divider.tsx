'use client';

import * as Separator from '@radix-ui/react-separator';
import type { FC } from 'react';

const Divider: FC = () => (
  <Separator.Root className="my-8 border-t border-neutral-200 lg:my-16" />
);

export default Divider;
