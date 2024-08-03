import { Card } from '@/components/card';
import tailwind from '@/lib/tailwind';
import { unstable_cache } from 'next/cache';
import type { ReactElement } from 'react';
import ActivityCalendar from 'rsc-activity-calendar';
import type { Activity } from 'rsc-activity-calendar';

const getCachedContributions = unstable_cache(
  async () => {
    const response = await fetch('https://github-contributions-api.jogruber.de/v4/haydenbleasel');
    const data = (await response.json()) as {
      total: Record<number, string>,
      contributions: Activity[];
    };
    const total = data.total[new Date().getFullYear()];

    return { contributions: data.contributions, total };
  },
  ['github-contributions'],
  { revalidate: 60 * 60 * 24 },
);

const getContributions = (
  contributions: Activity[],
  offset = 0
): Activity[] => {
  const today = new Date();

  // 7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  const weeksToGoBack = 26;
  const currentWeekDay = today.getDay();

  // Calculate the end of the last week (Saturday)
  const endOfLastWeek = new Date(
    today.getTime() - (currentWeekDay + 1) * 24 * 60 * 60 * 1000
  );

  // Calculate the start of the 26-weeks-ago week (Sunday), considering the offset
  const startOf26WeeksAgo = new Date(
    endOfLastWeek.getTime() - (weeksToGoBack + offset) * oneWeekInMilliseconds
  );

  // Calculate the end of the 26-weeks-ago week (Saturday), considering the offset
  const endOf26WeeksAgo = new Date(
    endOfLastWeek.getTime() - offset * oneWeekInMilliseconds
  );

  return contributions.filter((activity) => {
    const activityDate = new Date(activity.date);

    return activityDate <= endOf26WeeksAgo && activityDate >= startOf26WeeksAgo;
  });
};

const GitHubCard = async (): Promise<ReactElement> => {
  const { contributions } = await getCachedContributions();
  const data = getContributions(contributions, 0);
  const total = data.reduce((newTotal, { count }) => newTotal + count, 0);

  return (
    <Card title="GitHub Activity" className="p-4">
      <div className="flex flex-col gap-4">
        <p className="text-neutral-500 text-sm dark:text-neutral-400">
          {total} contributions in the last year
        </p>
        <div className="flex flex-col gap-[3px]">
          <ActivityCalendar
            hideColorLegend
            hideTotalCount
            hideMonthLabels
            data={data}
            theme={{
              light: [
                tailwind.theme.colors.neutral[200],
                tailwind.theme.colors.orange[200],
                tailwind.theme.colors.orange[400],
                tailwind.theme.colors.orange[600],
                tailwind.theme.colors.orange[800]
              ],
              dark: [
                tailwind.theme.colors.neutral[700],
                tailwind.theme.colors.orange[200],
                tailwind.theme.colors.orange[400],
                tailwind.theme.colors.orange[600],
                tailwind.theme.colors.orange[800]
              ],
            }}
          />
        </div>
      </div>
    </Card>
  );
};

export default GitHubCard;
