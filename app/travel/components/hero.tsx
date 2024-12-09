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
          <HeroSection
            caption={data.travel._title}
            title={data.travel.hero.text}
          >
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild variant="outline">
                <a
                  href={social.youtube.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Image
                    src={social.youtube.icon}
                    alt={social.youtube.label}
                    width={16}
                    height={16}
                    className="h-4 w-4"
                  />
                  Follow me on {social.youtube.label}
                </a>
              </Button>
              <Button asChild variant="outline">
                <a
                  href={social.instagram.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Image
                    src={social.instagram.icon}
                    alt={social.instagram.label}
                    width={16}
                    height={16}
                    className="h-4 w-4"
                  />
                  Follow me on {social.instagram.label}
                </a>
              </Button>
            </div>
          </HeroSection>
        );
      }}
    </Pump>
  );
};
