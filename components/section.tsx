import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';
import type { HTMLAttributes } from 'react';

type SectionProps = HTMLAttributes<HTMLDivElement>;

const Cross = () => (
  <div className="relative h-6 w-6">
    <div className="absolute left-3 h-6 w-px bg-backdrop" />
    <div className="absolute top-3 h-px w-6 bg-backdrop" />

    <PlusIcon
      size={20}
      className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 text-connection"
    />
  </div>
);

export const Section = ({ children, className, ...props }: SectionProps) => (
  <section {...props}>
    <div className="container relative mx-auto">
      <div className={cn('sm:border-x', className)}>{children}</div>
      <div className="-bottom-3 -left-3 absolute z-10 h-6">
        <Cross />
      </div>
      <div className="-bottom-3 -right-3 -translate-x-px absolute z-10 h-6">
        <Cross />
      </div>
    </div>
  </section>
);
