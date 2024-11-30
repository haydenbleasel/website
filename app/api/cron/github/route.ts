import { parseError } from '@/lib/utils';
import { updateEdgeConfig } from '@/lib/vercel';
import { endOfWeek, subDays, subYears } from 'date-fns';
import ky from 'ky';
import type { Activity } from 'rsc-activity-calendar';

export type GitHubProperties = {
  total: number;
  data: Activity[];
};

export const maxDuration = 300;
export const revalidate = 0;
export const dynamic = 'force-dynamic';

const today = new Date();
const endOfLastWeek = endOfWeek(subDays(today, 7));
const startDate = subDays(endOfLastWeek, 364);
const oneYearAgo = subYears(today, 1);

export const GET = async (): Promise<Response> => {
  try {
    const response = await ky
      .get<{ contributions: Activity[] }>(
        'https://github-contributions-api.jogruber.de/v4/haydenbleasel'
      )
      .json();

    const content: GitHubProperties = {
      data: response.contributions.filter((activity) => {
        const activityDate = new Date(activity.date);

        return activityDate <= endOfLastWeek && activityDate >= startDate;
      }),
      total: response.contributions.reduce(
        (total, { date, count }) =>
          new Date(date) >= oneYearAgo ? total + count : total,
        0
      ),
    };

    await updateEdgeConfig('github', content);

    return new Response(undefined, { status: 204 });
  } catch (error) {
    return new Response(parseError(error), { status: 500 });
  }
};
