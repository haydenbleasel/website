import type { ComponentPropsWithoutRef, ComponentType } from "react";

export const SocialLink = ({
  icon: Icon,
  href,
  ...props
}: ComponentPropsWithoutRef<"a"> & {
  icon: ComponentType<{ className?: string }>;
}) => (
  <a
    className="group -m-1 p-1"
    href={href}
    {...props}
    rel="noopener noreferrer"
    target="_blank"
  >
    <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
  </a>
);
