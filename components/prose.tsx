import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type ProseProps = ComponentPropsWithoutRef<"div"> & {
  className?: string;
};

export const Prose = ({ className, ...props }: ProseProps) => (
  <div className={cn(className, "prose dark:prose-invert")} {...props} />
);
