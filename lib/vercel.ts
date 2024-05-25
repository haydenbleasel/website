const steamId = process.env.STEAM_ID;
const steamApiKey = process.env.STEAM_API_KEY;
const vercelToken = process.env.VERCEL_TOKEN;
const edgeConfigId = process.env.EDGE_CONFIG_ID;

if (!steamId || !steamApiKey || !vercelToken || !edgeConfigId) {
  throw new Error(
    'Missing Steam ID, Steam API Key, Vercel Token, or Edge Config ID'
  );
}

export const updateEdgeConfig = async (
  key: string,
  value: string | number | object
) => {
  const endpoint = new URL(
    `/v1/edge-config/${edgeConfigId}/items`,
    'https://api.vercel.com'
  );

  const updateEdgeConfig = await fetch(endpoint, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${vercelToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: [
        {
          operation: 'upsert',
          key: key,
          value: value,
        },
      ],
    }),
  });

  if (!updateEdgeConfig.ok) {
    const data = (await updateEdgeConfig.json()) as {
      error: { message: string };
    };
    throw new Error(data.error.message);
  }
};
