'use client';

import tailwind from '@/lib/tailwind';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import type { Activity } from 'react-activity-calendar';

type GitHubActivityClientProps = {
  data: Activity[];
};

const ActivityCalendar = dynamic(() => import('react-activity-calendar'), {
  ssr: false,
});

export const GitHubActivityClient = ({ data }: GitHubActivityClientProps) => {
  const { theme } = useTheme();

  return (
    <ActivityCalendar
      hideColorLegend
      hideTotalCount
      hideMonthLabels
      data={data}
      weekStart={1}
      colorScheme={theme as 'light' | 'dark' | undefined}
      theme={{
        light: [
          tailwind.theme.colors.neutral[200],
          tailwind.theme.colors.green[200],
          tailwind.theme.colors.green[400],
          tailwind.theme.colors.green[600],
          tailwind.theme.colors.green[800],
        ],
        dark: [
          tailwind.theme.colors.neutral[800],
          tailwind.theme.colors.green[200],
          tailwind.theme.colors.green[400],
          tailwind.theme.colors.green[600],
          tailwind.theme.colors.green[800],
        ],
      }}
      style={{
        width: 'auto',
      }}
    />
  );
};
