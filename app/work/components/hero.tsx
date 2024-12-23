import { HeroSection } from '@/components/hero-section';
import { SocialButton } from '@/components/social-button';
import { Button } from '@/components/ui/button';
import { social } from '@/lib/social';
import { Pump } from 'basehub/react-pump';
import Link from 'next/link';

export const Hero = () => (
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
  >
    {/* biome-ignore lint/suspicious/useAwait: Server Actions must be async */}
    {async ([data]) => {
      'use server';

      return (
        <HeroSection caption={data.work._title} title={data.work.hero.text}>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <SocialButton data={social.linkedin} />
            <Button asChild>
              <Link href="/contact?type=work">Let's talk about work</Link>
            </Button>
          </div>
        </HeroSection>
      );
    }}
  </Pump>
);
