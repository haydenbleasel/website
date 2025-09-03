import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import avatarImage from "@/images/avatar.jpg";

type AvatarProps = Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & {
  large?: boolean;
};

export const Avatar = ({ large = false, className, ...props }: AvatarProps) => (
  <Link
    aria-label="Home"
    className={clsx(className, "pointer-events-auto")}
    href="/"
    {...props}
  >
    <Image
      alt=""
      className={clsx(
        "rounded-full bg-zinc-100 object-cover dark:bg-zinc-800",
        large ? "h-16 w-16" : "h-9 w-9"
      )}
      priority
      sizes={large ? "4rem" : "2.25rem"}
      src={avatarImage}
    />
  </Link>
);
