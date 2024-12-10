import { getActivity } from '@/app/actions/github';
import { Section } from '@/components/section';
import { social } from '@/lib/social';
import { ViewAnimation } from '@/providers/view-animation';
import type { ReactElement } from 'react';
import { GitHubActivityClient } from './client';

export const GitHubActivity = async (): Promise<ReactElement> => {
  const github = await getActivity();

  if ('error' in github) {
    return <div />;
  }

  const halfLength = Math.floor(github.data.length / 2);
  const firstHalfData = github.data.slice(0, halfLength);
  const secondHalfData = github.data.slice(halfLength);

  return (
    <Section>
      <ViewAnimation
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="relative flex flex-col gap-[3px] p-8 lg:gap-1"
      >
        <GitHubActivityClient data={secondHalfData} />
        <GitHubActivityClient data={firstHalfData} />
        <div className="absolute right-0 bottom-8 left-0 z-10 h-40 bg-gradient-to-b from-transparent to-backdrop" />
        <a
          className="-translate-x-1/2 absolute bottom-4 left-1/2 z-10 font-mono text-muted-foreground text-xs"
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
