import { PopoverButton } from "@headlessui/react";
import Link from "next/link";
import type { ReactNode } from "react";

type MobileNavItemProps = {
  href: string;
  children: ReactNode;
};

export const MobileNavItem = ({ href, children }: MobileNavItemProps) => (
  <li>
    <PopoverButton as={Link} className="block py-2" href={href}>
      {children}
    </PopoverButton>
  </li>
);
