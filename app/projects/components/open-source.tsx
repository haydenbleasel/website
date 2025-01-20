import { StickyList } from '@/components/sections/sticky-list';
import { octokit } from '@/lib/github';
import { cn } from '@/lib/utils';
import { ViewAnimation } from '@/providers/view-animation';
import { Pump } from 'basehub/react-pump';
import { StarIcon } from 'lucide-react';

const username = 'haydenbleasel';
const projects = ['next-forge', 'kibo', 'ultracite', 'eververse'];

export const OpenSource = () => (
  <Pump
    queries={[
      {
        __typename: true,
        work: {
          openSource: {
            title: true,
            text: true,
          },
        },
      },
    ]}
  >
    {async ([data]) => {
      'use server';

      const repositories = await octokit.rest.repos.listForUser({
        username,
        per_page: 100,
        type: 'owner',
      });

      const repos = repositories.data
        .filter((item) => !item.fork)
        .filter((item) => !item.archived)
        .filter((item) => item.name !== username)
        .filter((item) => item.name !== 'website')
        .filter((item) => !projects.includes(item.name))
        .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0));

      return (
        <StickyList
          title={data.work.openSource.title}
          description={data.work.openSource.text}
        >
          <div className="grid sm:col-span-2 sm:grid-cols-2">
            {repos.map((item, index) => (
              <div
                key={item.name}
                className={cn(
                  index && 'border-t',
                  index < 2 && 'sm:border-t-0',
                  index % 2 === 0 && 'sm:border-r'
                )}
              >
                <ViewAnimation
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  delay={index % 2 ? 0.2 : 0}
                  className="h-full"
                >
                  <a
                    key={item.name}
                    className={cn(
                      'flex h-full flex-col items-start justify-between gap-4 px-4 py-8 transition-colors hover:bg-background',
                      'sm:px-8'
                    )}
                    href={`https://github.com/${item.owner.login}/${item.name}`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <div className="flex flex-col gap-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <StarIcon size={12} />
                      <small className="text-sm">
                        {item.stargazers_count} stars
                      </small>
                    </div>
                  </a>
                </ViewAnimation>
              </div>
            ))}
            {repos.length % 2 === 1 && (
              <div className="h-full w-full border-t bg-dashed" />
            )}
          </div>
        </StickyList>
      );
    }}
  </Pump>
);
