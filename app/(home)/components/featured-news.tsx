import { ThirdsSection } from '@/components/sections/thirds';
import { BaseHubImage } from 'basehub/next-image';
import { Pump } from 'basehub/react-pump';

export const FeaturedNews = () => (
  <Pump
    queries={[
      {
        __typename: true,
        home: {
          featuredNews: {
            title: true,
            text: true,
            link: true,
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
  >
    {/* biome-ignore lint/suspicious/useAwait: Server Actions must be async */}
    {async ([data]) => {
      'use server';

      return (
        <ThirdsSection
          title={data.home.featuredNews.title}
          description={data.home.featuredNews.text}
          caption="Latest feature"
          reverse
          buttons={[
            {
              label: 'Keep reading',
              href: data.home.featuredNews.link,
            },
            {
              label: 'View all features',
              href: '/live',
            },
          ]}
        >
          <div className="relative aspect-video overflow-hidden bg-dashed px-8 pt-8">
            <BaseHubImage
              src={data.home.featuredNews.image.url}
              alt={data.home.featuredNews.image.alt ?? ''}
              width={data.home.featuredNews.image.width}
              height={data.home.featuredNews.image.height}
              className="rounded-2xl border"
            />
            <div className="dashed-line-top" />
            <div className="dashed-line-left" />
            <div className="dashed-line-right" />
          </div>
        </ThirdsSection>
      );
    }}
  </Pump>
);
