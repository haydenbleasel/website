import { Prose } from '@/components/prose';
import { StickyList } from '@/components/sections/sticky-list';
import { cn } from '@/lib/utils';
import { ViewAnimation } from '@/providers/view-animation';
import { BaseHubImage } from 'basehub/next-image';
import { Pump } from 'basehub/react-pump';

export const Recommendations = () => (
  <Pump
    queries={[
      {
        __typename: true,
        work: {
          recommendations: {
            title: true,
            text: true,
            list: {
              items: {
                _title: true,
                text: true,
                linkedIn: true,
                photo: {
                  width: true,
                  height: true,
                  url: true,
                  alt: true,
                },
                size: true,
              },
            },
          },
        },
      },
    ]}
  >
    {async ([data]) => {
      'use server';

      if (!data.work.recommendations.list.items.length) {
        return null;
      }

      return (
        <StickyList
          title={data.work.recommendations.title}
          description={data.work.recommendations.text}
        >
          <div className="grid divide-y sm:col-span-2 sm:grid-cols-2">
            {data.work.recommendations.list.items.map(
              (recommendation, index) => (
                <div
                  key={recommendation._title}
                  className={cn(
                    recommendation.size === 'Large'
                      ? 'sm:col-span-2'
                      : 'sm:col-span-1',
                    recommendation.size === 'Small' &&
                      data.work.recommendations.list.items.at(index - 1)
                        ?.size === 'Small' &&
                      'border-l'
                  )}
                >
                  <ViewAnimation
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    delay={index % 2 ? 0.2 : 0}
                    key={recommendation._title}
                    className={cn(
                      'mx-auto flex max-w-4xl flex-col items-start gap-6 px-4 py-8',
                      'sm:flex-row sm:px-8'
                    )}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full">
                      <BaseHubImage
                        src={recommendation.photo.url}
                        width={recommendation.photo.width}
                        height={recommendation.photo.height}
                        alt={recommendation.photo.alt ?? ''}
                        className="block h-full w-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <h3 className="font-semibold text-lg leading-normal tracking-tight">
                          {recommendation._title}
                        </h3>
                        <a
                          href={recommendation.linkedIn}
                          className="text-muted-foreground text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          @
                          {
                            new URL(recommendation.linkedIn).pathname.split(
                              '/'
                            )[2]
                          }
                        </a>
                      </div>
                      <Prose className="prose-sm max-w-none">
                        <p>{recommendation.text}</p>
                      </Prose>
                    </div>
                  </ViewAnimation>
                </div>
              )
            )}
          </div>
        </StickyList>
      );
    }}
  </Pump>
);
