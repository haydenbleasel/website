import type { NextRequest } from 'next/server';
import res from '../../utils/response';

export type DribbbleResponse = {
  error?: string;
  data?: {
    title: string;
    image: string;
    comments: number;
    likes: number;
    views: number;
  };
};

export const config = {
  runtime: 'experimental-edge',
};

const handler = async (req: NextRequest): Promise<Response> => {
  const { shot } = (await req.json()) as { shot: number };

  if (!shot) {
    return res(400, { error: 'No shot provided' });
  }

  try {
    const response = await fetch(
      `https://slam-dunk.haydenbleasel.com/api/${shot}`
    );

    const { data, error } = (await response.json()) as DribbbleResponse;

    if (error) {
      return res(400, { error });
    }

    if (!data) {
      return res(400, { error: 'No data found' });
    }

    return res(200, { data });
  } catch (error) {
    const message = error instanceof Error ? error.message : (error as string);

    return res(500, { error: message });
  }
};

export default handler;
