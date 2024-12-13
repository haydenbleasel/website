import { parseError } from '@/lib/utils';
import { updateEdgeConfig } from '@/lib/vercel';
import { youtube } from '@/lib/youtube';
import { basehub } from 'basehub';

export const maxDuration = 300;
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export type YoutubeProperties = {
  id: string;
  title: string;
  description: string;
  date: string;
}[];

export const GET = async (): Promise<Response> => {
  try {
    const { travel } = await basehub({ cache: 'no-store' }).query({
      travel: {
        videos: {
          playlistId: true,
        },
      },
    });

    const response = await youtube.playlistItems.list({
      part: ['snippet'],
      playlistId: travel.videos.playlistId,
      maxResults: 100,
    });

    if (!response.data.items) {
      throw new Error('No items found');
    }

    const props: YoutubeProperties = [];

    for (const item of response.data.items) {
      const snippet = item.snippet;

      if (
        !snippet ||
        !snippet.resourceId?.videoId ||
        !snippet.publishedAt ||
        !snippet.title ||
        !snippet.description
      ) {
        continue;
      }

      props.push({
        id: snippet.resourceId?.videoId,
        title: snippet.title,
        description: snippet.description,
        date: snippet.publishedAt,
      });
    }

    await updateEdgeConfig('youtube', props);

    return new Response(undefined, { status: 204 });
  } catch (error) {
    const message = parseError(error);

    return new Response(message, { status: 500 });
  }
};
