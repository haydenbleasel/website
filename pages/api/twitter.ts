import { differenceInMinutes } from 'date-fns';
import type { NextRequest } from 'next/server';
import parseError from '../../utils/parseError';
import res from '../../utils/response';

type TwitterResponse = {
  data: {
    id: string;
    text: string;
    created_at: string;
  }[];
  meta: {
    next_token: string;
    result_count: number;
    newest_id: string;
    oldest_id: string;
  };
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
      `https://api.twitter.com/2/users/1628137603/tweets?tweet.fields=created_at&max_results=5`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN ?? ''}`,
        },
      }
    );

    const data = (await response.json()) as TwitterResponse;

    const recent = data.data.filter((tweet) => {
      const eventTime = new Date(tweet.created_at);
      const difference = differenceInMinutes(new Date(), eventTime);

      return difference < 10;
    });

    const active = Boolean(recent.length);

    return res(200, { status: active ? 'online' : 'offline', active });
  } catch (error) {
    const message = parseError(error);

    return res(500, { error: message });
  }
};

export default handler;
