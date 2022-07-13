import { differenceInMinutes } from 'date-fns';
import res from '../../utils/response';

type VercelEvent = {
  createdAt: number;
};

export const config = {
  runtime: 'experimental-edge',
};

const handler = async (): Promise<Response> => {
  try {
    const response = await fetch('https://api.vercel.com/v3/events', {
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_TOKEN ?? ''}`,
      },
    });

    const data = (await response.json()) as { events: VercelEvent[] };

    const recent = data.events.filter((event) => {
      const eventTime = new Date(event.createdAt);
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
