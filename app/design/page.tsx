import Image from 'next/image';
import { createMetadata } from '@/lib/metadata';
import { fetchFigmaProject } from '@/lib/figma';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { Container } from '@/components/container';
import type { ReactElement } from 'react';

const title = 'Design';
const description = 'Figma files and community resources.';

export const metadata = createMetadata({ title, description, path: '/design' });

const Design = async (): Promise<ReactElement> => {
  const figmaFiles = await fetchFigmaProject('37778158');

  return (
    <Container wide>
      <h1 className="mb-0">{title}</h1>
      <p>{description}</p>

      <div className="mt-8 grid grid-cols-2 gap-8">
        {figmaFiles.files.map((figmaFile) => (
          <a
            href={`https://www.figma.com/file/${figmaFile.key}`}
            key={figmaFile.key}
            className="not-prose hover:-translate-y-1 transition-transform"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${figmaFile.name} in Figma`}
          >
            <Card className="overflow-hidden bg-white dark:bg-zinc-800">
              <Image
                src={figmaFile.thumbnail_url}
                width={1200}
                height={630}
                alt=""
              />
              <CardHeader>
                <CardTitle>{figmaFile.name}</CardTitle>
                <CardDescription>
                  Last updated {formatDate(figmaFile.last_modified)}
                </CardDescription>
              </CardHeader>
            </Card>
          </a>
        ))}
      </div>
    </Container>
  );
};

export default Design;
