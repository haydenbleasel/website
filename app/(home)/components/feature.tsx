import { Button } from '@/components/ui/button';
import { Pump } from 'basehub/react-pump';
import { ArrowUpRightIcon } from 'lucide-react';
import { draftMode } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

export const Feature = async () => {
  const { isEnabled } = await draftMode();

  return (
    <Pump
      queries={[
        {
          __typename: true,
          home: {
            featureTitle: true,
            featureText: true,
            featureLink: true,
            featureImage: {
              url: true,
              alt: true,
              width: true,
              height: true,
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
          <div className="grid grid-cols-3 divide-x">
            <div className="relative aspect-video overflow-hidden bg-dashed px-8 pt-8 col-span-2">
              <Image
                src={data.home.featureImage?.url ?? ''}
                alt={data.home.featureImage?.alt ?? ''}
                width={data.home.featureImage?.width ?? 0}
                height={data.home.featureImage?.height ?? 0}
                className="rounded-2xl border"
              />
            </div>
            <div className="flex flex-col items-start justify-between gap-4 p-8">
              <div className="flex flex-col gap-2">
                <small className="text-muted-foreground">Latest feature</small>
                <h2 className="font-bold text-3xl tracking-tight">
                  {data.home.featureTitle}
                </h2>
                <p className="text-muted-foreground">{data.home.featureText}</p>
              </div>
              <div className="flex items-center gap-1">
                <Button asChild variant="outline" className="gap-2">
                  <a
                    href={data.home.featureLink}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Keep reading
                    <ArrowUpRightIcon size={16} />
                  </a>
                </Button>
                <Button variant="link" className="text-muted-foreground">
                  <Link href="/features">View all features</Link>
                </Button>
              </div>
            </div>
          </div>
        );
      }}
    </Pump>
  );
};
