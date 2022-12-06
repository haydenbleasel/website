import type { UserV2Result } from 'twitter-api-v2';
import { TwitterApi } from 'twitter-api-v2';

const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN ?? '');
const readOnlyClient = twitterClient.readOnly;

const getLocation = async (): Promise<UserV2Result['data']['location']> => {
  const { data } = await readOnlyClient.v2.user('1628137603', {
    'user.fields': 'location',
  });

  return data.location;
};

export default getLocation;
