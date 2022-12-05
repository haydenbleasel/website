'use client';

import type { FC } from 'react';
import useContextMenu from '@/components/navbar/useContextMenu';
import type { Item, TableOfContentsProps } from '@/lib/tableOfContents';

const LinkItem: FC<Item> = ({ url, title, items }) => (
  <li key={url}>
    <a
      href={url}
      className="block rounded-sm px-2 py-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"
    >
      {title}
    </a>
    {items && (
      <ul className="ml-4">
        {items.map((item) => (
          <LinkItem key={url} {...item} />
        ))}
      </ul>
    )}
  </li>
);

const TableOfContents: FC<{ toc: TableOfContentsProps }> = ({ toc }) => {
  const { content, setContent } = useContextMenu();

  if (toc.items?.length && !content) {
    setContent(<ul className="flex flex-col">{toc.items.map(LinkItem)}</ul>);
  }

  return null;
};

export default TableOfContents;
