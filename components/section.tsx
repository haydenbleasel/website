import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';
import type { HTMLAttributes } from 'react';

type SectionProps = HTMLAttributes<HTMLDivElement>;

export const Section = ({ children, className, ...props }: SectionProps) => (
  <section className="" {...props}>
    <div className="container relative mx-auto">
      <div className={cn('sm:border-x', className)}>{children}</div>
      <div className="-bottom-3 -left-3 absolute z-10 h-6 bg-backdrop">
        <PlusIcon size={24} className="text-muted-foreground opacity-20" />
      </div>
      <div className="-bottom-3 -right-3 absolute z-10 h-6 bg-backdrop">
        <PlusIcon size={24} className="text-muted-foreground opacity-20" />
      </div>
    </div>
  </section>
);
