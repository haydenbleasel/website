import type { ComponentPropsWithoutRef } from "react";
import { Section } from "@/components/section";

type SpeakingSectionProps = ComponentPropsWithoutRef<typeof Section> & {
  title: string;
};

export const SpeakingSection = ({
  children,
  ...props
}: SpeakingSectionProps) => (
  <Section {...props}>
    <div className="space-y-16">{children}</div>
  </Section>
);
