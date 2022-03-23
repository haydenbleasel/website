import { useEffect, useState } from "react";
import useSWR from "swr";

type ActivityResponse = {
  emoji: string;
  status: string;
  source?: string;
};

type SteamResponse = {
  game: string | undefined;
};

type GitHubResponse = {
  active: boolean;
};

type VercelResponse = {
  active: boolean;
};

const fetcher = async <ResponseType>(url: string): Promise<ResponseType> => {
  const response = await fetch(url);
  const data = (await response.json()) as ResponseType;

  return data;
};

const useActivity = (): ActivityResponse => {
  const steam = useSWR<SteamResponse>("/api/steam", fetcher);
  const github = useSWR<GitHubResponse>("/api/github", fetcher);
  const vercel = useSWR<VercelResponse>("/api/vercel", fetcher);
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
      newStatus.source = "Steam";
    }

    if (!github.error && github.data?.active) {
      newStatus.emoji = "👨‍💻";
      newStatus.status = "Coding";
      newStatus.source = "GitHub";
    }

    if (!vercel.error && vercel.data?.active) {
      newStatus.emoji = "🏗";
      newStatus.status = "Deploying code";
      newStatus.source = "Vercel";
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
  }, [
    github.data?.active,
    github.error,
    steam.data?.game,
    steam.error,
    vercel.data?.active,
    vercel.error,
  ]);

  return status;
};

export default useActivity;
