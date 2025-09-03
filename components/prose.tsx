import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

type ProseProps = ComponentPropsWithoutRef<"div"> & {
  className?: string;
};

export const Prose = ({ className, ...props }: ProseProps) => (
  <div className={clsx(className, "prose dark:prose-invert")} {...props} />
);
