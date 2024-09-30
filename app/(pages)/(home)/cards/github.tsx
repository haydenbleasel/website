import type { GitHubProperties } from '@/app/api/cron/github/route';
import { Card } from '@/components/card';
import tailwind from '@/lib/tailwind';
import { get } from '@vercel/edge-config';
import type { ReactElement } from 'react';
import ActivityCalendar from 'rsc-activity-calendar';

export const GitHubCard = async (): Promise<ReactElement> => {
  const github = await get<GitHubProperties>('github');

  if (!github) {
    return <div />;
  }

  return (
    <Card title="GitHub Activity" className="p-4">
      <div className="flex flex-col gap-4">
        <p className="text-neutral-500 text-sm dark:text-neutral-400">
          {github.total} contributions in the last year
        </p>
        <div className="flex flex-col gap-[3px]">
          <ActivityCalendar
            hideColorLegend
            hideTotalCount
            hideMonthLabels
            data={github.data}
            theme={{
              light: [
                tailwind.theme.colors.neutral[200],
                tailwind.theme.colors.orange[200],
                tailwind.theme.colors.orange[400],
                tailwind.theme.colors.orange[600],
                tailwind.theme.colors.orange[800],
              ],
              dark: [
                tailwind.theme.colors.neutral[700],
                tailwind.theme.colors.orange[200],
                tailwind.theme.colors.orange[400],
                tailwind.theme.colors.orange[600],
                tailwind.theme.colors.orange[800],
              ],
            }}
          />
        </div>
      </div>
    </Card>
  );
};
