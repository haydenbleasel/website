import type { NextRequest } from 'next/server';
import parseError from '../../utils/parseError';
import res from '../../utils/response';

type GitHubRepo = {
  full_name: string;
  html_url: string;
  description: string;
  forks: number;
  watchers: number;
  language: string;
  topics: string[];
  updated_at: string;
  subscribers_count: number;
  stargazers_count: number;
};

export type RepositoryResponse = {
  error?: string;
  data?: GitHubRepo;
};

export const config = {
  runtime: 'experimental-edge',
};

const handler = async (req: NextRequest): Promise<Response> => {
  const { owner, repo } = (await req.json()) as {
    owner: string;
    repo: string;
  };

  if (
    req.headers.get('authorization') !==
    `Bearer ${process.env.NEXT_PUBLIC_API_PASSPHRASE ?? ''}`
  ) {
    return res(401, { error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res(405, { error: 'Method not allowed' });
  }

  if (!owner) {
    return res(400, { error: 'No owner provided' });
  }

  if (!repo) {
    return res(400, { error: 'No repo provided' });
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          accept: 'application/vnd.github.v3+json',
          Authorization: `token ${process.env.GITHUB_TOKEN ?? ''}`,
        },
      }
    );

    const data = (await response.json()) as GitHubRepo;

    return res(200, { data });
  } catch (error) {
    const message = parseError(error);

    return res(500, { error: message });
  }
};

export default handler;
