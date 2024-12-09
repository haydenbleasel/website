import { HeroSection } from '@/components/hero-section';
import { Button } from '@/components/ui/button';
import { BaseHubImage } from 'basehub/next-image';
import { Pump } from 'basehub/react-pump';
import { draftMode } from 'next/headers';
import Link from 'next/link';

export const Hero = async () => {
  const { isEnabled } = await draftMode();

  return (
    <Pump
      queries={[
        {
          __typename: true,
          home: {
            _title: true,
            hero: {
              text: true,
              caption: true,
              image: {
                url: true,
                alt: true,
                width: true,
                height: true,
              },
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
            caption={data.home.hero.caption}
            title={data.home.hero.text}
            image={
              data.home.hero.image ? (
                <div className="relative">
                  <BaseHubImage
                    src={data.home.hero.image.url}
                    alt={data.home.hero.image.alt ?? ''}
                    width={data.home.hero.image.width}
                    height={data.home.hero.image.height}
                    className="h-12 w-12 overflow-hidden rounded-full object-cover"
                  />
                  <div className="faded-line-bottom" />
                  <div className="faded-line-top" />
                  <div className="faded-line-left" />
                  <div className="faded-line-right" />
                </div>
              ) : null
            }
          >
            <div className="flex items-center justify-center gap-4">
              <Button asChild variant="outline">
                <Link href="/work">View my work</Link>
              </Button>
              <Button asChild>
                <Link href="/contact">Get in touch</Link>
              </Button>
            </div>
          </HeroSection>
        );
      }}
    </Pump>
  );
};
