import { HeroSection } from '@/components/hero-section';
import { SocialButton } from '@/components/social-button';
import { social } from '@/lib/social';
import { Pump } from 'basehub/react-pump';

export const Hero = () => (
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
  >
    {/* biome-ignore lint/suspicious/useAwait: Server Actions must be async */}
    {async ([data]) => {
      'use server';

      return (
        <HeroSection caption={data.travel._title} title={data.travel.hero.text}>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <SocialButton data={social.youtube} />
            <SocialButton data={social.instagram} />
          </div>
        </HeroSection>
      );
    }}
  </Pump>
);
