import { JSDOM } from 'jsdom';
import type { NextApiHandler } from 'next';

export type PreviewResponse = {
  error?: string;
  data?: {
    title: string | null;
    description: string | null | undefined;
    image: string | null | undefined;
  };
};

const handler: NextApiHandler<PreviewResponse> = async (req, res) => {
  const { url } = JSON.parse(req.body as string) as { url: string };

  if (!url) {
    res.status(400).json({ error: 'No URL provided' });
    return;
  }

  try {
    const response = await fetch(url);
    const data = await response.text();
    const dom = new JSDOM(data);

    const title = dom.window.document.querySelector('title');
    const description = dom.window.document.querySelector(
      'meta[name="description"]'
    );
    const image = dom.window.document.querySelector(
      'meta[property="og:image"]'
    );

    res.status(200).json({
      data: {
        title: title ? title.textContent : null,
        description: description ? description.getAttribute('content') : null,
        image: image ? image.getAttribute('content') : null,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : (error as string);

    res.status(500).json({ error: message });
  }
};

export default handler;
