import { differenceInMinutes } from 'date-fns';
import type { NextRequest } from 'next/server';
import res from '../../utils/response';

type VercelEvent = {
  createdAt: number;
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
