import { google } from 'googleapis';
import { env } from './env';

export const youtube = google.youtube({
  version: 'v3',
  auth: env.YOUTUBE_API_KEY,
});
