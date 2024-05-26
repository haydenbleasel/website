const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

if (!productionUrl) {
  throw new Error('Missing VERCEL_PROJECT_PRODUCTION_URL');
}

export const siteUrl = `https://${productionUrl}`;
