import type { FC } from 'react';
import React from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import { PrismicLink } from '@prismicio/react';
import type { KeyTextField } from '@prismicio/types';
import useSWR from 'swr';
import { GitHub } from 'react-feather';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { EyeIcon, RepoForkedIcon, StarIcon } from '@primer/octicons-react';
import type { RepositoryResponse } from '../../pages/api/github-repo';

const GitHubRepo: FC<
  SliceComponentProps<{
    slice_type: 'github-repo';
    primary: {
      owner: KeyTextField;
      repo: KeyTextField;
    };
  }>
> = ({ slice }) => {
  const { owner, repo } = slice.primary;
  const { data } = useSWR<RepositoryResponse['data'], Error>(
    '/api/github-repo',
    async (url: string) => {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          owner,
          repo,
        }),
      });

      const newData = (await response.json()) as RepositoryResponse;

      if (newData.error) {
        throw new Error(newData.error);
      }

      return newData.data;
    }
  );

  return data ? (
    <Link href={data.html_url} passHref>
      <a
        href={data.html_url}
        className="flex flex-col sm:flex-row items-center overflow-hidden rounded-md border border-gray-200 bg-white drop-shadow-sm transition-all hover:drop-shadow-md dark:text-gray-900"
      >
        <span className="border-b sm:border-b-0 w-full sm:w-[auto] sm:border-r border-gray-200 bg-gray-50 p-11 dark:border-gray-700 dark:bg-gray-800">
          <GitHub size={24} className="text-gray-700 mx-auto" />
        </span>
        <span className="flex flex-1 flex-col gap-[2px] p-4 w-full">
          <span className="flex items-center justify-between">
            <p className="text-md font-semibold text-gray-900 line-clamp-1 dark:text-white">
              {data.full_name}
            </p>
            <span className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <RepoForkedIcon
                  size={12}
                  className="text-gray-500 dark:text-gray-400"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {data.forks}
                </p>
              </span>
              <span className="flex items-center gap-1">
                <EyeIcon
                  size={12}
                  className="text-gray-500 dark:text-gray-400"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {data.watchers}
                </p>
              </span>
              <span className="flex items-center gap-1">
                <StarIcon
                  size={12}
                  className="text-gray-500 dark:text-gray-400"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {data.stargazers_count}
                </p>
              </span>
            </span>
          </span>
          <p className="text-sm text-gray-500 line-clamp-1 dark:text-gray-400">
            {data.description}
          </p>
          <p className="text-xs text-gray-500 line-clamp-1 dark:text-gray-400">
            Last updated {format(parseISO(data.updated_at), 'MMM d, yyyy')}.
            Written in {data.language}.
          </p>
        </span>
      </a>
    </Link>
  ) : (
    <PrismicLink href={`https://github.com/${owner}/${repo}`}>
      github.com/{owner}/{repo}
    </PrismicLink>
  );
};

export default GitHubRepo;
