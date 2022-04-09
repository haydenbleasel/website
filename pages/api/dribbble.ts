import type { NextApiHandler } from 'next';
import puppeteer from 'puppeteer-core';
import chrome from 'chrome-aws-lambda';

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

const handler: NextApiHandler<DribbbleResponse> = async (req, res) => {
  const { shot } = JSON.parse(req.body as string) as { shot: number };

  if (!shot) {
    res.status(400).json({ error: 'No shot specified' });
    return;
  }
  const browser = await puppeteer.launch(
    process.env.AWS_EXECUTION_ENV
      ? {
          args: chrome.args,
          executablePath: await chrome.executablePath,
          headless: chrome.headless,
        }
      : {
          args: [],
          executablePath:
            '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        }
  );

  const page = await browser.newPage();
  await page.goto(`https://dribbble.com/shots/${shot}`);

  const config = (await page.evaluate('Dribbble.JsConfig')) as {
    shotData: Record<string, unknown>;
  };

  await browser.close();

  const { title, shotMediaPreview, commentsCount, likesCount, viewsCount } =
    config.shotData as {
      title: string;
      commentsCount: number;
      likesCount: number;
      viewsCount: number;
      shotMediaPreview: {
        mediaType: string | null;
        shotGifUrl: string;
        shotImageUrl: string;
        shotVideoUrl: string | null;
      };
    };

  const data = {
    title,
    image: shotMediaPreview.shotVideoUrl ?? shotMediaPreview.shotGifUrl,
    comments: commentsCount,
    likes: likesCount,
    views: viewsCount,
  };

  res.status(200).json({ data });
};

export default handler;
