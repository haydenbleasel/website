import type { NextApiHandler } from 'next';

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

const handler: NextApiHandler<RepositoryResponse> = async (req, res) => {
  const { owner, repo } = JSON.parse(req.body as string) as {
    owner: string;
    repo: string;
  };

  if (!owner) {
    res.status(400).json({ error: 'No owner specified' });
    return;
  }

  if (!repo) {
    res.status(400).json({ error: 'No repo specified' });
    return;
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

    res.status(200).json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : (error as string);
    res.status(500).json({ error: message });
  }
};

export default handler;
