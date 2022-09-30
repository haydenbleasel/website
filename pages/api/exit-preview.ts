import { exitPreview } from '@prismicio/next';
import type { NextApiHandler } from 'next';

export const config = {
  runtime: 'nodejs',
};

const handler: NextApiHandler = (req, res) => {
  exitPreview({ res, req });
};

export default handler;
