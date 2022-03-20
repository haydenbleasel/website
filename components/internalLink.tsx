import type { LinkProps } from "@prismicio/react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";

const InternalLinkComponent: FC<LinkProps> = ({ children, href, ...props }) => {
  const { asPath } = useRouter();
  const active = asPath === href;

  return (
    <Link href={href} passHref>
      <a
        href={href}
        className={`text-md font-normal transition-all ${
          active
            ? "text-gray-700 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-500"
            : "text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-500"
        }`}
        {...props}
      >
        {children}
      </a>
    </Link>
  );
};

export default InternalLinkComponent;
