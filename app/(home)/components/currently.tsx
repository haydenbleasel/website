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
              json: {
                content: true,
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
            <div className="p-8">
              {data.home.currently?.json && (
                <RichText content={data.home.currently.json.content} />
              )}
            </div>
            <div className="relative col-span-2 pt-8 pl-8">
              <div className="absolute top-8 left-0 h-px w-full border-t border-dashed" />
              <div className="absolute top-0 left-8 h-full w-px border-r border-dashed" />
              <div className="aspect-video w-full rounded-tl-2xl bg-muted-foreground" />
            </div>
          </section>
        );
      }}
    </Pump>
  );
};
