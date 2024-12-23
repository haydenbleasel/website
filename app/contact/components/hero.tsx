import { Pump } from 'basehub/react-pump';
import Balancer from 'react-wrap-balancer';

export const Hero = () => (
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
