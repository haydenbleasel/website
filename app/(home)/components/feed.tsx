import { Section } from '@/components/section';
import { octokit } from '@/lib/github';
import { cn } from '@/lib/utils';
import { ViewAnimation } from '@/providers/view-animation';
import { GitHubEvent } from './event';

export const Feed = async () => {
  const activity = await octokit.rest.activity.listPublicEventsForUser({
    username: 'haydenbleasel',
    per_page: 15,
  });

  return (
    <Section
      className={cn(
        'relative flex flex-col gap-2 px-4 py-8 font-mono text-muted-foreground text-xs',
        'sm:px-8 sm:text-sm'
      )}
    >
      {activity.data.slice(0, 10).map((event, index) => (
        <ViewAnimation
          key={event.id}
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={index * 0.1}
        >
          <GitHubEvent event={event} />
        </ViewAnimation>
      ))}
      <div className="absolute right-0 bottom-6 left-0 z-10 h-40 bg-gradient-to-b from-transparent to-backdrop" />
    </Section>
  );
};
