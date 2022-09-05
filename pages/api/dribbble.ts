import type { NextRequest } from 'next/server';
import { parse } from 'node-html-parser';
import parseError from '../../utils/parseError';
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

const likesRegex = /"likesCount":(?<value>\d+)/u;
const commentsRegex = /"commentsCount":(?<value>\d+)/u;
const viewsRegex = /"viewsCount":(?<value>\d+)/u;
const titleRegex = /"title":"(?<value>.+?)"/u;
const videoRegex = /"shotVideoUrl":"(?<value>.+?)"/u;
const imageRegex = /"shotGifUrl":"(?<value>.+?)"/u;

const handler = async (req: NextRequest): Promise<Response> => {
  const { shot } = (await req.json()) as { shot: number };

  if (
    req.headers.get('authorization') !==
    `Bearer ${process.env.NEXT_PUBLIC_API_PASSPHRASE ?? ''}`
  ) {
    return res(401, { error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res(405, { error: 'Method not allowed' });
  }

  if (!shot) {
    return res(400, { error: 'No shot provided' });
  }

  try {
    const response = await fetch(`https://dribbble.com/shots/${shot}`);
    const data = await response.text();

    const dom = parse(data);

    const scripts = dom.querySelectorAll('script');

    const shotData = scripts.find((script) =>
      script.text.includes('shotData:')
    )?.text;

    if (!shotData) {
      return res(500, { error: 'No shot data found' });
    }

    return res(200, {
      data: {
        likes: likesRegex.exec(shotData)?.groups?.value,
        comments: commentsRegex.exec(shotData)?.groups?.value,
        views: viewsRegex.exec(shotData)?.groups?.value,
        title: titleRegex.exec(shotData)?.groups?.value,
        video: videoRegex.exec(shotData)?.groups?.value,
        image: imageRegex.exec(shotData)?.groups?.value,
      },
    });
  } catch (error) {
    const message = parseError(error);

    return res(500, { error: message });
  }
};

export default handler;
