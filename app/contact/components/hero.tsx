import { Pump } from 'basehub/react-pump';
import { draftMode } from 'next/headers';
import Balancer from 'react-wrap-balancer';

export const Hero = async () => {
  const { isEnabled } = await draftMode();

  return (
    <Pump
      queries={[
        {
          __typename: true,
          contact: {
            hero: {
              text: true,
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
          <h1 className="font-bold text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl">
            <Balancer>{data.contact.hero.text}</Balancer>
          </h1>
        );
      }}
    </Pump>
  );
};
