import { octokit } from '@/lib/github';
import { GitHubEvent } from './event';

export const Feed = async () => {
  const activity = await octokit.rest.activity.listPublicEventsForUser({
    username: 'haydenbleasel',
    per_page: 10,
  });

  return (
    <div className="relative flex flex-col gap-2 px-4 py-8 font-mono text-muted-foreground text-sm sm:px-0">
      {activity.data.slice(0, 5).map((event) => (
        <GitHubEvent key={event.id} event={event} />
      ))}
      <div className="absolute right-0 bottom-6 left-0 z-10 h-40 bg-gradient-to-b from-transparent to-secondary" />
    </div>
  );
};
