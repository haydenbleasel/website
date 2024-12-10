import { Prose } from '@/components/prose';
import { Section } from '@/components/section';
import { richTextComponents } from '@/lib/rich-text';
import { BaseHubImage } from 'basehub/next-image';
import { Pump } from 'basehub/react-pump';
import { RichText } from 'basehub/react-rich-text';
import { draftMode } from 'next/headers';
import { Globe } from './globe';

export const Flighty = async () => {
  const { isEnabled } = await draftMode();

  return (
    <Pump
      draft={isEnabled}
      queries={[
        {
          __typename: true,
          travel: {
            flighty: {
              caption: true,
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
    >
      {/* biome-ignore lint/suspicious/useAwait: Server Actions must be async */}
      {async ([data]) => {
        'use server';

        return (
          <Section className="grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="relative col-span-2 overflow-hidden p-8">
              <div className="-left-1/4 -bottom-1/3 absolute h-full w-full">
                <Globe />
              </div>
              <div className="relative z-10 flex flex-col gap-2">
                <small className="text-muted-foreground">
                  {data.travel.flighty.caption}
                </small>
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
            </div>
            <div className="relative flex flex-col items-center justify-center gap-4 overflow-hidden bg-dashed p-8">
              <BaseHubImage
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
          </Section>
        );
      }}
    </Pump>
  );
};
