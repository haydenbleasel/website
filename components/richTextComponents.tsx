import type { JSXMapSerializer } from "@prismicio/react";
import { PrismicLink } from "@prismicio/react";
import Image from "next/image";
import { docResolver } from "../utils/prismic";

const richTextComponents: JSXMapSerializer = {
  paragraph: ({ children, key }) => (
    <p
      key={key}
      className="mb-4 text-md font-normal text-gray-900 dark:text-white"
    >
      {children}
    </p>
  ),
  em: ({ children, key }) => (
    <em
      key={key}
      className="font-serif font-medium text-gray-900 dark:text-white"
    >
      {children}
    </em>
  ),
  strong: ({ children, key }) => (
    <strong key={key} className="font-semibold">
      {children}
    </strong>
  ),
  image: ({ key, node }) => (
    <div className="mb-4 flex overflow-hidden rounded-sm">
      <Image
        key={key}
        src={node.url}
        alt={node.alt ?? ""}
        width={480}
        height={480 * (node.dimensions.height / node.dimensions.width)}
        className="w-full"
      />
    </div>
  ),
  hyperlink: ({ children, node, key }) => (
    <PrismicLink key={key} href={docResolver(node.data)}>
      <span className="text-gray-900 underline transition-colors hover:text-gray-800 dark:text-white dark:hover:text-gray-100">
        {children}
      </span>
    </PrismicLink>
  ),
  heading1: ({ children, key }) => (
    <h1
      key={key}
      className="mt-8 mb-4 text-xl font-semibold text-gray-900 dark:text-white"
    >
      {children}
    </h1>
  ),
  heading2: ({ children, key }) => (
    <h2
      key={key}
      className="mt-8 mb-4 text-sm font-semibold text-gray-900 dark:text-white sm:text-lg"
    >
      {children}
    </h2>
  ),
  heading3: ({ children, key }) => (
    <h3
      key={key}
      className="mt-8 mb-4 text-xs font-semibold text-gray-900 dark:text-white sm:text-md"
    >
      {children}
    </h3>
  ),
  heading4: ({ children, key }) => (
    <h4
      key={key}
      className="mt-8 mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-sm"
    >
      {children}
    </h4>
  ),
  heading5: ({ children, key }) => (
    <h5
      key={key}
      className="mt-8 mb-4 text-lg font-semibold text-gray-900 dark:text-white sm:text-xs"
    >
      {children}
    </h5>
  ),
  heading6: ({ children, key }) => (
    <h6
      key={key}
      className="mt-8 mb-4 text-md font-semibold text-gray-900 dark:text-white sm:text-xl"
    >
      {children}
    </h6>
  ),
  list: ({ children, key }) => (
    <ul key={key} className="mb-4 list-inside list-disc pl-0">
      {children}
    </ul>
  ),
  oList: ({ children, key }) => (
    <ul key={key} className="mb-4 list-inside list-decimal pl-0">
      {children}
    </ul>
  ),
  listItem: ({ children, key }) => (
    <li
      key={key}
      className="pl-8 -indent-[1.4rem] text-md text-gray-900 dark:text-white"
    >
      {children}
    </li>
  ),
  oListItem: ({ children, key }) => (
    <li
      key={key}
      className="pl-8 -indent-[1.4rem] text-md text-gray-900 dark:text-white"
    >
      {children}
    </li>
  ),
  embed: ({ node, key }) => {
    if (!node.oembed.html) {
      return undefined;
    }

    if (node.oembed.type === "video") {
      return (
        <div
          key={key}
          className="contains-video mb-4 flex aspect-video overflow-hidden rounded-sm"
          // eslint-disable-next-line react/no-danger, @typescript-eslint/naming-convention
          dangerouslySetInnerHTML={{ __html: node.oembed.html }}
        />
      );
    }

    return (
      <div
        key={key}
        className="mb-4"
        // eslint-disable-next-line react/no-danger, @typescript-eslint/naming-convention
        dangerouslySetInnerHTML={{ __html: node.oembed.html }}
      />
    );
  },
};

export default richTextComponents;
