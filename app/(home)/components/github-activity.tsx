import { getActivity } from '@/app/actions/github';
import { Section } from '@/components/section';
import { social } from '@/lib/social';
import tailwind from '@/lib/tailwind';
import { ViewAnimation } from '@/providers/view-animation';
import type { ReactElement } from 'react';
import ActivityCalendar, { type Activity } from 'rsc-activity-calendar';

const Calendar = ({ data }: { data: Activity[] }) => (
  <ActivityCalendar
    hideColorLegend
    hideTotalCount
    hideMonthLabels
    data={data}
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
        tailwind.theme.colors.neutral[800],
        tailwind.theme.colors.green[200],
        tailwind.theme.colors.green[400],
        tailwind.theme.colors.green[600],
        tailwind.theme.colors.green[800],
      ],
    }}
  />
);

export const GitHubActivity = async (): Promise<ReactElement> => {
  const github = await getActivity();

  if ('error' in github) {
    return <div />;
  }

  const quarterLength = Math.floor(github.data.length / 4);
  const firstQuarterData = github.data.slice(0, quarterLength);
  const secondQuarterData = github.data.slice(quarterLength, quarterLength * 2);
  const thirdQuarterData = github.data.slice(
    quarterLength * 2,
    quarterLength * 3
  );
  const fourthQuarterData = github.data.slice(quarterLength * 3);

  return (
    <Section>
      <ViewAnimation
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="relative grid gap-0.5 sm:grid-cols-2 sm:gap-[3px] sm:p-8 lg:gap-1"
      >
        <Calendar data={thirdQuarterData} />
        <Calendar data={fourthQuarterData} />
        <Calendar data={firstQuarterData} />
        <Calendar data={secondQuarterData} />
        <div className="absolute right-0 bottom-0 left-0 z-10 h-full bg-gradient-to-b from-transparent to-backdrop sm:bottom-8 sm:h-40" />
        <a
          className="-translate-x-1/2 absolute bottom-4 left-1/2 z-10 whitespace-nowrap font-mono text-muted-foreground text-xs"
          href={social.github.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {github.total} contributions in the last year
        </a>
      </ViewAnimation>
    </Section>
  );
};
