import { differenceInMinutes, parseISO } from 'date-fns';
import type { NextRequest } from 'next/server';
import parseError from '../../utils/parseError';
import res from '../../utils/response';

type GitHubEvent = {
  created_at: string;
};

export const config = {
  runtime: 'experimental-edge',
};

const handler = async (req: NextRequest): Promise<Response> => {
  if (
    req.headers.get('authorization') !==
    `Bearer ${process.env.NEXT_PUBLIC_API_PASSPHRASE ?? ''}`
  ) {
    return res(401, { error: 'Unauthorized' });
  }

  if (req.method !== 'GET') {
    return res(405, { error: 'Method not allowed' });
  }

  try {
    const response = await fetch(
      'https://api.github.com/users/haydenbleasel/events',
      {
        headers: {
          accept: 'application/vnd.github.v3+json',
          Authorization: `token ${process.env.GITHUB_TOKEN ?? ''}`,
        },
      }
    );

    const data = (await response.json()) as GitHubEvent[];

    const recent = data.filter((event) => {
      const eventTime = parseISO(event.created_at);
      const difference = differenceInMinutes(new Date(), eventTime);

      return difference < 10;
    });

    const active = Boolean(recent.length);

    return res(200, {
      status: active ? 'online' : 'offline',
      active,
    });
  } catch (error) {
    const message = parseError(error);

    return res(500, { error: message });
  }
};

export default handler;
