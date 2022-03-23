import { differenceInMinutes, parseISO } from "date-fns";
import type { NextApiHandler } from "next";

type GitHubEvent = {
  created_at: string;
};

const handler: NextApiHandler = async (req, res) => {
  try {
    const response = await fetch(
      "https://api.github.com/users/haydenbleasel/events",
      {
        headers: {
          accept: "application/vnd.github.v3+json",
          Authorization: `token ${process.env.GITHUB_TOKEN ?? ""}`,
        },
      }
    );

    const data = (await response.json()) as GitHubEvent[];

    const recent = data.filter((event) => {
      const eventTime = parseISO(event.created_at);
      const difference = differenceInMinutes(new Date(), eventTime);

      return difference < 10;
    });

    const active = Boolean(recent.length);

    res.status(200).json({ status: active ? "online" : "offline", active });
  } catch (error) {
    const message = error instanceof Error ? error.message : (error as string);
    res.status(500).json({ error: message });
  }
};

export default handler;
