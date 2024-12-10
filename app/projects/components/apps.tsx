import { Prose } from '@/components/prose';
import { Section } from '@/components/section';
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
      draft={isEnabled}
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
                offset: true,
                position: true,
              },
            },
          },
        },
      ]}
    >
      {async ([data]) => {
        'use server';

        return (
          <Section className="grid sm:grid-cols-6">
            {data.projects.apps.items.map((app, index) =>
              app.size === 'Large' ? (
                <Fragment key={app._title}>
                  <div
                    className={cn(
                      'relative aspect-video bg-dashed',
                      'sm:col-span-4',
                      index > 0 && 'border-t',
                      app.offset === 'Center' && 'p-8',
                      app.offset === 'Top-Left' && 'pt-8 pl-8',
                      app.offset === 'Top-Right' && 'pt-8 pr-8',
                      app.offset === 'Bottom-Left' && 'pb-8 pl-8',
                      app.offset === 'Bottom-Right' && 'pr-8 pb-8'
                    )}
                  >
                    {app.video && (
                      <>
                        <BackgroundVideo
                          src={app.video.url}
                          className={cn(
                            'h-full w-full overflow-hidden object-cover',
                            app.position === 'Center' && 'object-center',
                            app.position === 'Left' && 'object-left',
                            app.position === 'Right' && 'object-right',
                            app.position === 'Top' && 'object-top',
                            app.position === 'Bottom' && 'object-bottom',
                            app.offset === 'Center' && 'rounded-2xl',
                            app.offset === 'Top-Left' && 'rounded-tl-2xl',
                            app.offset === 'Top-Right' && 'rounded-tr-2xl',
                            app.offset === 'Bottom-Left' && 'rounded-bl-2xl',
                            app.offset === 'Bottom-Right' && 'rounded-br-2xl'
                          )}
                        />
                        {app.offset === 'Center' && (
                          <>
                            <div className="dashed-line-top" />
                            <div className="dashed-line-left" />
                            <div className="dashed-line-right" />
                            <div className="dashed-line-bottom" />
                          </>
                        )}
                        {app.offset === 'Top-Left' && (
                          <>
                            <div className="dashed-line-top" />
                            <div className="dashed-line-left" />
                          </>
                        )}
                        {app.offset === 'Top-Right' && (
                          <>
                            <div className="dashed-line-top" />
                            <div className="dashed-line-right" />
                          </>
                        )}
                        {app.offset === 'Bottom-Left' && (
                          <>
                            <div className="dashed-line-bottom" />
                            <div className="dashed-line-left" />
                          </>
                        )}
                        {app.offset === 'Bottom-Right' && (
                          <>
                            <div className="dashed-line-bottom" />
                            <div className="dashed-line-right" />
                          </>
                        )}
                      </>
                    )}
                  </div>
                  <div
                    className={cn(
                      'flex flex-col items-start justify-between gap-4 border-l p-8',
                      'sm:col-span-2',
                      index > 0 && 'border-t'
                    )}
                  >
                    <div className="flex flex-col gap-2">
                      <h2 className="font-bold text-2xl">{app._title}</h2>
                      <Prose>
                        <p>{app.description}</p>
                      </Prose>
                    </div>
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
                    'flex flex-col items-start justify-between gap-4 p-8',
                    'sm:col-span-3',
                    app.size === 'Small' &&
                      data.projects.apps.items.at(index - 1)?.size ===
                        'Small' &&
                      'border-l',
                    index > 0 && 'border-t'
                  )}
                >
                  <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-xl">{app._title}</h2>
                    <Prose className="prose-sm">
                      <p>{app.description}</p>
                    </Prose>
                  </div>
                  <Button asChild variant="outline">
                    <a href={app.url} target="_blank" rel="noreferrer noopener">
                      {app.cta}
                    </a>
                  </Button>
                </div>
              )
            )}
          </Section>
        );
      }}
    </Pump>
  );
};
