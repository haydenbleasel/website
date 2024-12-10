import { HeroSection } from '@/components/hero-section';
import { Button } from '@/components/ui/button';
import { social } from '@/lib/social';
import { Pump } from 'basehub/react-pump';
import { draftMode } from 'next/headers';
import Image from 'next/image';

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
              <Button asChild variant="outline">
                <a
                  href={social.x.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Image
                    src={social.x.icon}
                    alt={social.x.label}
                    width={16}
                    height={16}
                    className="h-4 w-4"
                  />
                  Follow me on {social.x.label}
                </a>
              </Button>
              <Button asChild variant="outline">
                <a
                  href={social.producthunt.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Image
                    src={social.producthunt.icon}
                    alt={social.producthunt.label}
                    width={16}
                    height={16}
                    className="h-4 w-4"
                  />
                  Follow me on {social.producthunt.label}
                </a>
              </Button>
            </div>
          </HeroSection>
        );
      }}
    </Pump>
  );
};
