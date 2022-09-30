import type { NextRequest } from 'next/server';
import glimpse from '@haydenbleasel/glimpse/server';
import res from '../../utils/response';
import parseError from '../../utils/parseError';

export const config = {
  runtime: 'experimental-edge',
};

const handler = async (req: NextRequest): Promise<Response> => {
  const { url } = (await req.json()) as { url?: string };

  if (!url) {
    return res(400, { error: 'No URL provided' });
  }

  try {
    const data = await glimpse(url);

    return res(200, { data });
  } catch (error) {
    const message = parseError(error);

    return res(500, { error: message });
  }
};

export default handler;
