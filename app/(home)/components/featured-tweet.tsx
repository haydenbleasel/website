import { ThirdsSection } from '@/components/sections/thirds';
import { social } from '@/lib/social';
import { cn } from '@/lib/utils';
import { Pump } from 'basehub/react-pump';
import { Tweet } from 'react-tweet';

export const FeaturedTweet = () => (
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
  >
    {/* biome-ignore lint/suspicious/useAwait: Server Actions must be async */}
    {async ([data]) => {
      'use server';

      return (
        <ThirdsSection
          title={data.home.featuredTweet.title}
          description={data.home.featuredTweet.description}
          caption="Featured tweet"
          buttons={[
            {
              label: 'Read on X',
              href: `https://x.com/haydenbleasel/status/${data.home.featuredTweet.tweetId}`,
            },
            {
              label: 'View all tweets',
              href: social.x.href,
            },
          ]}
        >
          <div
            className={cn(
              'relative flex items-center justify-center bg-dashed p-4',
              'sm:p-8'
            )}
          >
            <Tweet id={data.home.featuredTweet.tweetId} />
          </div>
        </ThirdsSection>
      );
    }}
  </Pump>
);
