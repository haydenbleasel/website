import { Button } from '@/components/ui/button';
import { Pump } from 'basehub/react-pump';
import { RichText } from 'basehub/react-rich-text';
import { draftMode } from 'next/headers';

export const Apps = async () => {
  const { isEnabled } = await draftMode();

  return (
    <Pump
      queries={[
        {
          __typename: true,
          projects: {
            apps: {
              items: {
                _title: true,
                description: {
                  json: {
                    content: true,
                  },
                },
                image: {
                  width: true,
                  height: true,
                  url: true,
                  alt: true,
                },
                url: true,
              },
            },
          },
        },
      ]}
      draft={isEnabled}
    >
      {async ([data]) => {
        'use server';

        return data.projects.apps.items.map((app) => (
          <div key={app._title} className="grid grid-cols-2 divide-x">
            <div className="p-8">
              <h3 className="font-semibold text-lg">{app._title}</h3>
              <div className="prose prose-sm prose-neutral">
                <RichText content={app.description.json.content} />
              </div>
              <Button asChild variant="outline">
                <a href={app.url} target="_blank" rel="noreferrer noopener">
                  View App
                </a>
              </Button>
            </div>
            <div>
              <div className="w-full aspect-video bg-muted-foreground" />
            </div>
          </div>
        ));
      }}
    </Pump>
  );
};
