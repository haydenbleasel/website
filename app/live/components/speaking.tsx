import { StickyList } from '@/components/sections/sticky-list';
import { cn } from '@/lib/utils';
import { ViewAnimation } from '@/providers/view-animation';
import { Pump } from 'basehub/react-pump';
import { LiveItem } from './live-item';

export const Speaking = () => (
  <Pump
    queries={[
      {
        __typename: true,
        live: {
          speaking: {
            items: {
              _title: true,
              location: true,
              url: true,
              year: true,
            },
          },
        },
      },
    ]}
  >
    {async ([data]) => {
      'use server';

      if (!data.live.speaking.items.length) {
        return <div>No events found</div>;
      }

      return (
        <StickyList title="Speaking">
          <div className="grid sm:col-span-2 sm:grid-cols-2">
            {data.live.speaking.items
              .sort((a, b) => b.year - a.year)
              .map((item, index) => (
                <div
                  key={item._title}
                  className={cn(
                    index > 1 && 'border-t',
                    index % 2 === 0 && 'sm:border-r'
                  )}
                >
                  <ViewAnimation
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    delay={index % 2 ? 0.2 : 0}
                  >
                    {item.url ? (
                      <a
                        key={item._title}
                        className={cn(
                          'flex h-full flex-col items-start gap-1 px-4 py-8 transition-colors hover:bg-background',
                          'sm:px-8'
                        )}
                        href={item.url}
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
            {data.live.speaking.items.length % 2 === 1 && (
              <div className="h-full w-full border-t bg-dashed" />
            )}
          </div>
        </StickyList>
      );
    }}
  </Pump>
);
