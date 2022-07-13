import { differenceInMinutes, parseISO } from 'date-fns';
import res from '../../utils/response';

type GitHubEvent = {
  created_at: string;
};

export const config = {
  runtime: 'experimental-edge',
};

const handler = async (): Promise<Response> => {
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
    const message = error instanceof Error ? error.message : (error as string);

    return res(500, { error: message });
  }
};

export default handler;
