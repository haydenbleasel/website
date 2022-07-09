import type { NextApiHandler } from 'next';

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

  try {
    const response = await fetch(
      `https://slam-dunk.haydenbleasel.com/api/${shot}`
    );

    const { data, error } = (await response.json()) as DribbbleResponse;

    if (error) {
      res.status(400).json({ error });
      return;
    }

    if (!data) {
      res.status(400).json({ error: 'No data found' });
      return;
    }

    res.status(200).json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : (error as string);

    res.status(400).json({ error: message });
  }
};

export default handler;
