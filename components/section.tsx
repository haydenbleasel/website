'use client';

import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'motion/react';
import type { ComponentProps, ReactNode } from 'react';

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

export const Section = ({ className, delay, children }: ViewAnimationProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return children;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      animate={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      className={cn('grid gap-4', className)}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay, duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};
