import { Prose } from '@/components/prose';
import { richTextComponents } from '@/lib/rich-text';
import { Pump } from 'basehub/react-pump';
import { RichText } from 'basehub/react-rich-text';
import { draftMode } from 'next/headers';
import Image from 'next/image';
import { Globe } from './globe';

export const Flighty = async () => {
  const { isEnabled } = await draftMode();

  return (
    <Pump
      queries={[
        {
          __typename: true,
          travel: {
            flighty: {
              title: true,
              text: {
                json: {
                  content: true,
                },
              },
              image: {
                url: true,
                alt: true,
                width: true,
                height: true,
                lastModified: true,
              },
            },
          },
        },
      ]}
      draft={isEnabled}
    >
      {/* biome-ignore lint/suspicious/useAwait: Server Actions must be async */}
      {async ([data]) => {
        'use server';

        return (
          <section className="grid grid-cols-3 divide-x">
            <div className="flex flex-col gap-2 p-8">
              <small className="text-muted-foreground">Overview</small>
              <h2 className="font-bold text-3xl tracking-tight">
                {data.travel.flighty.title}
              </h2>
              {data.travel.flighty.text && (
                <Prose>
                  <RichText
                    content={data.travel.flighty.text.json.content}
                    components={richTextComponents}
                  />
                </Prose>
              )}
            </div>
            <div className="relative flex flex-col items-center justify-center gap-4 overflow-hidden bg-dashed p-8">
              <Image
                src={data.travel.flighty.image.url}
                alt={data.travel.flighty.image.alt ?? ''}
                width={data.travel.flighty.image.width}
                height={data.travel.flighty.image.height}
              />
              <small className="text-muted-foreground">
                My{' '}
                <a
                  href="https://flighty.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline"
                >
                  Flighty
                </a>{' '}
                passport. Last updated{' '}
                {new Date(
                  data.travel.flighty.image.lastModified
                ).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                })}
                .
              </small>
            </div>
            <div className="overflow-hidden p-8 pr-0">
              <Globe />
            </div>
          </section>
        );
      }}
    </Pump>
  );
};