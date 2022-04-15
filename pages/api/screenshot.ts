import type { NextApiHandler } from 'next';
import { createBrowser } from '../../utils/browser';

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

  const browser = await createBrowser();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 750 });
  await page.goto(url, { waitUntil: 'load' });
  const image = (await page.screenshot({
    type: 'png',
    encoding: 'base64',
  })) as string;

  await browser.close();

  if (!image) {
    res.status(400).json({ error: 'No image found' });
    return;
  }

  res.status(200).json({ image });
};

export default handler;
