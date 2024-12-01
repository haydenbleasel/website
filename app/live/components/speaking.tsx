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
        <div className="grid grid-cols-3 divide-x">
          <div className="p-8">
            <h2 className="font-semibold text-2xl">Speaking</h2>
          </div>
          <div className="col-span-2 grid grid-cols-2">
            {data.live.speaking.items
              .sort((a, b) => b.year - a.year)
              .map((item) =>
                item.url ? (
                  <a
                    key={item._title}
                    className="flex flex-col items-start gap-1 p-8 transition-colors hover:bg-background"
                    href={item.url}
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
