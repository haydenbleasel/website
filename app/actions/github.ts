import { parseError } from '@/lib/utils';
import { endOfWeek, subDays, subWeeks } from 'date-fns';
import ky from 'ky';
import type { Activity } from 'react-activity-calendar';

export type GitHubProperties = {
  total: number;
  data: Activity[];
};

export const maxDuration = 300;
export const revalidate = 0;
export const dynamic = 'force-dynamic';

const today = endOfWeek(subWeeks(new Date(), 1));
const oneYearAgo = subDays(today, 365);
const twoYearsAgo = subDays(today, 1092);

export const getActivity = async (): Promise<
  GitHubProperties | { error: string }
> => {
  try {
    const response = await ky
      .get<{ contributions: Activity[] }>(
        'https://github-contributions-api.jogruber.de/v4/haydenbleasel'
      )
      .json();

    const content: GitHubProperties = {
      data: response.contributions
        .filter(({ date }) => {
          const dateObj = new Date(date);
          return dateObj <= today && dateObj >= twoYearsAgo;
        })
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
      total: response.contributions.reduce(
        (total, { date, count }) =>
          new Date(date) >= oneYearAgo && new Date(date) <= today
            ? total + count
            : total,
        0
      ),
    };

    return content;
  } catch (error) {
    return { error: parseError(error) };
  }
};
