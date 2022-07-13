import { differenceInMinutes } from 'date-fns';
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

const handler = async (): Promise<Response> => {
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
    const message = error instanceof Error ? error.message : (error as string);

    return res(500, { error: message });
  }
};

export default handler;
