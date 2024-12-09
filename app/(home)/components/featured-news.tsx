import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { ViewAnimation } from '@/providers/view-animation';
import { BaseHubImage } from 'basehub/next-image';
import { Pump } from 'basehub/react-pump';
import { ArrowUpRightIcon } from 'lucide-react';
import { draftMode } from 'next/headers';
import Link from 'next/link';

export const FeaturedNews = async () => {
  const { isEnabled } = await draftMode();

  return (
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
      draft={isEnabled}
    >
      {/* biome-ignore lint/suspicious/useAwait: Server Actions must be async */}
      {async ([data]) => {
        'use server';

        return (
          <Section className="grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="sm:col-span-2">
              <ViewAnimation
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
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
              </ViewAnimation>
            </div>
            <div>
              <ViewAnimation
                initial={{ opacity: 0, translateY: -8 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                delay={0.4}
                className="flex h-full flex-col items-start justify-between gap-4 p-8"
              >
                <div className="flex flex-col gap-2">
                  <small className="text-muted-foreground">
                    Latest feature
                  </small>
                  <h2 className="font-bold text-3xl tracking-tight">
                    {data.home.featuredNews.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {data.home.featuredNews.text}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button asChild variant="outline" className="gap-2">
                    <a
                      href={data.home.featuredNews.link}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Keep reading
                      <ArrowUpRightIcon size={16} />
                    </a>
                  </Button>
                  <Button variant="link" className="text-muted-foreground">
                    <Link href="/live">View all features</Link>
                  </Button>
                </div>
              </ViewAnimation>
            </div>
          </Section>
        );
      }}
    </Pump>
  );
};
