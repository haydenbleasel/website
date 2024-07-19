import { parseError } from '@/lib/utils';
import { updateEdgeConfig } from '@/lib/vercel';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit();

export const GET = async (): Promise<Response> => {
  try {
    const profile = await octokit.rest.users.getByUsername({
      username: 'haydenbleasel',
    });

    await updateEdgeConfig('github', {
      followers: profile.data.followers,
    });

    return new Response(undefined, { status: 204 });
  } catch (error) {
    const message = parseError(error);

    return new Response(message, { status: 500 });
  }
};
