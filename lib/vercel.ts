import { env } from './env';

export const updateEdgeConfig = async (
  key: string,
  value: number | object | string
): Promise<void> => {
  const endpoint = new URL(
    `/v1/edge-config/${env.EDGE_CONFIG_ID}/items`,
    'https://api.vercel.com'
  );

  const response = await fetch(endpoint, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${env.VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: [
        {
          operation: 'upsert',
          key,
          value,
        },
      ],
    }),
  });

  if (!response.ok) {
    const data = (await response.json()) as {
      error: { message: string };
    };
    throw new Error(data.error.message);
  }
};
