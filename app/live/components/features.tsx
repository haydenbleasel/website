import { Section } from '@/components/section';
import { cn } from '@/lib/utils';
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
        <Section className="grid grid-cols-3 divide-x">
          <div className="bg-dashed p-8">
            <h2 className="font-semibold text-2xl">Features</h2>
          </div>
          <div className="col-span-2 grid grid-cols-2">
            {data.live.features.items
              .sort((a, b) => b.year - a.year)
              .map((item, index) => (
                <div
                  key={item._title}
                  className={cn(
                    index > 1 && 'border-t',
                    index % 2 === 0 && 'border-r'
                  )}
                >
                  {(item.url ?? item.file?.url) ? (
                    <a
                      key={item._title}
                      className="flex h-full flex-col items-start gap-1 p-8 transition-colors hover:bg-background"
                      href={item.url ?? item.file?.url}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <LiveItem data={item} />
                    </a>
                  ) : (
                    <div
                      key={item._title}
                      className="flex h-full flex-col items-start gap-1 p-8"
                    >
                      <LiveItem data={item} />
                    </div>
                  )}
                </div>
              ))}
            {data.live.features.items.length % 2 === 1 && (
              <div className="h-full w-full border-t bg-dashed" />
            )}
          </div>
        </Section>
      );
    }}
  </Pump>
);
