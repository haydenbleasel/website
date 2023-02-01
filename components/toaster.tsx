'use client';

import type { FC } from 'react';
import type { ToasterProps } from 'react-hot-toast';
import { Toaster as ReactHotToaster } from 'react-hot-toast';

const Toaster: FC<ToasterProps> = (props) => (
  <ReactHotToaster position="bottom-right" {...props} />
);

export default Toaster;
