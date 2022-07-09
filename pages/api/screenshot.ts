import type { NextApiHandler } from 'next';

export type ScreenshotResponse = {
  error?: string;
  image?: string;
};

const handler: NextApiHandler<ScreenshotResponse> = async (req, res) => {
  const { url } = JSON.parse(req.body as string) as { url: string };

  if (!url) {
    res.status(400).json({ error: 'No URL specified' });
    return;
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
          waitUntil: 'networkidle2',
        }),
      }
    );

    const { image, error } = (await response.json()) as ScreenshotResponse;

    if (error) {
      res.status(400).json({ error });
      return;
    }

    if (!image) {
      res.status(400).json({ error: 'No image found' });
      return;
    }

    res.status(200).json({ image });
  } catch (error) {
    const message = error instanceof Error ? error.message : (error as string);

    res.status(400).json({ error: message });
  }
};

export default handler;
