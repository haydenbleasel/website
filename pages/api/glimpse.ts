import type { NextRequest } from 'next/server';
import glimpse from '@beskar-labs/glimpse/server';

const res = (status: ResponseInit['status'], data: object): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json',
    },
  });

export const config = {
  runtime: 'edge',
};

const handler = async (req: NextRequest): Promise<Response> => {
  const { url } = (await req.json()) as { url?: string };

  if (!url) {
    return res(400, { error: 'No URL provided' });
  }

  try {
    const data = await glimpse(url);

    return res(200, data);
  } catch (error) {
    return res(500, {});
  }
};

export default handler;
