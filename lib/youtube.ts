import { basehub } from 'basehub';
import { google } from 'googleapis';
import { env } from './env';

export const getTravelVideos = async () => {
  const youtube = google.youtube({
    version: 'v3',
    auth: env.YOUTUBE_API_KEY,
  });

  const { travel } = await basehub({ cache: 'no-store' }).query({
    travel: {
      videos: {
        playlistId: true,
      },
    },
  });

  try {
    const response = await youtube.playlistItems.list({
      part: ['snippet'],
      playlistId: travel.videos.playlistId,
      maxResults: 100,
    });

    if (!response.data.items) {
      return [];
    }

    return response.data.items.map((item) => ({
      id: item.snippet?.resourceId?.videoId,
      title: item.snippet?.title,
      description: item.snippet?.description,
      date: item.snippet?.publishedAt,
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
};
