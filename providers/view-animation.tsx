'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

type ViewAnimationProps = {
  initial?: Record<string, string>;
  whileInView?: Record<string, string>;
  animate?: Record<string, string>;
  delay?: number;
  // className?: ComponentProps<typeof motion.div>['className'];
  className?: string;
  children: ReactNode;
};

export const ViewAnimation = ({
  initial,
  whileInView,
  animate,
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
      initial={{ ...initial, filter: 'blur(4px)' }}
      whileInView={{ ...whileInView, filter: 'blur(0px)' }}
      animate={animate}
      className={className}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay, duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};
