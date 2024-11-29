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
          <>
            <div className="grid grid-cols-2 gap-8">
              <div
                dangerouslySetInnerHTML={{ __html: data.home.currently.html }}
              />
              <div className="aspect-square w-full bg-secondary" />
            </div>
            <div>
              <p>Feed here</p>
            </div>
          </>
        );
      }}
    </Pump>
  );
};
