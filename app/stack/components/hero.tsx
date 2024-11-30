import { HeroSection } from '@/components/hero-section';
import { Pump } from 'basehub/react-pump';
import { draftMode } from 'next/headers';

export const Hero = async () => {
  const { isEnabled } = await draftMode();

  return (
    <Pump
      queries={[
        {
          __typename: true,
          stack: {
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
          <HeroSection
            caption={data.stack._title}
            title={data.stack.hero.text}
          />
        );
      }}
    </Pump>
  );
};
