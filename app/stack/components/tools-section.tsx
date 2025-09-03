import type { ComponentPropsWithoutRef } from "react";
import { Section } from "@/components/section";

type ToolsSectionProps = ComponentPropsWithoutRef<typeof Section> & {
  title: string;
};

export const ToolsSection = ({ children, ...props }: ToolsSectionProps) => (
  <Section {...props} className="max-w-none">
    <ul className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2">
      {children}
    </ul>
  </Section>
);
