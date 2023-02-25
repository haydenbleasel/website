import { res } from '@/lib/response';
import glimpse from '@beskar-labs/glimpse/server';

export const POST = async (req: Request): Promise<Response> => {
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
