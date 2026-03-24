import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  title: string;
}

export const Section = ({ children, title }: SectionProps) => (
  <section className="grid gap-6">
    <h2 className="font-medium text-base pb-6 border-b">{title}</h2>
    {children}
  </section>
);
