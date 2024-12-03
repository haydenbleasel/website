import { ViewAnimation } from '@/components/view-animation';
import { octokit } from '@/lib/github';
import { GitHubEvent } from './event';

export const Feed = async () => {
  const activity = await octokit.rest.activity.listPublicEventsForUser({
    username: 'haydenbleasel',
    per_page: 15,
  });

  return (
    <section className="relative flex flex-col gap-2 p-8 font-mono text-muted-foreground text-sm">
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
    </section>
  );
};
