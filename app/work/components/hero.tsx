import { Button } from '@/components/ui/button';
import { social } from '@/lib/social';
import { Pump } from 'basehub/react-pump';
import { draftMode } from 'next/headers';
import Balancer from 'react-wrap-balancer';

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
          <section className="flex flex-col items-center justify-center gap-4 px-4 py-20 sm:px-8">
            <p className="text-muted-foreground">{data.home.heroCaption}</p>
            <h1 className="text-center font-bold text-5xl leading-tight tracking-tight">
              <Balancer>{data.home.heroTitle}</Balancer>
            </h1>
            <Button asChild variant="outline">
              <a
                href={social.linkedin.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                Connect on LinkedIn
              </a>
            </Button>
          </section>
        );
      }}
    </Pump>
  );
};
