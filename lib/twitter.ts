import { Client } from 'twitter-api-sdk';

if (!process.env.TWITTER_TOKEN) {
  throw new Error('Missing Twitter token');
}

const client = new Client(process.env.TWITTER_TOKEN);

export const getTwitterLocation = async (): Promise<string> => {
  const profile = await client.users.findUserByUsername('haydenbleasel', {
    'user.fields': ['location'],
  });

  return profile.data?.location ?? 'Unknown';
};
