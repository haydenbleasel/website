import { Prose } from '@/components/prose';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Pump } from 'basehub/react-pump';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import { Fragment } from 'react';

const BackgroundVideo = dynamic(() => import('next-video/background-video'));

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
                description: true,
                url: true,
                size: true,
                cta: true,
                video: {
                  url: true,
                  aspectRatio: true,
                },
              },
            },
          },
        },
      ]}
      draft={isEnabled}
    >
      {async ([data]) => {
        'use server';

        return (
          <div className="grid grid-cols-6">
            {data.projects.apps.items.map((app, index) =>
              app.size === 'Large' ? (
                <Fragment key={app._title}>
                  <div
                    className={cn(
                      'relative col-span-4 aspect-video bg-dashed p-8',
                      index > 0 && 'border-t'
                    )}
                  >
                    {app.video && (
                      <>
                        <BackgroundVideo
                          src={app.video.url}
                          className="h-full w-full overflow-hidden rounded-2xl object-cover"
                        />
                        <div className="dashed-line-top" />
                        <div className="dashed-line-left" />
                        <div className="dashed-line-right" />
                        <div className="dashed-line-bottom" />
                      </>
                    )}
                  </div>
                  <div
                    className={cn(
                      'col-span-2 border-l p-8',
                      index > 0 && 'border-t'
                    )}
                  >
                    <h3 className="font-semibold text-lg">{app._title}</h3>
                    <Prose className="prose-sm">
                      <p>{app.description}</p>
                    </Prose>
                    <Button asChild variant="outline">
                      <a
                        href={app.url}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {app.cta}
                      </a>
                    </Button>
                  </div>
                </Fragment>
              ) : (
                <div
                  key={app._title}
                  className={cn(
                    'col-span-3 p-8',
                    app.size === 'Small' &&
                      data.projects.apps.items.at(index - 1)?.size ===
                        'Small' &&
                      'border-l',
                    index > 0 && 'border-t'
                  )}
                >
                  <h3 className="font-semibold text-lg">{app._title}</h3>
                  <Prose className="prose-sm">
                    <p>{app.description}</p>
                  </Prose>
                  <Button asChild variant="outline">
                    <a href={app.url} target="_blank" rel="noreferrer noopener">
                      {app.cta}
                    </a>
                  </Button>
                </div>
              )
            )}
          </div>
        );
      }}
    </Pump>
  );
};
