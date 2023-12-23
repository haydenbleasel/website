import { ExternalLinkIcon, GlobeIcon } from '@radix-ui/react-icons';
import glimpse from 'react-glimpse/server';
import Image from 'next/image';
import { Link } from '@/components/link';
import { createMetadata } from '@/lib/metadata';
import stack from '@/data/stack.json';
import { Container } from '@/components/container';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { FC, ReactElement } from 'react';

const title = 'Stack';
const description = 'Tools and technologies I use.';

export const metadata = createMetadata({ title, description, path: '/stack' });

const Tool = async ({
  data,
}: {
  data: (typeof stack)[0];
}): Promise<ReactElement> => {
  let { image } = data;

  if (!image) {
    try {
      const response = await glimpse(data.href);

      if (response.image) {
        // eslint-disable-next-line prefer-destructuring, @typescript-eslint/prefer-destructuring
        image = response.image.startsWith('http')
          ? response.image
          : `https://${response.image}`;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Link
      href={data.href}
      key={data.href}
      className="no-underline hover:-translate-y-1 transition-transform"
    >
      <Card className="not-prose overflow-hidden bg-white dark:bg-zinc-800">
        {image ? (
          <Image
            src={image}
            alt=""
            width={1200}
            height={630}
            unoptimized
            className="aspect-[1200/630] object-cover"
          />
        ) : (
          <div className="aspect-[1200/630] bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
            <ExternalLinkIcon className="w-6 h-6" />
          </div>
        )}
        <CardHeader>
          <CardTitle className="leading-tight">{data.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {data.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            <span className="flex items-center gap-1">
              <GlobeIcon className="w-3 h-3" />
              {new URL(data.href).hostname}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

const Stack: FC = () => (
  <Container wide>
    <h1 className="mb-0">{title}</h1>
    <p>{description}</p>
    <div className="mt-8 grid sm:grid-cols-2 gap-8">
      {stack.map((tool) => (
        <Tool data={tool} key={tool.name} />
      ))}
    </div>
  </Container>
);

export default Stack;
