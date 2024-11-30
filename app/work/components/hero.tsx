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
      queries={[
        {
          __typename: true,
          work: {
            heroCaption: true,
            heroTitle: true,
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
            caption={data.work.heroCaption}
            title={data.work.heroTitle}
          >
            <Button asChild variant="outline">
              <a
                href={social.linkedin.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Image
                  src={social.linkedin.icon}
                  alt={social.linkedin.label}
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
                Follow me on LinkedIn
              </a>
            </Button>
          </HeroSection>
        );
      }}
    </Pump>
  );
};
