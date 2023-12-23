import { CalendarIcon } from '@radix-ui/react-icons';
import glimpse from 'react-glimpse/server';
import Image from 'next/image';
import { createMetadata } from '@/lib/metadata';
import features from '@/data/features.json';
import { Container } from '@/components/container';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { FC, ReactElement } from 'react';

const title = 'Features';
const description = 'Articles, podcasts, and other features.';

export const metadata = createMetadata({
  title,
  description,
  path: '/features',
});

const Feature = async ({
  data,
}: {
  data: (typeof features)[0];
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
          <CardTitle className="leading-tight">{data.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {new URL(data.href).hostname}
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

const Features: FC = () => (
  <Container wide>
    <h1 className="mb-0">{title}</h1>
    <p>{description}</p>
    <div className="mt-8 grid sm:grid-cols-2 gap-8">
      {features.map((feature) => (
        <Feature data={feature} key={feature.name} />
      ))}
    </div>
  </Container>
);

export default Features;
