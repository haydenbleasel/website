import { CalendarIcon } from '@radix-ui/react-icons';
import glimpse from 'react-glimpse/server';
import Image from 'next/image';
import { createMetadata } from '@/lib/metadata';
import speaking from '@/data/speaking.json';
import { Container } from '@/components/container';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { FC, ReactElement } from 'react';

const title = 'Speaking';
const description = 'A list of conferences and meetups I have spoken at.';

export const metadata = createMetadata({
  title,
  description,
  path: '/speaking',
});

const Talk = async ({
  data,
}: {
  data: (typeof speaking)[0];
}): Promise<ReactElement> => {
  let image = null;

  if (data.href) {
    try {
      const response = await glimpse(data.href);
      image = response.image;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <a
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
        ) : null}
        <CardHeader>
          <CardTitle>{data.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {data.location}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            <span className="flex items-center gap-1">
              <CalendarIcon className="w-3 h-3" />
              {data.year}
            </span>
          </div>
        </CardContent>
      </Card>
    </a>
  );
};

const Speaking: FC = () => (
  <Container wide>
    <h1>{title}</h1>
    <p>{description}</p>
    <div className="grid grid-cols-2 gap-8">
      {speaking.map((talk) => (
        <Talk data={talk} key={talk.name} />
      ))}
    </div>
  </Container>
);

export default Speaking;
