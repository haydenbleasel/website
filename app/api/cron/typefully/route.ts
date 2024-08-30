import { parseError } from '@/lib/utils';
import { updateEdgeConfig } from '@/lib/vercel';
import ky from 'ky';

const apiKey = process.env.TYPEFULLY_API_KEY;

if (!apiKey) {
  throw new Error('TYPEFULLY_API_KEY is not set');
}

type TypefullyResponse = {
  id: number;
  status: string;
  text: string;
  html: string;
  num_tweets: number;
  tweets: {
    text: string;
    images: string[];
    length: number;
  }[];
  last_edited: string;
  scheduled_date?: string;
  published_on: string;
  share_url: unknown;
  twitter_url: string;
  linkedin_url: string;
  text_first_tweet: string;
  html_first_tweet: string;
  text_preview_linkedin: string;
}[];

export type TypefullyProperties = {
  id: number;
  html: string;
  length: number;
  hasImages: boolean;
};

export const maxDuration = 300;
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export const GET = async (): Promise<Response> => {
  try {
    const response = await ky
      .get<TypefullyResponse>(
        'https://api.typefully.com/v1/drafts/recently-published',
        {
          headers: {
            'X-API-KEY': `Bearer ${apiKey}`,
          },
        }
      )
      .json();

    const tweets: TypefullyProperties[] = response.slice(0, 5).map((tweet) => ({
      id: tweet.id,
      html: tweet.html,
      length: tweet.num_tweets,
      hasImages: tweet.tweets.some((t) => t.images.length > 0),
    }));

    await updateEdgeConfig('typefully', tweets);

    return new Response(undefined, { status: 204 });
  } catch (error) {
    return new Response(parseError(error), { status: 500 });
  }
};
