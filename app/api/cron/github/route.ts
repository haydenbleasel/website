import { parseError } from "@/lib/utils";
import { updateEdgeConfig } from "@/lib/vercel";
import { endOfWeek, startOfWeek, subDays, subWeeks, subYears } from "date-fns";
import type { Activity } from "rsc-activity-calendar";

export type GitHubProperties = {
  total: number;
  data: Activity[];
};

export const maxDuration = 300;
export const revalidate = 0;
export const dynamic = 'force-dynamic';

const today = new Date();
const endOfLastWeek = endOfWeek(subDays(today, 7));
const startOf26WeeksAgo = startOfWeek(subWeeks(endOfLastWeek, 26));

export const GET = async (): Promise<Response> => {
  try {
    const response = await fetch('https://github-contributions-api.jogruber.de/v4/haydenbleasel');
    const data = (await response.json()) as {
      total: Record<number, string>,
      contributions: Activity[];
    };
    
    const filteredData = data.contributions.filter((activity) => {
      const activityDate = new Date(activity.date);
      return activityDate <= endOfLastWeek && activityDate >= startOf26WeeksAgo;
    });

    const oneYearAgo = subYears(new Date(), 1);
    const total = data.contributions
      .filter((activity) => new Date(activity.date) >= oneYearAgo)
      .reduce((newTotal, { count }) => newTotal + count, 0);

    const content: GitHubProperties = { data: filteredData, total };

    await updateEdgeConfig('github', content);

    return new Response(undefined, { status: 204 });
  } catch (error) {
    const message = parseError(error);

    return new Response(message, { status: 500 });
  }
};
