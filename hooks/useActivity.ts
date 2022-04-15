import { useEffect, useState } from 'react';
import useSWR from 'swr';

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
  const steam = useSWR<SteamResponse>('/api/steam', fetcher);
  const github = useSWR<GitHubResponse>('/api/github-events', fetcher);
  const vercel = useSWR<VercelResponse>('/api/vercel', fetcher);
  const [status, setStatus] = useState<ActivityResponse>({
    emoji: '🤔',
    status: 'Not sure',
  });

  useEffect(() => {
    if (!steam.error && steam.data?.game) {
      setStatus({
        emoji: '🎮',
        status: `Playing ${steam.data.game}`,
        source: 'Steam',
      });
      return;
    }

    if (!github.error && github.data?.active) {
      setStatus({
        emoji: '👨‍💻',
        status: 'Coding',
        source: 'GitHub',
      });
      return;
    }

    if (!vercel.error && vercel.data?.active) {
      setStatus({
        emoji: '🏗',
        status: 'Deploying code',
        source: 'Vercel',
      });
      return;
    }

    const date = new Date().toLocaleTimeString('en-US', {
      timeZone: 'Australia/Sydney',
      hour12: false,
    });

    const time = Number(date.split(':')[0]);

    if (time === 11) {
      setStatus({
        emoji: '💪',
        status: 'Training',
      });
      return;
    }

    if (time >= 1 && time <= 8) {
      setStatus({
        emoji: '😴',
        status: 'Sleeping',
      });
      return;
    }

    setStatus({
      emoji: '👨‍💻',
      status: 'Working',
    });
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
