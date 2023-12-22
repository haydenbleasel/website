import { Octokit } from '@octokit/rest';

if (!process.env.GITHUB_TOKEN) {
  throw new Error('GITHUB_TOKEN is not set');
}

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});
