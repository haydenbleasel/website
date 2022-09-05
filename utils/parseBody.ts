import type { NextApiRequest } from 'next';

const parseBody = <T>(req: NextApiRequest): T => {
  if (typeof req.body === 'string') {
    return JSON.parse(req.body) as T;
  }

  return req.body as T;
};

export default parseBody;
