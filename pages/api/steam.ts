import type { NextApiHandler } from "next";

type SteamResponse = {
  response: {
    players: {
      personastate: number;
      gameextrainfo?: string;
    }[];
  };
};

const handler: NextApiHandler = async (req, res) => {
  try {
    const response = await fetch(
      `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${
        process.env.STEAM_API_KEY ?? ""
      }&steamids=${process.env.STEAM_ID ?? ""}`
    );

    const data = (await response.json()) as SteamResponse;
    const { personastate, gameextrainfo } = data.response.players[0];

    // 0 means offline, everything else is a variation of online.
    if (personastate && gameextrainfo) {
      res.status(200).json({
        status: "online",
        game: gameextrainfo,
      });
      return;
    }

    res.status(200).json({ status: "offline", game: undefined });
  } catch (error) {
    const message = error instanceof Error ? error.message : (error as string);
    res.status(500).json({ error: message });
  }
};

export default handler;
