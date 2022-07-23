import { setPreviewData, redirectToPreviewURL } from '@prismicio/next';
import type { NextApiHandler } from 'next';
import { linkResolver, createClient } from '../../utils/prismic';

const handler: NextApiHandler = async (req, res) => {
  const client = createClient({ req });

  setPreviewData({ req, res });

  await redirectToPreviewURL({ req, res, client, linkResolver });
};

export default handler;
