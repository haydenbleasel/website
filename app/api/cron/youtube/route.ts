import { basehub } from '@/lib/basehub';
import { parseError } from '@/lib/utils';
import { updateEdgeConfig } from '@/lib/vercel';
import { youtube } from '@/lib/youtube';

export const maxDuration = 300;
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export type YoutubeProperties = {
  id: string;
  title: string;
  description: string;
  date: string;
}[];

const getPlaylistId = async () => {
  const { travel } = await basehub.query({
    travel: {
      videos: {
        playlistId: true,
      },
    },
  });

  return travel.videos.playlistId;
};

const getPlaylistItems = async (playlistId: string) => {
  const response = await youtube.playlistItems.list({
    part: ['snippet'],
    playlistId,
  });

  if (!response.data.items) {
    throw new Error('No items found');
  }

  return response.data.items;
};

export const GET = async (): Promise<Response> => {
  try {
    const playlistId = await getPlaylistId();
    const videos = await getPlaylistItems(playlistId);
    const props: YoutubeProperties = [];

    for (const video of videos) {
      const snippet = video.snippet;

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
