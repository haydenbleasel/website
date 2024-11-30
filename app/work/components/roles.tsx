import { cn } from '@/lib/utils';
import { Pump } from 'basehub/react-pump';
import { RichText } from 'basehub/react-rich-text';
import Image from 'next/image';

export const Roles = () => (
  <Pump
    queries={[
      {
        __typename: true,
        work: {
          roles: {
            items: {
              _title: true,
              description: {
                json: {
                  content: true,
                },
              },
              endYear: true,
              startYear: true,
              role: true,
              url: true,
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
        <div className="grid grid-cols-2">
          {data.work.roles.items.map((role, index) => (
            <div
              key={role._title}
              className={cn(
                'flex items-start gap-6 p-8',
                index % 2 === 0 ? 'border-r' : '',
                index < data.work.roles.items.length - 2 ? 'border-b' : ''
              )}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center">
                <Image
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
                  <a
                    className="block text-muted-foreground leading-tight"
                    href={role.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {role._title}
                  </a>
                </h2>
                <p className="text-muted-foreground text-sm">
                  {role.startYear} &mdash; {role.endYear ?? 'Present'}
                </p>
                <div className="prose prose-sm prose-neutral">
                  <RichText content={role.description.json.content} />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }}
  </Pump>
);
