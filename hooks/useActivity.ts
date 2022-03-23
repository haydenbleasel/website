import { useEffect, useState } from "react";
import useSWR from "swr";

type ActivityResponse = {
  emoji: string;
  status: string;
};

type SteamResponse = {
  game: string | undefined;
};

type SpotifyResponse = {
  track: string | undefined;
  artist: string | undefined;
};

const fetcher = async <ResponseType>(url: string): Promise<ResponseType> => {
  const response = await fetch(url);
  const data = (await response.json()) as ResponseType;

  return data;
};

const useActivity = (): ActivityResponse => {
  const steam = useSWR<SteamResponse>("/api/steam", fetcher);
  const spotify = useSWR<SpotifyResponse>("/api/spotify", fetcher);
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

    if (!spotify.error && spotify.data?.track && spotify.data.artist) {
      newStatus.emoji = "🎧";
      newStatus.status = `Listening to ${spotify.data.track} by ${spotify.data.artist}`;
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
    spotify.error,
    spotify.data?.artist,
    spotify.data?.track,
    steam.data?.game,
    steam.error,
  ]);

  return status;
};

export default useActivity;
