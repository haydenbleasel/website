import { differenceInMinutes } from "date-fns";
import type { NextApiHandler } from "next";

type VercelEvent = {
  createdAt: number;
};

const handler: NextApiHandler = async (req, res) => {
  try {
    const response = await fetch("https://api.vercel.com/v3/events", {
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_TOKEN ?? ""}`,
      },
    });

    const data = (await response.json()) as { events: VercelEvent[] };

    const recent = data.events.filter((event) => {
      const eventTime = new Date(event.createdAt);
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
