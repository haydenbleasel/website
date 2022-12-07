type TwitterProfileResponse = {
  data: {
    name: string;
    username: string;
    id: string;
    location: string;
  };
};

const getLocation = async (): Promise<string | null> => {
  const url = new URL('https://api.twitter.com/2/users/1628137603');

  url.searchParams.set('user.fields', 'location');

  try {
    const response = await fetch(url.href, {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN ?? ''}`,
      },
    });

    const { data } = (await response.json()) as TwitterProfileResponse;

    return data.location;
  } catch (error) {
    return null;
  }
};

export default getLocation;
