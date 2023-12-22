import type { FC, ReactNode } from 'react';

type SectionProps = {
  readonly title: string;
  readonly children: ReactNode;
  readonly footer?: ReactNode;
};

export const Section: FC<SectionProps> = ({ title, children, footer }) => (
  <section className="flex flex-col gap-6">
    <h2 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 m-0">
      {title}
    </h2>
    <div className="flex flex-col gap-2">{children}</div>
    <p className="text-sm text-neutral-600 dark:text-neutral-400 m-0">
      {footer}
    </p>
  </section>
);
