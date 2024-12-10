import { Prose } from '@/components/prose';
import { Section } from '@/components/section';
import { cn } from '@/lib/utils';
import { ViewAnimation } from '@/providers/view-animation';
import { BaseHubImage } from 'basehub/next-image';
import { Pump } from 'basehub/react-pump';
import { draftMode } from 'next/headers';

export const Recommendations = async () => {
  const { isEnabled } = await draftMode();

  return (
    <Pump
      draft={isEnabled}
      queries={[
        {
          __typename: true,
          work: {
            recommendations: {
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
      ]}
    >
      {async ([data]) => {
        'use server';

        if (!data.work.recommendations.items.length) {
          return <div>No recommendations found</div>;
        }

        return (
          <Section className="grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="bg-dashed">
              <div className="sticky top-16 flex flex-col gap-2 self-start p-8">
                <h2 className="font-bold text-3xl tracking-tight">
                  What people say
                </h2>
                <p className="text-muted-foreground text-sm">
                  I&apos;ve been fortunate to work with some amazing people over
                  the years. Here&apos;s what they have to say about me.
                </p>
              </div>
            </div>
            <div
              className="grid divide-y sm:col-span-2 sm:grid-cols-2"
              id="work"
            >
              {data.work.recommendations.items.map((recommendation, index) => (
                <div
                  key={recommendation._title}
                  className={cn(
                    recommendation.size === 'Large'
                      ? 'sm:col-span-2'
                      : 'sm:col-span-1',
                    recommendation.size === 'Small' &&
                      data.work.recommendations.items.at(index - 1)?.size ===
                        'Small' &&
                      'border-l'
                  )}
                >
                  <ViewAnimation
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    delay={index % 2 ? 0.2 : 0}
                    key={recommendation._title}
                    className="mx-auto flex max-w-4xl flex-col items-start gap-6 p-8 sm:flex-row"
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
              ))}
            </div>
          </Section>
        );
      }}
    </Pump>
  );
};
