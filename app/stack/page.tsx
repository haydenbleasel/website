import Link from 'next/link';
import type { FC } from 'react';
import { Fragment } from 'react';
import Image from 'next/image';
import Divider from '@/components/divider';
import tools from '@/content/tools.json';

type ToolProps = {
  name: string;
  description: string;
  href: string;
};

const Tool: FC<ToolProps> = ({ name, href, description }) => {
  const { origin } = new URL(href);

  return (
    <Link
      href={href}
      className="no-underline py-2 grid grid-cols-3 gap-4"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="flex-0 flex items-center gap-2">
        <Image
          src={`https://logo.clearbit.com/${origin}`}
          width={24}
          height={24}
          alt=""
          className="m-0 w-6 h-6 object-contain"
        />
        {name}
      </span>
      <span className="truncate font-light flex-1 text-gray-500 dark:text-gray-400 col-span-2 sm:text-right">
        {description}
      </span>
    </Link>
  );
};

const Stack: FC = () => (
  <main className="flex flex-col gap-6 prose-p:m-0 prose-h2:mb-2 prose-h2:mt-4">
    <h1>Stack</h1>
    <div>
      {tools.map((tool, index) => (
        <Fragment key={tool.href}>
          {index > 0 && <Divider />}
          <Tool {...tool} />
        </Fragment>
      ))}
    </div>
    <p>
      Am I missing something awesome? <Link href="/contact">Let me know!</Link>
    </p>
  </main>
);

export default Stack;
