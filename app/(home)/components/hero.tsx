import { Pump } from 'basehub/react-pump';
import { draftMode } from 'next/headers';

export const Hero = async () => {
  const { isEnabled } = await draftMode();

  return (
    <Pump
      queries={[
        {
          __typename: true,
          home: {
            heroCaption: true,
            heroTitle: true,
          },
        },
      ]}
      draft={isEnabled}
    >
      {/* biome-ignore lint/suspicious/useAwait: Server Actions must be async */}
      {async ([data]) => {
        'use server';

        return (
          <div>
            <p>{data.home.heroCaption}</p>
            <h1>{data.home.heroTitle}</h1>
          </div>
        );
      }}
    </Pump>
  );
};
