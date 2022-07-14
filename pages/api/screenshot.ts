import type { NextRequest } from 'next/server';
import res from '../../utils/response';

export type ScreenshotResponse = {
  error?: string;
  image?: string;
};

export const config = {
  runtime: 'experimental-edge',
};

const handler = async (req: NextRequest): Promise<Response> => {
  const { url } = (await req.json()) as { url: string };

  if (!url) {
    return res(400, { error: 'No URL provided' });
  }

  try {
    const response = await fetch(
      'https://glimpse.haydenbleasel.com/api/screenshot',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          width: 1200,
          height: 750,
        }),
      }
    );

    const { image, error } = (await response.json()) as ScreenshotResponse;

    if (error) {
      return res(400, { error });
    }

    if (!image) {
      return res(400, { error: 'No image found' });
    }

    return res(200, { image });
  } catch (error) {
    const message = error instanceof Error ? error.message : (error as string);

    return res(500, { error: message });
  }
};

export default handler;
