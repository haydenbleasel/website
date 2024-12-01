import { Prose } from '@/components/prose';
import { Pump } from 'basehub/react-pump';
import { RichText } from 'basehub/react-rich-text';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Balancer from 'react-wrap-balancer';

type RoleProps = {
  params: {
    role: string;
  };
};

const Role = ({ params }: RoleProps) => (
  <Pump
    queries={[
      {
        __typename: true,
        work: {
          roles: {
            __args: {
              filter: {
                _sys_slug: {
                  eq: params.role,
                },
              },
            },
            items: {
              _title: true,
              _slug: true,
              description: true,
              endYear: true,
              startYear: true,
              role: true,
              url: true,
              type: true,
              location: true,
              content: {
                json: {
                  content: true,
                },
              },
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
    {/* biome-ignore lint/suspicious/useAwait: Server Actions must be async */}
    {async ([data]) => {
      'use server';

      if (!data.work.roles.items.length) {
        return notFound();
      }

      const role = data.work.roles.items[0];

      return (
        <>
          <section className="flex flex-col items-center justify-center gap-4 px-4 py-20 sm:px-0">
            <Image
              src={role.logo.url}
              alt={role.logo.alt ?? ''}
              width={32}
              height={32}
            />
            <h1 className="text-center font-bold text-5xl leading-tight tracking-tight">
              <Balancer>
                {role.role} at {role._title}
              </Balancer>
            </h1>
            <p className="mx-auto max-w-4xl text-center">
              <Balancer>{role.description}</Balancer>
            </p>
            <div className="flex items-center gap-4 text-base text-muted-foreground">
              <p>{role.type}</p>
              <p>&bull;</p>
              <p>
                {role.startYear} &mdash; {role.endYear ?? 'Present'}
              </p>
              <p>&bull;</p>
              <p>{role.location}</p>
              {role.url && (
                <>
                  <p>&bull;</p>
                  <a href={role.url} target="_blank" rel="noreferrer noopener">
                    {new URL(role.url).hostname}
                  </a>
                </>
              )}
            </div>
          </section>
          <Prose className="mx-auto py-16">
            <RichText content={role.content?.json.content} />
          </Prose>
        </>
      );
    }}
  </Pump>
);

export default Role;
