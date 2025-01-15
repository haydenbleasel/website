import { Prose } from '@/components/prose';
import { Section } from '@/components/section';
import type { ReactNode } from 'react';

type StickyListProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export const StickyList = ({
  title,
  description,
  children,
}: StickyListProps) => (
  <Section className="grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
    <div className="bg-dashed">
      <div className="sticky top-16 flex flex-col gap-1.5 p-8">
        <Prose>
          <h2 className="mb-2 text-3xl">{title}</h2>
          {description && <p>{description}</p>}
        </Prose>
      </div>
    </div>
    <div className="sm:col-span-2">{children}</div>
  </Section>
);
