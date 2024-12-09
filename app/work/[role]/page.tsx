import { HeroSection } from '@/components/hero-section';
import { Prose } from '@/components/prose';
import { Section } from '@/components/section';
import { richTextComponents } from '@/lib/rich-text';
import { basehub } from 'basehub';
import { BaseHubImage } from 'basehub/next-image';
import { Pump } from 'basehub/react-pump';
import { RichText } from 'basehub/react-rich-text';
import { notFound } from 'next/navigation';
import Balancer from 'react-wrap-balancer';

type RoleProps = {
  params: Promise<{
    role: string;
  }>;
};

export const generateMetadata = async ({ params }: RoleProps) => {
  const { work } = await basehub({ cache: 'no-store' }).query({
    work: {
      roles: {
        __args: {
          filter: {
            _sys_slug: {
              eq: (await params).role,
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

const Role = async ({ params }: RoleProps) => (
  <Pump
    queries={[
      {
        __typename: true,
        work: {
          roles: {
            __args: {
              filter: {
                _sys_slug: {
                  eq: (await params).role,
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
            image={
              role.logo ? (
                <BaseHubImage
                  src={role.logo.url}
                  alt={role.logo.alt ?? ''}
                  width={role.logo.width}
                  height={role.logo.height}
                  className="aspect-square h-12 w-auto object-contain"
                />
              ) : null
            }
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
          <Section className="py-16">
            <Prose className="mx-auto max-w-3xl">
              <RichText
                content={role.content?.json.content}
                components={richTextComponents}
              />
            </Prose>
          </Section>
        </>
      );
    }}
  </Pump>
);

export default Role;
