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
        <div className="grid grid-cols-3 divide-x">
          <div className="p-8">
            <h2 className="font-semibold text-2xl">Features</h2>
          </div>
          <div className="col-span-2 grid grid-cols-2">
            {data.live.features.items
              .sort((a, b) => b.year - a.year)
              .map((item) =>
                (item.url ?? item.file?.url) ? (
                  <a
                    key={item._title}
                    className="flex flex-col items-start gap-1 p-8 transition-colors hover:bg-background"
                    href={item.url ?? item.file?.url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <LiveItem data={item} />
                  </a>
                ) : (
                  <div
                    key={item._title}
                    className="flex flex-col items-start gap-1 p-8 transition-colors hover:bg-background"
                  >
                    <LiveItem data={item} />
                  </div>
                )
              )}
          </div>
        </div>
      );
    }}
  </Pump>
);
