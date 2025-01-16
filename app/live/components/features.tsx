import { StickyList } from '@/components/sections/sticky-list';
import { cn } from '@/lib/utils';
import { ViewAnimation } from '@/providers/view-animation';
import { Pump } from 'basehub/react-pump';
import { LiveItem } from './live-item';

export const Features = () => (
  <Pump
    queries={[
      {
        __typename: true,
        live: {
          features: {
            items: {
              _title: true,
              location: true,
              url: true,
              file: {
                url: true,
              },
              year: true,
            },
          },
        },
      },
    ]}
  >
    {async ([data]) => {
      'use server';

      if (!data.live.features.items.length) {
        return <div>No features found</div>;
      }

      return (
        <StickyList title="Features">
          <div className="grid sm:col-span-2 sm:grid-cols-2">
            {data.live.features.items
              .sort((a, b) => b.year - a.year)
              .map((item, index) => (
                <div
                  key={item._title}
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
                    {(item.url ?? item.file?.url) ? (
                      <a
                        key={item._title}
                        className={cn(
                          'flex h-full flex-col items-start gap-1 px-4 py-8 transition-colors hover:bg-background',
                          'sm:px-8'
                        )}
                        href={item.url ?? item.file?.url}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <LiveItem data={item} />
                      </a>
                    ) : (
                      <div
                        key={item._title}
                        className={cn(
                          'flex h-full flex-col items-start gap-1 px-4 py-8',
                          'sm:px-8'
                        )}
                      >
                        <LiveItem data={item} />
                      </div>
                    )}
                  </ViewAnimation>
                </div>
              ))}
            {data.live.features.items.length % 2 === 1 && (
              <div className="h-full w-full border-t bg-dashed" />
            )}
          </div>
        </StickyList>
      );
    }}
  </Pump>
);
