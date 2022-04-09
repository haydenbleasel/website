import type { NextApiHandler } from 'next';

export type FigmaResponse = {
  error?: string;
  data?: {
    title: string;
    lastUpdated: string;
    image: string;
  };
};

type FigmaDocument = {
  name: string;
  role: string;
  lastModified: string;
  editorType: string;
  thumbnailUrl: string;
  version: string;
  document: Node;
  components: Record<string, unknown>;
  componentSets: Record<string, unknown>;
  schemaVersion: number;
  styles: Record<string, unknown>;
  mainFileKey: string;
  branches: [
    {
      key: string;
      name: string;
      thumbnail_url: string;
      last_modified: string;
      link_access: string;
    }
  ];
};

const handler: NextApiHandler<FigmaResponse> = async (req, res) => {
  const { key } = JSON.parse(req.body as string) as { key: string };

  if (!key) {
    res.status(400).json({ error: 'No key specified' });
    return;
  }

  const response = await fetch(`https://api.figma.com/v1/files/${key}`, {
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'X-FIGMA-TOKEN': process.env.FIGMA_ACCESS_TOKEN ?? '',
    },
  });

  const doc = (await response.json()) as FigmaDocument;
  const data = {
    title: doc.name,
    lastUpdated: doc.lastModified,
    image: doc.thumbnailUrl,
  };

  res.status(200).json({ data });
};

export default handler;
