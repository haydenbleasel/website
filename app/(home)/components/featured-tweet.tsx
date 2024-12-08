import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { social } from '@/lib/social';
import { Pump } from 'basehub/react-pump';
import { ArrowUpRightIcon } from 'lucide-react';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { Tweet } from 'react-tweet';

export const FeaturedTweet = async () => {
  const { isEnabled } = await draftMode();

  return (
    <Pump
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
      draft={isEnabled}
    >
      {/* biome-ignore lint/suspicious/useAwait: Server Actions must be async */}
      {async ([data]) => {
        'use server';

        return (
          <Section className="grid grid-cols-3 divide-x">
            <div className="flex flex-col items-start justify-between gap-4 p-8">
              <div className="flex flex-col gap-2">
                <small className="text-muted-foreground">Featured tweet</small>
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
            </div>
            <div className="relative col-span-2 flex items-center justify-center overflow-hidden bg-dashed p-8">
              <Tweet id={data.home.featuredTweet.tweetId} />
            </div>
          </Section>
        );
      }}
    </Pump>
  );
};
