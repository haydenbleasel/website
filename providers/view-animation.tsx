'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ComponentProps, ReactNode } from 'react';

type ViewAnimationProps = {
  initial?: ComponentProps<typeof motion.div>['initial'];
  whileInView?: ComponentProps<typeof motion.div>['whileInView'];
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

export const ViewAnimation = ({
  initial,
  whileInView,
  delay,
  className,
  children,
}: ViewAnimationProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return children;
  }

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      className={className}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay, duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};
