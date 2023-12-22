import { StarIcon } from '@radix-ui/react-icons';
import { Link } from '@/components/link';
import { octokit } from '@/lib/octokit';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ForkIcon } from '@/components/icons';
import { Container } from '@/components/container';
import type { ReactElement } from 'react';

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
          .sort(
            (repoA, repoB) =>
              (repoB.stargazers_count ?? 0) - (repoA.stargazers_count ?? 0)
          )
          .map((repo) => (
            <Link href={repo.html_url} key={repo.name}>
              <Card className="not-prose">
                <CardHeader>
                  <CardTitle>{repo.name}</CardTitle>
                  <CardDescription>{repo.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="flex items-center gap-1 text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                    <StarIcon className="w-3 h-3" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                    <ForkIcon className="w-3 h-3" />
                    {repo.forks_count}
                  </span>
                </CardContent>
                <CardFooter>View on GitHub</CardFooter>
              </Card>
            </Link>
          ))}
      </div>
    </Container>
  );
};

export default Code;
