import type { NextRequest } from 'next/server';
import { parse } from 'node-html-parser';
import res from '../../utils/response';

export type PreviewResponse = {
  error?: string;
  data?: {
    title: string | undefined;
    description: string | undefined;
    image: string | undefined;
  };
};

export const config = {
  runtime: 'experimental-edge',
};

const handler = async (req: NextRequest): Promise<Response> => {
  const { url } = (await req.json()) as { url?: string };

  if (!url) {
    return res(400, { error: 'No URL provided' });
  }

  try {
    const response = await fetch(url);
    const data = await response.text();
    const dom = parse(data);

    const title = dom.querySelector('title')?.text;
    const description = dom.querySelector('meta[name="description"]')
      ?.attributes.content;
    const image = dom.querySelector('meta[property="og:image"]')?.attributes
      .content;

    return res(200, {
      data: {
        title,
        description,
        image,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : (error as string);

    return res(500, { error: message });
  }
};

export default handler;
