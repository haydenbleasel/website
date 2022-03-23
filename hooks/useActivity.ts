import { useEffect, useState } from "react";
import useSWR from "swr";

type ActivityResponse = {
  emoji: string;
  status: string;
};

type SteamResponse = {
  game: string | undefined;
};

const fetcher = async <ResponseType>(url: string): Promise<ResponseType> => {
  const response = await fetch(url);
  const data = (await response.json()) as ResponseType;

  return data;
};

const useActivity = (): ActivityResponse => {
  const steam = useSWR<SteamResponse>("/api/steam", fetcher);
  const [status, setStatus] = useState<ActivityResponse>({
    emoji: "🤔",
    status: "Not sure",
  });

  useEffect(() => {
    const newStatus: ActivityResponse = {
      emoji: "",
      status: "",
    };

    if (!steam.error && steam.data?.game) {
      newStatus.emoji = "🎮";
      newStatus.status = `Playing ${steam.data.game}`;
    }

    const date = new Date().toLocaleTimeString("en-US", {
      timeZone: "Australia/Sydney",
      hour12: false,
    });
    const time = Number(date.split(":")[0]);

    if (!newStatus.status) {
      if (time === 11) {
        newStatus.emoji = "💪";
        newStatus.status = "Training";
      } else if (time >= 1 && time <= 8) {
        newStatus.emoji = "😴";
        newStatus.status = "Sleeping";
      } else {
        newStatus.emoji = "👨‍💻";
        newStatus.status = "Working";
      }
    }

    setStatus(newStatus);
  }, [steam.data?.game, steam.error]);

  return status;
};

export default useActivity;
