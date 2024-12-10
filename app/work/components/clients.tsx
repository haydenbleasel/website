import { Section } from '@/components/section';
import { cn } from '@/lib/utils';
import { ViewAnimation } from '@/providers/view-animation';
import { Pump } from 'basehub/react-pump';
import { draftMode } from 'next/headers';

export const Clients = async () => {
  const { isEnabled } = await draftMode();

  return (
    <Pump
      draft={isEnabled}
      queries={[
        {
          __typename: true,
          work: {
            clients: {
              items: {
                _title: true,
              },
            },
          },
        },
      ]}
    >
      {async ([data]) => {
        'use server';

        if (!data.work.clients.items.length) {
          return null;
        }

        return (
          <Section className="flex flex-col gap-8 px-8 py-16">
            <ViewAnimation
              initial={{ opacity: 0, translateY: -8 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              className="px-4"
            >
              <p className="text-center text-muted-foreground text-sm">
                I've also worked with the following clients
              </p>
            </ViewAnimation>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {data.work.clients.items
                .sort((a, b) => a._title.localeCompare(b._title))
                .map((client) => (
                  <div
                    className={cn(
                      'inline-flex rounded-full border bg-background px-3 py-1.5 text-xs shadow-sm',
                      'sm:text-sm'
                    )}
                    key={client._title}
                  >
                    {client._title}
                  </div>
                ))}
            </div>
          </Section>
        );
      }}
    </Pump>
  );
};
