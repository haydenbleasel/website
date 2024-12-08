import { getActivity } from '@/app/actions/github';
import { Section } from '@/components/section';
import { social } from '@/lib/social';
import tailwind from '@/lib/tailwind';
import type { ReactElement } from 'react';
import ActivityCalendar from 'rsc-activity-calendar';

export const GitHubActivity = async (): Promise<ReactElement> => {
  const github = await getActivity();

  if ('error' in github) {
    return <div />;
  }

  const halfLength = Math.floor(github.data.length / 2);
  const firstHalfData = github.data.slice(0, halfLength);
  const secondHalfData = github.data.slice(halfLength);

  return (
    <Section className="relative flex flex-col gap-[3px] p-8">
      <ActivityCalendar
        hideColorLegend
        hideTotalCount
        hideMonthLabels
        data={firstHalfData}
        weekStart={1}
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
        style={{
          width: 'auto',
        }}
      />
      <ActivityCalendar
        hideColorLegend
        hideTotalCount
        hideMonthLabels
        data={secondHalfData}
        weekStart={1}
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
        style={{
          width: 'auto',
        }}
      />
      <div className="absolute right-0 bottom-8 left-0 z-10 h-40 bg-gradient-to-b from-transparent to-backdrop" />
      <a
        className="-translate-x-1/2 absolute bottom-4 left-1/2 z-10 font-mono text-muted-foreground text-xs"
        href={social.github.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {github.total} contributions in the last year
      </a>
    </Section>
  );
};
