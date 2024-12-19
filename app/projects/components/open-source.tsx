import { Prose } from '@/components/prose';
import { Section } from '@/components/section';
import { octokit } from '@/lib/github';
import { cn } from '@/lib/utils';
import { ViewAnimation } from '@/providers/view-animation';
import { StarIcon } from 'lucide-react';

const username = 'haydenbleasel';

export const OpenSource = async () => {
  const { data } = await octokit.rest.repos.listForUser({
    username,
    per_page: 100,
    type: 'owner',
  });

  const repos = data
    .filter((item) => !item.fork)
    .filter((item) => item.name !== username)
    .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0));

  return (
    <Section className="grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      <div className="flex flex-col gap-2 bg-dashed p-8">
        <h2 className="font-semibold text-2xl">Open Source</h2>
        <Prose>I create and maintain a number of open source projects.</Prose>
      </div>
      <div className="grid sm:col-span-2 sm:grid-cols-2">
        {repos.map((item, index) => (
          <div
            key={item.name}
            className={cn(
              index > 1 && 'border-t',
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
                className="flex h-full flex-col items-start justify-between gap-4 p-8 transition-colors hover:bg-background"
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
    </Section>
  );
};
