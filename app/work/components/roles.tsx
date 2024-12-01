import { Prose } from '@/components/prose';
import { cn } from '@/lib/utils';
import { Pump } from 'basehub/react-pump';
import Image from 'next/image';
import Link from 'next/link';

export const Roles = () => (
  <Pump
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
            <Link
              key={role._title}
              href={`/work/${role._slug}`}
              className={cn(
                'flex items-start gap-6 p-8 transition-colors',
                index % 2 === 0 ? 'border-r' : '',
                index < data.work.roles.items.length - 2 ? 'border-b' : '',
                'hover:bg-background'
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
                  <span className="block text-muted-foreground">
                    {role._title}
                  </span>
                </h2>
                <p className="text-muted-foreground text-sm">
                  {role.startYear} &mdash; {role.endYear ?? 'Present'}
                </p>
                <Prose className="prose-sm">
                  <p>{role.description}</p>
                </Prose>
              </div>
            </Link>
          ))}
        </div>
      );
    }}
  </Pump>
);
