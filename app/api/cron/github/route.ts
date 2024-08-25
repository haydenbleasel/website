import { parseError } from "@/lib/utils";
import { updateEdgeConfig } from "@/lib/vercel";
import { subYears } from "date-fns";
import type { Activity } from "rsc-activity-calendar";

export type GitHubProperties = {
  total: number;
  data: Activity[];
};

export const maxDuration = 300;
export const revalidate = 0;
export const dynamic = 'force-dynamic';

const getCachedContributions = async () => {
  const response = await fetch('https://github-contributions-api.jogruber.de/v4/haydenbleasel');
  const data = (await response.json()) as {
    total: Record<number, string>,
    contributions: Activity[];
  };
  const total = data.total[new Date().getFullYear()];

  return { contributions: data.contributions, total };
};

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

export const GET = async (): Promise<Response> => {
  try {
    const { contributions } = await getCachedContributions();
    const data = getContributions(contributions, 0);
    const oneYearAgo = subYears(new Date(), 1);
    const total = contributions.
      filter((activity) => new Date(activity.date) >= oneYearAgo)
      .reduce((newTotal, { count }) => newTotal + count, 0);

    const content: GitHubProperties = { data, total };

    await updateEdgeConfig('github', content);

    return new Response(undefined, { status: 204 });
  } catch (error) {
    const message = parseError(error);

    return new Response(message, { status: 500 });
  }
};
