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

type TwitterResponse = {
  active: boolean;
};

const fetcher = async <ResponseType>(url: string): Promise<ResponseType> => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_PASSPHRASE ?? ''}`,
    },
  });
  const data = (await response.json()) as ResponseType;

  return data;
};

const useActivity = (): ActivityResponse => {
  const steam = useSWR<SteamResponse>('/api/steam', fetcher);
  const github = useSWR<GitHubResponse>('/api/github-events', fetcher);
  const vercel = useSWR<VercelResponse>('/api/vercel', fetcher);
  const twitter = useSWR<TwitterResponse>('/api/twitter', fetcher);
  const [status, setStatus] = useState<ActivityResponse>({
    emoji: '🤔',
    status: 'Not sure',
  });

  useEffect(() => {
    const date = new Date().toLocaleTimeString('en-US', {
      timeZone: 'America/New_York',
      hour12: false,
    });

    const day = new Date().getDay();
    const isWeekend = day === 0 || day === 6;
    const time = Number(date.split(':')[0]);

    if (!isWeekend && time >= 9 && time <= 17) {
      setStatus({
        emoji: '👨‍💻',
        status: 'Working',
      });
      return;
    }

    if (!steam.error && steam.data?.game) {
      setStatus({
        emoji: '🎮',
        status: `Playing ${steam.data.game}`,
        source: 'Steam',
      });
      return;
    }

    if (!twitter.error && twitter.data?.active) {
      setStatus({
        emoji: '🐦',
        status: 'Tweeting',
        source: 'Twitter',
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

    if (time === 8 && !isWeekend) {
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
      emoji: '😎',
      status: 'Chilling',
    });
  }, [
    github.data?.active,
    github.error,
    steam.data?.game,
    steam.error,
    twitter.data?.active,
    twitter.error,
    vercel.data?.active,
    vercel.error,
  ]);

  return status;
};

export default useActivity;
