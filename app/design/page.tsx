import Image from 'next/image';
import { createMetadata } from '@/lib/metadata';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { Container } from '@/components/container';
import design from '@/data/design.json';
import { fetchFigmaFile } from '@/lib/figma';
import type { FC } from 'react';

const title = 'Design';
const description = 'Figma files and community resources.';

export const metadata = createMetadata({ title, description, path: '/design' });

const FigmaFileCard = async ({ id }: { id: string }) => {
  const figmaFile = await fetchFigmaFile(id);

  return (
    <a
      href={`https://www.figma.com/file/${figmaFile.mainFileKey}`}
      key={figmaFile.mainFileKey}
      className="not-prose hover:-translate-y-1 transition-transform"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${figmaFile.name} in Figma`}
    >
      <Card className="overflow-hidden bg-white dark:bg-zinc-800">
        <Image
          src={figmaFile.thumbnailUrl}
          width={1200}
          height={630}
          alt=""
          quality={100}
        />
        <CardHeader>
          <CardTitle className="leading-tight">{figmaFile.name}</CardTitle>
          <CardDescription>
            Last updated {formatDate(figmaFile.lastModified)}
          </CardDescription>
        </CardHeader>
      </Card>
    </a>
  );
};

const Design: FC = () => (
  <Container wide>
    <h1 className="mb-0">{title}</h1>
    <p>{description}</p>

    <div className="mt-8 grid sm:grid-cols-2 gap-8">
      {design.map((id) => (
        <FigmaFileCard key={id} id={id} />
      ))}
    </div>
  </Container>
);

export default Design;
