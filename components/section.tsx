import type { FC, ReactNode } from 'react';

type SectionProps = {
  readonly title: string;
  readonly children: ReactNode;
  readonly footer?: ReactNode;
};

export const Section: FC<SectionProps> = ({ title, children, footer }) => (
  <section className="space-y-6">
    <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 m-0">
      {title}
    </h2>
    <div className="space-y-2">{children}</div>
    <p className="text-sm text-zinc-600 dark:text-zinc-400 m-0">{footer}</p>
  </section>
);
