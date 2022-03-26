import type { NextApiHandler } from 'next';

export type NeutralResponse = {
  averageRating?: number;
  programCount?: number;
  treeCount?: number;
  offsetAmount?: string;
  latestVersion?: string;
  error?: string;
};

const options: RequestInit = {
  method: 'POST',
  body: JSON.stringify({
    passphrase: process.env.NEUTRAL_PASSPHRASE,
  }),
};

const fetchTreeCount = async (): Promise<number> => {
  const res = await fetch('https://tryneutral.com/api/getTreeCount', options);
  const data = (await res.json()) as { treeCount: number };

  return data.treeCount;
};

const fetchProgramCount = async (): Promise<number> => {
  const res = await fetch(
    'https://tryneutral.com/api/getProgramCount',
    options
  );
  const data = (await res.json()) as { programCount: number };

  return data.programCount;
};

const fetchAverageRating = async (): Promise<number> => {
  const res = await fetch(
    'https://tryneutral.com/api/getAverageRating',
    options
  );
  const data = (await res.json()) as { averageRating: number };

  return data.averageRating;
};

const fetchOffsetAmount = async (): Promise<string> => {
  const res = await fetch(
    'https://tryneutral.com/api/getOffsetAmount',
    options
  );
  const data = (await res.json()) as { offsetAmount: string };

  return data.offsetAmount;
};

const fetchLatestVersion = async (): Promise<string> => {
  const res = await fetch(
    'https://tryneutral.com/api/getLatestVersion',
    options
  );
  const data = (await res.json()) as { latestVersion: string };

  return data.latestVersion;
};

const handler: NextApiHandler<NeutralResponse> = async (req, res) => {
  try {
    const treeCount = await fetchTreeCount();
    const programCount = await fetchProgramCount();
    const averageRating = await fetchAverageRating();
    const offsetAmount = await fetchOffsetAmount();
    const latestVersion = await fetchLatestVersion();

    return res.status(200).json({
      averageRating,
      programCount,
      treeCount,
      offsetAmount,
      latestVersion,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : (error as string);

    return res.status(500).json({ error: message });
  }
};

export default handler;
