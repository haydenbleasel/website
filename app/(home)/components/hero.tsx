import { HeroSection } from '@/components/hero-section';
import { Button } from '@/components/ui/button';
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
            caption={data.home.heroCaption}
            title={data.home.heroTitle}
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
