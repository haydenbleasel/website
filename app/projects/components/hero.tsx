import { HeroSection } from '@/components/hero-section';
import { SocialButton } from '@/components/social-button';
import { social } from '@/lib/social';
import { Pump } from 'basehub/react-pump';
import { draftMode } from 'next/headers';

export const Hero = async () => {
  const { isEnabled } = await draftMode();

  return (
    <Pump
      draft={isEnabled}
      queries={[
        {
          __typename: true,
          projects: {
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
          <HeroSection
            caption={data.projects._title}
            title={data.projects.hero.text}
          >
            <div className="flex items-center gap-4">
              <SocialButton data={social.x} />
              <SocialButton data={social.producthunt} />
            </div>
          </HeroSection>
        );
      }}
    </Pump>
  );
};
