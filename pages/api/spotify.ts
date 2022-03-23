import type { NextApiHandler } from "next";

type SpotifyResponse = {
  item?: {
    name: string;
    artists: {
      name: string;
    }[];
  };
  error?: {
    message: string;
  };
};

const handler: NextApiHandler = async (req, res) => {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing?market=au",
      {
        headers: {
          Authorization: `Bearer ${process.env.SPOTIFY_OAUTH_TOKEN ?? ""}`,
        },
      }
    );

    const data = (await response.json()) as SpotifyResponse;

    if (data.error) {
      res.status(500).json({ error: data.error.message });
      return;
    }

    if (data.item) {
      res
        .status(200)
        .json({ track: data.item.name, artist: data.item.artists[0].name });
      return;
    }

    res.status(200).json({ track: undefined, artist: undefined });
  } catch (error) {
    const message = error instanceof Error ? error.message : (error as string);
    res.status(500).json({ error: message });
  }
};

export default handler;
