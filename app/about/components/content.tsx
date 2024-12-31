import { Prose } from '@/components/prose';
import { Section } from '@/components/section';
import { richTextComponents } from '@/lib/rich-text';
import { ViewAnimation } from '@/providers/view-animation';
import { BaseHubImage } from 'basehub/next-image';
import { Pump } from 'basehub/react-pump';
import { RichText } from 'basehub/react-rich-text';

export const Content = () => (
  <Pump
    queries={[
      {
        __typename: true,
        about: {
          content: {
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
        },
      },
    ]}
  >
    {/* biome-ignore lint/suspicious/useAwait: Server Actions must be async */}
    {async ([data]) => {
      'use server';

      return (
        <Section className="grid divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <div>
            <ViewAnimation
              initial={{ opacity: 0, translateY: -8 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              delay={0.4}
              className="flex h-full flex-col items-start justify-between gap-4 p-8"
            >
              <div className="flex flex-col gap-2">
                <small className="text-muted-foreground">About me</small>
                <Prose>
                  <RichText
                    components={richTextComponents}
                    content={data.about.content.json.content}
                  />
                </Prose>
              </div>
            </ViewAnimation>
          </div>
          <div>
            <ViewAnimation
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              <BaseHubImage
                src={data.about.image.url}
                alt={data.about.image.alt ?? ''}
                width={data.about.image.width}
                height={data.about.image.height}
              />
            </ViewAnimation>
          </div>
        </Section>
      );
    }}
  </Pump>
);
