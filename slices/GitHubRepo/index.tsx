import type { FC } from 'react';
import React from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import { PrismicLink } from '@prismicio/react';
import type { KeyTextField } from '@prismicio/types';
import useSWR from 'swr';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import dynamic from 'next/dynamic';
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
        headers: {
          Authorization: `Bearer ${
            process.env.NEXT_PUBLIC_API_PASSPHRASE ?? ''
          }`,
        },
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

  const EyeIcon = dynamic(async () => {
    const OctoIcons = await import(
      /* webpackChunkName: "octoicons-react" */
      '@primer/octicons-react'
    );

    return OctoIcons.EyeIcon;
  });

  const RepoForkedIcon = dynamic(async () => {
    const OctoIcons = await import(
      /* webpackChunkName: "octoicons-react" */
      '@primer/octicons-react'
    );

    return OctoIcons.RepoForkedIcon;
  });

  const StarIcon = dynamic(async () => {
    const OctoIcons = await import(
      /* webpackChunkName: "octoicons-react" */
      '@primer/octicons-react'
    );

    return OctoIcons.StarIcon;
  });

  const GitHub = dynamic(async () => {
    const FeatherIcons = await import(
      /* webpackChunkName: "react-feather" */
      'react-feather'
    );

    return FeatherIcons.GitHub;
  });

  return data ? (
    <Link
      href={data.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center overflow-hidden rounded-md border border-neutral-200 bg-white drop-shadow-sm transition-all hover:-translate-y-1 hover:drop-shadow-md dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-900 sm:flex-row"
    >
      <span className="w-full border-b border-neutral-200 bg-neutral-50 p-11 dark:border-neutral-700 dark:bg-neutral-800 sm:w-[auto] sm:border-b-0 sm:border-r">
        <GitHub
          size={24}
          className="mx-auto text-neutral-700 dark:text-neutral-300"
        />
      </span>
      <span className="flex w-full flex-1 flex-col gap-[2px] p-4">
        <span className="flex items-center justify-between">
          <p className="text-md font-semibold text-neutral-900 line-clamp-1 dark:text-white">
            {data.full_name}
          </p>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <RepoForkedIcon
                size={12}
                className="text-neutral-500 dark:text-neutral-400"
              />
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {data.forks}
              </p>
            </span>
            <span className="flex items-center gap-1">
              <EyeIcon
                size={12}
                className="text-neutral-500 dark:text-neutral-400"
              />
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {data.watchers}
              </p>
            </span>
            <span className="flex items-center gap-1">
              <StarIcon
                size={12}
                className="text-neutral-500 dark:text-neutral-400"
              />
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {data.stargazers_count}
              </p>
            </span>
          </span>
        </span>
        <p className="text-sm text-neutral-500 line-clamp-1 dark:text-neutral-400">
          {data.description}
        </p>
        <p className="text-xs text-neutral-500 line-clamp-1 dark:text-neutral-400">
          Last updated {format(parseISO(data.updated_at), 'MMM d, yyyy')}.
          Written in {data.language}.
        </p>
      </span>
    </Link>
  ) : (
    <PrismicLink href={`https://github.com/${owner ?? ''}/${repo ?? ''}`}>
      github.com/{owner}/{repo}
    </PrismicLink>
  );
};

export default GitHubRepo;
