import { cn } from '@/lib/utils';
import { Pump } from 'basehub/react-pump';
import { Link } from 'lucide-react';

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
        return <div>No speaking found</div>;
      }

      return (
        <div className="grid grid-cols-3">
          {data.live.speaking.items
            .sort(
              (a, b) => new Date(b.year).getTime() - new Date(a.year).getTime()
            )
            .map((post, index) => (
              <Link
                key={post._title}
                href={post.url ?? ''}
                className={cn(
                  'flex flex-col gap-2 p-8 transition-colors hover:bg-background',
                  index % 3 !== 2 && 'border-r',
                  index > 2 && 'border-t'
                )}
              >
                <h2 className="font-bold text-lg leading-normal tracking-tight">
                  {post._title}
                </h2>
                <p>
                  {post.location} &bull; {post.year}
                </p>
              </Link>
            ))}
        </div>
      );
    }}
  </Pump>
);
