import { Pump } from 'basehub/react-pump';
import groupBy from 'lodash.groupby';
import { draftMode } from 'next/headers';
import Image from 'next/image';

export const Apps = async () => {
  const { isEnabled } = await draftMode();

  return (
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
              },
            },
          },
        },
      ]}
      draft={isEnabled}
    >
      {async ([data]) => {
        'use server';

        const groups = groupBy(data.stack.apps.items, 'category');

        return Object.entries(groups).map(([category, apps]) => (
          <div className="grid grid-cols-3 divide-x" key={category}>
            <div className="p-8">
              <h2 className="text-2xl font-semibold">{category}</h2>
            </div>
            <div className="grid grid-cols-2 col-span-2 gap-6 p-8">
              {apps.map((app) => (
                <a
                  key={app._title}
                  className="flex items-start gap-4"
                  href={app.url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Image
                    src={`https://img.logo.dev/${new URL(app.url).hostname}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN}`}
                    alt={app.url}
                    width={32}
                    height={32}
                    className="rounded-md"
                    quality={100}
                  />
                  <div>
                    <h3 className="font-semibold tracking-tight">
                      {app._title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {app.description}{' '}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ));
      }}
    </Pump>
  );
};
