import { Prose } from '@/components/prose';
import { Section } from '@/components/section';
import { cn } from '@/lib/utils';
import { ViewAnimation } from '@/providers/view-animation';
import { BaseHubImage } from 'basehub/next-image';
import { Pump } from 'basehub/react-pump';
import { draftMode } from 'next/headers';
import Link from 'next/link';

export const Roles = async () => {
  const { isEnabled } = await draftMode();

  return (
    <Pump
      draft={isEnabled}
      queries={[
        {
          __typename: true,
          work: {
            roles: {
              items: {
                _title: true,
                _slug: true,
                description: true,
                endYear: true,
                startYear: true,
                role: true,
                url: true,
                location: true,
                type: true,
                logo: {
                  width: true,
                  height: true,
                  url: true,
                  alt: true,
                },
              },
            },
          },
        },
      ]}
    >
      {async ([data]) => {
        'use server';

        if (!data.work.roles.items.length) {
          return <div>No roles found</div>;
        }

        return (
          <Section className="grid sm:grid-cols-2">
            {data.work.roles.items.map((role, index) => (
              <ViewAnimation
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                delay={index % 2 ? 0.2 : 0}
                className={cn(
                  index % 2 === 0 ? 'sm:border-r' : '',
                  index < data.work.roles.items.length - 2 ? 'border-b' : ''
                )}
                key={role._title}
              >
                <Link
                  href={`/work/${role._slug}`}
                  className="flex items-start gap-6 p-8 transition-colors hover:bg-background"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center">
                    <BaseHubImage
                      src={role.logo.url}
                      width={role.logo.width}
                      height={role.logo.height}
                      alt={role.logo.alt ?? ''}
                      className="block h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-xl tracking-tight">
                      <span className="block leading-tight">{role.role}</span>
                      <span className="block text-muted-foreground">
                        {role._title}
                      </span>
                    </h2>
                    <Prose className="prose-sm">
                      <p>{role.description}</p>
                    </Prose>
                    <p className="text-muted-foreground text-sm">
                      {role.type} &bull; {role.startYear} &mdash;{' '}
                      {role.endYear ?? 'Present'} &bull; {role.location}
                    </p>
                  </div>
                </Link>
              </ViewAnimation>
            ))}
            {data.work.roles.items.length % 2 && (
              <div className="hidden border-t bg-dashed sm:block" />
            )}
          </Section>
        );
      }}
    </Pump>
  );
};
