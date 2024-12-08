import { Prose } from '@/components/prose';
import { Section } from '@/components/section';
import { cn } from '@/lib/utils';
import { ViewAnimation } from '@/providers/view-animation';
import { Pump } from 'basehub/react-pump';
import Image from 'next/image';

export const Recommendations = () => (
  <Pump
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
        <Section className="grid grid-cols-3 divide-x">
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
          <div className="col-span-2 grid grid-cols-2 divide-y" id="work">
            {data.work.recommendations.items.map((recommendation, index) => (
              <ViewAnimation
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                delay={index % 2 ? 0.2 : 0}
                key={recommendation._title}
                className={cn(
                  'mx-auto flex max-w-4xl items-start gap-6 p-8',
                  recommendation.size === 'Large'
                    ? 'sm:col-span-2'
                    : 'sm:col-span-1',
                  recommendation.size === 'Small' &&
                    data.work.recommendations.items.at(index - 1)?.size ===
                      'Small' &&
                    'border-l'
                )}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full">
                  <Image
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
                      @{new URL(recommendation.linkedIn).pathname.split('/')[2]}
                    </a>
                  </div>
                  <Prose className="prose-sm max-w-none">
                    <p>{recommendation.text}</p>
                  </Prose>
                </div>
              </ViewAnimation>
            ))}
          </div>
        </Section>
      );
    }}
  </Pump>
);
