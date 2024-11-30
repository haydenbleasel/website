import type { GitHubProperties } from '@/app/api/cron/github/route';
import tailwind from '@/lib/tailwind';
import { get } from '@vercel/edge-config';
import type { ReactElement } from 'react';
import ActivityCalendar from 'rsc-activity-calendar';

export const GitHubActivity = async (): Promise<ReactElement> => {
  const github = await get<GitHubProperties>('github');

  if (!github) {
    return <div />;
  }

  return (
    <section className="relative">
      <ActivityCalendar
        hideColorLegend
        hideTotalCount
        hideMonthLabels
        data={github.data}
        theme={{
          light: [
            tailwind.theme.colors.neutral[200],
            tailwind.theme.colors.green[200],
            tailwind.theme.colors.green[400],
            tailwind.theme.colors.green[600],
            tailwind.theme.colors.green[800],
          ],
          dark: [
            tailwind.theme.colors.neutral[700],
            tailwind.theme.colors.green[200],
            tailwind.theme.colors.green[400],
            tailwind.theme.colors.green[600],
            tailwind.theme.colors.green[800],
          ],
        }}
      />
      <p className="absolute bottom-4 left-4 text-neutral-500 text-sm dark:text-neutral-400">
        {github.total} contributions in the last year
      </p>
    </section>
  );
};
