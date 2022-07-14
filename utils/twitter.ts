type TwitterProfileResponse = {
  data: {
    name: string;
    username: string;
    id: string;
    location: string;
  };
};

export const getLocation = async (): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://api.twitter.com/2/users/1628137603?user.fields=location`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN ?? ''}`,
        },
      }
    );

    const { data } = (await response.json()) as TwitterProfileResponse;

    return data.location;
  } catch (error) {
    return null;
  }
};
