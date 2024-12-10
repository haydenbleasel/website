import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { social } from '@/lib/social';
import { ViewAnimation } from '@/providers/view-animation';
import { Pump } from 'basehub/react-pump';
import { ArrowUpRightIcon } from 'lucide-react';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { Tweet } from 'react-tweet';

export const FeaturedTweet = async () => {
  const { isEnabled } = await draftMode();

  return (
    <Pump
      draft={isEnabled}
      queries={[
        {
          __typename: true,
          home: {
            featuredTweet: {
              title: true,
              description: true,
              tweetId: true,
            },
          },
        },
      ]}
    >
      {/* biome-ignore lint/suspicious/useAwait: Server Actions must be async */}
      {async ([data]) => {
        'use server';

        return (
          <Section className="grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div>
              <ViewAnimation
                initial={{ opacity: 0, translateY: -8 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                className="flex h-full flex-col items-start justify-between gap-4 p-8"
              >
                <div className="flex flex-col gap-2">
                  <small className="text-muted-foreground">
                    Featured tweet
                  </small>
                  <h2 className="font-bold text-3xl tracking-tight">
                    {data.home.featuredTweet.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {data.home.featuredTweet.description}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button asChild variant="outline" className="gap-2">
                    <a
                      href={`https://x.com/haydenbleasel/status/${data.home.featuredTweet.tweetId}`}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Read on X
                      <ArrowUpRightIcon size={16} />
                    </a>
                  </Button>
                  <Button variant="link" className="text-muted-foreground">
                    <Link href={social.x.href}>View all tweets</Link>
                  </Button>
                </div>
              </ViewAnimation>
            </div>
            <div className="overflow-hidden sm:col-span-2">
              <ViewAnimation
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                delay={0.4}
              >
                <div className="relative flex items-center justify-center bg-dashed p-8">
                  <Tweet id={data.home.featuredTweet.tweetId} />
                </div>
              </ViewAnimation>
            </div>
          </Section>
        );
      }}
    </Pump>
  );
};
