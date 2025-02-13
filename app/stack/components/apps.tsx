import { StickyList } from '@/components/sections/sticky-list';
import { env } from '@/lib/env';
import { cn } from '@/lib/utils';
import { ViewAnimation } from '@/providers/view-animation';
import { Pump } from 'basehub/react-pump';
import groupBy from 'lodash.groupby';
import { VerifiedIcon } from 'lucide-react';
import Image from 'next/image';

export const Apps = () => (
  <Pump
    queries={[
      {
        __typename: true,
        stack: {
          apps: {
            items: {
              _title: true,
              description: true,
              url: true,
              category: true,
              featured: true,
              imageUrl: true,
            },
          },
        },
      },
    ]}
  >
    {async ([data]) => {
      'use server';

      const groups = groupBy(data.stack.apps.items, 'category');

      return Object.entries(groups).map(([category, apps]) => (
        <StickyList title={category} key={category}>
          <div className="grid sm:col-span-2 sm:grid-cols-2">
            {apps
              .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
              .map((app, index) => (
                <div
                  key={app._title}
                  className={cn(
                    index && 'border-t',
                    index < 2 && 'sm:border-t-0',
                    index % 2 === 0 && 'sm:border-r'
                  )}
                >
                  <ViewAnimation
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    delay={index % 2 ? 0.2 : 0}
                  >
                    <a
                      key={app._title}
                      className={cn(
                        'flex items-start gap-4 px-4 py-8 transition-colors hover:bg-background',
                        'sm:px-8'
                      )}
                      href={app.url}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <Image
                        src={`https://img.logo.dev/${new URL(app.imageUrl ?? app.url).hostname}?token=${env.NEXT_PUBLIC_LOGO_DEV_TOKEN}`}
                        alt={app.url}
                        width={40}
                        height={40}
                        className="rounded-md ring-1 ring-foreground/5"
                        quality={100}
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-semibold tracking-tight">
                            {app._title}
                          </h3>
                          {app.featured && (
                            <VerifiedIcon className="text-success" size={16} />
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {app.description}
                        </p>
                      </div>
                    </a>
                  </ViewAnimation>
                </div>
              ))}
            {apps.length % 2 === 1 && (
              <div className="size-full border-t bg-dashed" />
            )}
          </div>
        </StickyList>
      ));
    }}
  </Pump>
);
