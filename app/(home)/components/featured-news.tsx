import { Button } from '@/components/ui/button';
import { Pump } from 'basehub/react-pump';
import { ArrowUpRightIcon } from 'lucide-react';
import { draftMode } from 'next/headers';
import Image from 'next/image';
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
          <section className="grid grid-cols-3 divide-x">
            <div className="relative col-span-2 aspect-video overflow-hidden bg-dashed px-8 pt-8">
              <Image
                src={data.home.featuredNews.image.url}
                alt={data.home.featuredNews.image.alt ?? ''}
                width={data.home.featuredNews.image.width}
                height={data.home.featuredNews.image.height}
                className="rounded-2xl border"
              />
            </div>
            <div className="flex flex-col items-start justify-between gap-4 p-8">
              <div className="flex flex-col gap-2">
                <small className="text-muted-foreground">Latest feature</small>
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
            </div>
          </section>
        );
      }}
    </Pump>
  );
};
