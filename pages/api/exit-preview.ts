import { exitPreview } from '@prismicio/next';
import type { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) => {
  exitPreview({ res, req });
};

export default handler;
