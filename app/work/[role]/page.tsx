import { HeroSection } from '@/components/hero-section';
import { Prose } from '@/components/prose';
import { richTextComponents } from '@/lib/rich-text';
import { basehub } from 'basehub';
import { Pump } from 'basehub/react-pump';
import { RichText } from 'basehub/react-rich-text';
import { notFound } from 'next/navigation';
import Balancer from 'react-wrap-balancer';

type RoleProps = {
  params: {
    role: string;
  };
};

export const generateMetadata = async ({ params }: RoleProps) => {
  const { work } = await basehub({ cache: 'no-store' }).query({
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
          description: true,
        },
      },
    },
  });

  if (!work.roles.items.length) {
    return {};
  }

  const [role] = work.roles.items;

  return {
    title: role._title,
    description: role.description,
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
          <HeroSection
            image={{
              url: role.logo.url,
              alt: role.logo.alt ?? '',
              width: 32,
              height: 32,
            }}
            title={role.role}
          >
            <p className="mx-auto max-w-4xl text-center">
              <Balancer>{role.description}</Balancer>
            </p>
            <div className="flex items-center justify-center gap-4 text-muted-foreground text-sm">
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
          </HeroSection>
          <section className="py-16">
            <Prose className="mx-auto max-w-3xl">
              <RichText
                content={role.content?.json.content}
                components={richTextComponents}
              />
            </Prose>
          </section>
        </>
      );
    }}
  </Pump>
);

export default Role;
