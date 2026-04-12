"use client";

import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@haydenbleasel/design-system/components/kibo-ui/contribution-graph";
import type { Activity } from "@haydenbleasel/design-system/components/kibo-ui/contribution-graph";

export const ContributionGraphClient = ({
  contributions,
  totalCount,
}: {
  contributions: Activity[];
  totalCount: number;
}) => (
  <ContributionGraph data={contributions} totalCount={totalCount}>
    <ContributionGraphCalendar>
      {({ activity, dayIndex, weekIndex }) => (
        <ContributionGraphBlock activity={activity} dayIndex={dayIndex} weekIndex={weekIndex} />
      )}
    </ContributionGraphCalendar>
    <ContributionGraphFooter>
      <ContributionGraphTotalCount />
      <ContributionGraphLegend />
    </ContributionGraphFooter>
  </ContributionGraph>
);
