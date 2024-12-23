import { HeroSection } from '@/components/hero-section';
import { SocialButton } from '@/components/social-button';
import { social } from '@/lib/social';
import { Pump } from 'basehub/react-pump';

export const Hero = () => (
  <Pump
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
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <SocialButton data={social.x} />
            <SocialButton data={social.producthunt} />
          </div>
        </HeroSection>
      );
    }}
  </Pump>
);
