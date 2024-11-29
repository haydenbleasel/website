import { Pump } from 'basehub/react-pump';
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
              html: true,
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
          <div className="grid grid-cols-2 gap-8 divide-x">
            <div
              className="p-8"
              dangerouslySetInnerHTML={{ __html: data.home.currently.html }}
            />
            <div className="relative pl-8 pt-8">
              <div className="absolute top-8 left-0 h-px w-full border-t border-dashed" />
              <div className="absolute top-0 left-8 w-px h-full border-r border-dashed" />
              <div className="aspect-video w-full bg-muted-foreground rounded-tl-2xl" />
            </div>
          </div>
        );
      }}
    </Pump>
  );
};
