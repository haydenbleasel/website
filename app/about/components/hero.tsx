import { HeroSection } from '@/components/hero-section';
import { Pump } from 'basehub/react-pump';

export const Hero = () => (
  <Pump
    queries={[
      {
        __typename: true,
        about: {
          _title: true,
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
        <HeroSection caption={data.about._title} title={data.about.hero.text} />
      );
    }}
  </Pump>
);
