import { Button } from '@/components/ui/button';
import { Pump } from 'basehub/react-pump';
import { draftMode } from 'next/headers';
import Link from 'next/link';
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
            <small className="text-base text-muted-foreground">
              {data.home.heroCaption}
            </small>
            <h1 className="text-center font-bold text-5xl leading-tight tracking-tight">
              <Balancer>{data.home.heroTitle}</Balancer>
            </h1>
            <div className="flex items-center justify-center gap-2">
              <Button asChild variant="outline">
                <Link href="/work">View my work</Link>
              </Button>
              <Button asChild>
                <Link href="/contact">Get in touch</Link>
              </Button>
            </div>
          </section>
        );
      }}
    </Pump>
  );
};
