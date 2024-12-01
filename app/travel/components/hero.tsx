import { HeroSection } from '@/components/hero-section';
import { Pump } from 'basehub/react-pump';
import { draftMode } from 'next/headers';
import { Flighty } from './flighty';
import { Videos } from './videos';

export const Hero = async () => {
  const { isEnabled } = await draftMode();

  return (
    <Pump
      queries={[
        {
          __typename: true,
          travel: {
            _title: true,
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
          <>
            <HeroSection
              caption={data.travel._title}
              title={data.travel.hero.text}
            />
            <Flighty />
            <Videos />
          </>
        );
      }}
    </Pump>
  );
};
