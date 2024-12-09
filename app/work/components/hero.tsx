import { HeroSection } from '@/components/hero-section';
import { Button } from '@/components/ui/button';
import { social } from '@/lib/social';
import { Pump } from 'basehub/react-pump';
import { draftMode } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

export const Hero = async () => {
  const { isEnabled } = await draftMode();

  return (
    <Pump
      queries={[
        {
          __typename: true,
          work: {
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
          <HeroSection caption={data.work._title} title={data.work.hero.text}>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
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
                  Follow me on {social.linkedin.label}
                </a>
              </Button>
              <Button asChild>
                <Link href="/contact?type=work">Let's talk about work</Link>
              </Button>
            </div>
          </HeroSection>
        );
      }}
    </Pump>
  );
};
