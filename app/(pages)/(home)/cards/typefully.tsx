import type { TypefullyProperties } from '@/app/api/cron/typefully/route';
import { Card } from '@/components/card';
import { get } from '@vercel/edge-config';
import type { ReactElement } from 'react';

export const TypefullyCard = async (): Promise<ReactElement> => {
  const tweets = await get<TypefullyProperties[]>('typefully');

  if (!tweets) {
    return <div />;
  }

  return (
    <Card
      title="Recent Tweets"
      className="flex flex-col justify-between gap-4 p-4"
    >
      {tweets.map((tweet) => (
        <div key={tweet.id} className="flex items-center gap-2 text-sm">
          <div
            className="truncate"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            dangerouslySetInnerHTML={{
              __html: tweet.html.replace(/<br\s*\/?>/g, ' '),
            }}
          />
          {tweet.hasImages && <span className="shrink-0">🌄</span>}
          {tweet.length > 1 && (
            <span className="shrink-0 text-neutral-500 dark:text-neutral-400">
              + {tweet.length - 1}
            </span>
          )}
        </div>
      ))}
    </Card>
  );
};
