import { Prose } from '@/components/prose';
import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { richTextComponents } from '@/lib/rich-text';
import { ViewAnimation } from '@/providers/view-animation';
import { BaseHubImage } from 'basehub/next-image';
import { Pump } from 'basehub/react-pump';
import { RichText } from 'basehub/react-rich-text';
import { ArrowUpRightIcon } from 'lucide-react';
import { draftMode } from 'next/headers';

export const Currently = async () => {
  const { isEnabled } = await draftMode();

  return (
    <Pump
      draft={isEnabled}
      queries={[
        {
          __typename: true,
          home: {
            currently: {
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
              },
              cta: true,
              link: true,
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
            <div>
              <ViewAnimation
                className="flex h-full flex-col items-start justify-between gap-4 p-8"
                initial={{ opacity: 0, translateY: -8 }}
                whileInView={{ opacity: 1, translateY: 0 }}
              >
                <div className="flex flex-col gap-2">
                  <small className="text-muted-foreground">Now</small>
                  <Prose>
                    <RichText
                      content={data.home.currently.text.json.content}
                      components={richTextComponents}
                    />
                  </Prose>
                </div>
                <Button asChild variant="outline" className="gap-2">
                  <a
                    href={data.home.currently.link}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {data.home.currently.cta}
                    <ArrowUpRightIcon size={16} />
                  </a>
                </Button>
              </ViewAnimation>
            </div>
            <div className="bg-dashed sm:col-span-2">
              <ViewAnimation
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                delay={0.4}
                className="relative pt-8 pl-8"
              >
                <div className="dashed-line-top" />
                <div className="dashed-line-left" />
                <BaseHubImage
                  src={data.home.currently.image.url}
                  alt={data.home.currently.image.alt ?? ''}
                  width={data.home.currently.image.width}
                  height={data.home.currently.image.height}
                  className="w-full rounded-tl-2xl border-t border-l"
                />
              </ViewAnimation>
            </div>
          </Section>
        );
      }}
    </Pump>
  );
};
