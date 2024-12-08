import { HeroSection } from '@/components/hero-section';
import { Button } from '@/components/ui/button';
import { social } from '@/lib/social';
import { BaseHubImage as Image } from 'basehub/next-image';
import { Pump } from 'basehub/react-pump';
import { draftMode } from 'next/headers';

export const Hero = async () => {
  const { isEnabled } = await draftMode();

  return (
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
      draft={isEnabled}
    >
      {/* biome-ignore lint/suspicious/useAwait: Server Actions must be async */}
      {async ([data]) => {
        'use server';

        return (
          <HeroSection
            caption={data.projects._title}
            title={data.projects.hero.text}
          >
            <Button asChild variant="outline">
              <a href={social.x.href} target="_blank" rel="noreferrer noopener">
                <Image
                  src={social.x.icon}
                  alt={social.x.label}
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
                Follow me on X
              </a>
            </Button>
          </HeroSection>
        );
      }}
    </Pump>
  );
};
