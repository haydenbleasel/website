import { StarIcon } from '@radix-ui/react-icons';
import glimpse from 'react-glimpse/server';
import Image from 'next/image';
import { Link } from '@/components/link';
import { octokit } from '@/lib/octokit';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ForkIcon } from '@/components/icons';
import { Container } from '@/components/container';
import type { RestEndpointMethodTypes } from '@octokit/rest';
import type { ReactElement } from 'react';

const Project = async ({
  data,
}: {
  readonly data: RestEndpointMethodTypes['repos']['listForUser']['response']['data'][0];
}): Promise<ReactElement> => {
  const { image } = await glimpse(data.html_url);

  return (
    <Link
      href={data.html_url}
      key={data.name}
      className="no-underline hover:-translate-y-1 transition-transform"
    >
      <Card className="not-prose overflow-hidden">
        {image ? (
          <Image src={image} alt="" width={1200} height={600} unoptimized />
        ) : null}
        <CardHeader>
          <CardTitle>{data.name}</CardTitle>
          <CardDescription>{data.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            <span className="flex items-center gap-1">
              <StarIcon className="w-3 h-3" />
              {data.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <ForkIcon className="w-3 h-3" />
              {data.forks_count}
            </span>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            {data.language}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

const Code = async (): Promise<ReactElement> => {
  const repos = await octokit.rest.repos.listForUser({
    username: 'haydenbleasel',
    per_page: 100,
  });

  return (
    <Container wide>
      <h1>Open Source</h1>
      <div className="grid grid-cols-2 gap-8">
        {repos.data
          .filter((repo) => !repo.fork)
          .filter((repo) => !repo.archived)
          .filter((repo) => !repo.private)
          .filter((repo) => !repo.disabled)
          .filter((repo) => repo.name !== repo.owner.login)
          .sort(
            (repoA, repoB) =>
              (repoB.stargazers_count ?? 0) - (repoA.stargazers_count ?? 0)
          )
          .map((repo) => (
            <Project data={repo} key={repo.id} />
          ))}
      </div>
    </Container>
  );
};

export default Code;
