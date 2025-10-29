import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  variant?: "success" | undefined;
};

export const Badge = ({ children, variant }: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center rounded-md bg-zinc-100 px-2 py-0.5 align-bottom font-medium text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
      variant === "success" &&
        "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300"
    )}
  >
    {children}
  </span>
);
