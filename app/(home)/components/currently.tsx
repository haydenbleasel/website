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
          <div className="grid grid-cols-2 gap-8">
            <div
              className="p-8"
              dangerouslySetInnerHTML={{ __html: data.home.currently.html }}
            />
            <div className="aspect-video w-full bg-muted-foreground" />
          </div>
        );
      }}
    </Pump>
  );
};
