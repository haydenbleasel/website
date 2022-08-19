import type { NextRequest } from 'next/server';
import res from '../../utils/response';

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

export const config = {
  runtime: 'experimental-edge',
};

const handler = async (req: NextRequest): Promise<Response> => {
  const { key } = (await req.json()) as { key: string };

  if (
    req.headers.get('authorization') !==
    `Bearer ${process.env.NEXT_PUBLIC_API_PASSPHRASE ?? ''}`
  ) {
    return res(401, { error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res(405, { error: 'Method not allowed' });
  }

  if (!key) {
    return res(400, { error: 'No key provided' });
  }

  try {
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

    return res(200, { data });
  } catch (error) {
    const message = error instanceof Error ? error.message : (error as string);

    return res(500, { error: message });
  }
};

export default handler;
