'use client';

import { motion } from 'motion/react';
import type { ComponentProps, ReactNode } from 'react';

type ViewAnimationProps = {
  initial?: ComponentProps<typeof motion.div>['initial'];
  whileInView?: ComponentProps<typeof motion.div>['whileInView'];
  delay?: number;
  children: ReactNode;
};

export const ViewAnimation = ({
  initial,
  whileInView,
  delay,
  children,
}: ViewAnimationProps) => (
  <motion.div
    initial={initial}
    whileInView={whileInView}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ delay, duration: 0.8 }}
  >
    {children}
  </motion.div>
);
