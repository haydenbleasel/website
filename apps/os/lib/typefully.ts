const baseUrl = "https://api.typefully.com/v2";

const headers = {
  Authorization: `Bearer ${process.env.TYPEFULLY_API_KEY ?? ""}`,
};

interface TypefullySocialSet {
  id: number;
  name: string;
}

interface TypefullyDraft {
  id: string;
  text: string;
  text_first_tweet: string;
  num_tweets: number;
  scheduled_date: string | null;
  published_on: string | null;
  publish_url: string | null;
  score: number | null;
  num_likes: number;
  num_retweets: number;
  num_replies: number;
  num_impressions: number;
  num_bookmarks: number;
  num_quotes: number;
}

export type { TypefullyDraft };

const getSocialSets = async (): Promise<TypefullySocialSet[]> => {
  const response = await fetch(`${baseUrl}/social-sets`, { headers });

  if (!response.ok) {
    throw new Error(`Typefully API error: ${response.status}`);
  }

  const data = (await response.json()) as { results: TypefullySocialSet[] };
  return data.results;
};

export const getPublishedPosts = async (): Promise<TypefullyDraft[]> => {
  const socialSets = await getSocialSets();
  const [socialSet] = socialSets;

  if (!socialSet) {
    return [];
  }

  const response = await fetch(
    `${baseUrl}/social-sets/${socialSet.id}/drafts?status=published&order_by=-published_at&limit=25`,
    { headers },
  );

  if (!response.ok) {
    throw new Error(`Typefully API error: ${response.status}`);
  }

  const data = (await response.json()) as { results: TypefullyDraft[] };
  return data.results;
};
