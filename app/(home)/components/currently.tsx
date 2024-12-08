import { Prose } from '@/components/prose';
import { Section } from '@/components/section';
import { richTextComponents } from '@/lib/rich-text';
import { Pump } from 'basehub/react-pump';
import { RichText } from 'basehub/react-rich-text';
import { draftMode } from 'next/headers';

export const Currently = async () => {
  const { isEnabled } = await draftMode();

  return (
    <Pump
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
          <Section className="grid grid-cols-3 divide-x">
            <div className="flex flex-col gap-2 p-8">
              <small className="text-muted-foreground">Now</small>
              {data.home.currently?.text.json && (
                <Prose>
                  <RichText
                    content={data.home.currently.text.json.content}
                    components={richTextComponents}
                  />
                </Prose>
              )}
            </div>
            <div className="relative col-span-2 pt-8 pl-8">
              <div className="dashed-line-top" />
              <div className="dashed-line-left" />
              <div className="aspect-video w-full rounded-tl-2xl bg-muted-foreground" />
            </div>
          </Section>
        );
      }}
    </Pump>
  );
};
