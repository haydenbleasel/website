import { Prose } from '@/components/prose';
import { Section } from '@/components/section';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { BaseHubImage } from 'basehub/next-image';
import { Pump } from 'basehub/react-pump';
import Balancer from 'react-wrap-balancer';
import { ProjectVideo } from './video';

export const Apps = () => (
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
              cta: true,
              status: true,
              video: {
                url: true,
              },
              image: {
                url: true,
                alt: true,
                width: true,
                height: true,
              },
            },
          },
        },
      },
    ]}
  >
    {async ([data]) => {
      'use server';

      return (
        <Section className="grid md:grid-cols-2">
          {data.projects.apps.items.map((app, index) => (
            <a
              href={app.url}
              target="_blank"
              rel="noreferrer noopener"
              key={app._title}
              className={cn(
                'flex flex-col gap-8 px-4 pt-4 transition-all',
                'sm:px-8 sm:pt-8',
                'hover:bg-background hover:shadow-sm',
                index && 'border-t',
                index < 2 && 'sm:border-t-0',
                index % 2 === 0 && 'sm:border-r'
              )}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-bold text-2xl">{app._title}</h2>
                  <Badge
                    variant="outline"
                    className={cn(
                      'rounded-full',
                      app.status === 'Active' && 'border-success text-success',
                      app.status === 'Acquired' &&
                        'border-warning text-warning',
                      app.status === 'Shut Down' &&
                        'border-muted-foreground text-muted-foreground'
                    )}
                  >
                    {app.status}
                  </Badge>
                </div>
                <Prose>
                  <p className="leading-normal">
                    <Balancer>{app.description}</Balancer>
                  </p>
                </Prose>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-t-lg border-x border-t">
                {app.video && <ProjectVideo url={app.video.url} />}
                {app.image && (
                  <BaseHubImage
                    src={app.image.url}
                    alt={app.image.alt ?? ''}
                    width={app.image.width}
                    height={app.image.height}
                    className="object-cover"
                  />
                )}
              </div>
            </a>
          ))}
          {data.projects.apps.items.length % 2 === 1 && (
            <div className="h-full w-full border-t bg-dashed" />
          )}
        </Section>
      );
    }}
  </Pump>
);
