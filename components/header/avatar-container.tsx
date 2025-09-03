import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

type AvatarContainerProps = ComponentPropsWithoutRef<"div">;

export const AvatarContainer = ({
  className,
  ...props
}: AvatarContainerProps) => (
  <div
    className={clsx(
      className,
      "h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10"
    )}
    {...props}
  />
);
