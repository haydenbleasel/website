import type { RestEndpointMethodTypes } from '@octokit/rest';
import {
  CommentIcon,
  FeedPublicIcon,
  GitBranchIcon,
  GitCommitIcon,
  GitPullRequestIcon,
  IssueClosedIcon,
  IssueOpenedIcon,
  IssueReopenedIcon,
  IssueTrackedByIcon,
  IssueTracksIcon,
  RepoForkedIcon,
  RepoIcon,
  StarIcon,
  TagIcon,
} from '@primer/octicons-react';

const EventDate = ({ date }: { date: string | null }) => {
  if (!date) {
    return <div className="shrink-0 text-muted-foreground">Recently</div>;
  }

  return (
    <div className="shrink-0 text-muted-foreground">
      {new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })}
    </div>
  );
};

type EventType =
  | 'CommitCommentEvent'
  | 'CreateEvent'
  | 'DeleteEvent'
  | 'ForkEvent'
  | 'GollumEvent'
  | 'IssueCommentEvent'
  | 'IssuesEvent'
  | 'MemberEvent'
  | 'PublicEvent'
  | 'PullRequestEvent'
  | 'PullRequestReviewEvent'
  | 'PullRequestReviewCommentEvent'
  | 'PullRequestReviewThreadEvent'
  | 'PushEvent'
  | 'ReleaseEvent'
  | 'SponsorshipEvent'
  | 'WatchEvent';

type GitHubEvent =
  RestEndpointMethodTypes['activity']['listPublicEventsForUser']['response']['data'][0];

const PushEvent = ({ event }: { event: GitHubEvent }) => {
  // https://github.com/octokit/rest.js/issues/128
  const commits = (
    event.payload as {
      commits: {
        sha: string;
        author: {
          email: string;
          name: string;
        };
        message: string;
        distinct: boolean;
      }[];
    }
  ).commits;

  return (
    <div className="flex items-center gap-4">
      <GitCommitIcon className="h-4 w-4 shrink-0" />
      <div className="flex-1 truncate">
        Pushed {commits.length} commits to {event.repo.name}:{' '}
        {new Intl.ListFormat('en', {
          style: 'long',
          type: 'conjunction',
        }).format(commits.map((commit) => commit.message))}
      </div>
      <EventDate date={event.created_at} />
    </div>
  );
};

const PullRequestEvent = ({ event }: { event: GitHubEvent }) => {
  const pullRequest = (
    event.payload as {
      pull_request: {
        title: string;
        user: {
          login: string;
        };
      };
    }
  ).pull_request;

  return (
    <div className="flex items-center gap-4">
      <GitPullRequestIcon className="h-4 w-4 shrink-0" />
      <div className="flex-1 truncate">
        Merged {pullRequest.user.login}'s {pullRequest.title} on{' '}
        {event.repo.name}
      </div>
      <EventDate date={event.created_at} />
    </div>
  );
};

const IssuesEvent = ({ event }: { event: GitHubEvent }) => {
  const action = (
    event.payload as {
      action:
        | 'opened'
        | 'edited'
        | 'closed'
        | 'reopened'
        | 'assigned'
        | 'unassigned'
        | 'labeled'
        | 'unlabeled';
    }
  ).action;
  let Icon = IssueOpenedIcon;

  if (action === 'reopened' || action === 'edited') {
    Icon = IssueReopenedIcon;
  } else if (action === 'closed') {
    Icon = IssueClosedIcon;
  } else if (action === 'assigned' || action === 'unassigned') {
    Icon = IssueTrackedByIcon;
  } else if (action === 'labeled' || action === 'unlabeled') {
    Icon = IssueTracksIcon;
  }

  return (
    <div className="flex items-center gap-4">
      <Icon className="h-4 w-4 shrink-0" />
      <div className="flex-1 truncate">
        {event.actor.login} {event.payload.action} {event.payload.issue?.title}{' '}
        on {event.repo.name}
      </div>
      <EventDate date={event.created_at} />
    </div>
  );
};

const PublicEvent = ({ event }: { event: GitHubEvent }) => (
  <div className="flex items-center gap-4">
    <FeedPublicIcon className="h-4 w-4 shrink-0" />
    <div className="flex-1 truncate">
      Open-sourced {event.repo.name} on GitHub
    </div>
    <EventDate date={event.created_at} />
  </div>
);

const IssueCommentEvent = ({ event }: { event: GitHubEvent }) => (
  <div className="flex items-center gap-4">
    <CommentIcon className="h-4 w-4 shrink-0" />
    <div className="flex-1 truncate">
      Commented on {event.payload.issue?.title} (#
      {event.payload.issue?.number})
    </div>
    <EventDate date={event.created_at} />
  </div>
);

const CreateEvent = ({ event }: { event: GitHubEvent }) => {
  let Icon = GitBranchIcon;
  const refType = (
    event.payload as { ref_type: 'branch' | 'repository' | 'tag' }
  ).ref_type;

  if (refType === 'repository') {
    Icon = RepoIcon;
  } else if (refType === 'tag') {
    Icon = TagIcon;
  }

  return (
    <div className="flex items-center gap-4">
      <Icon className="h-4 w-4 shrink-0" />
      <div className="flex-1 truncate">
        Created a {refType} on {event.repo.name}
      </div>
      <EventDate date={event.created_at} />
    </div>
  );
};

const DeleteEvent = ({ event }: { event: GitHubEvent }) => {
  const refType = (event.payload as { ref_type: 'branch' | 'tag' }).ref_type;
  const Icon = refType === 'branch' ? GitBranchIcon : TagIcon;

  return (
    <div className="flex items-center gap-4">
      <Icon className="h-4 w-4 shrink-0" />
      <div className="flex-1 truncate">
        Deleted a {refType} on {event.repo.name}
      </div>
      <EventDate date={event.created_at} />
    </div>
  );
};

const WatchEvent = ({ event }: { event: GitHubEvent }) => (
  <div className="flex items-center gap-4">
    <StarIcon className="h-4 w-4 shrink-0" />
    <div className="flex-1 truncate">Starred {event.repo.name}</div>
    <EventDate date={event.created_at} />
  </div>
);

const ForkEvent = ({ event }: { event: GitHubEvent }) => (
  <div className="flex items-center gap-4">
    <RepoForkedIcon className="h-4 w-4 shrink-0" />
    <div className="flex-1 truncate">Forked {event.repo.name}</div>
    <EventDate date={event.created_at} />
  </div>
);

const PullRequestReviewEvent = ({ event }: { event: GitHubEvent }) => {
  const pullRequest = (
    event.payload as {
      pull_request: {
        title: string;
        number: number;
      };
    }
  ).pull_request;

  return (
    <div className="flex items-center gap-4">
      <GitPullRequestIcon className="h-4 w-4 shrink-0" />
      <div className="flex-1 truncate">
        Reviewed pull request {pullRequest.title} (#{pullRequest.number})
      </div>
      <EventDate date={event.created_at} />
    </div>
  );
};

const PullRequestReviewCommentEvent = ({ event }: { event: GitHubEvent }) => {
  const pullRequest = (
    event.payload as {
      pull_request: {
        title: string;
        number: number;
      };
    }
  ).pull_request;

  return (
    <div className="flex items-center gap-4">
      <GitPullRequestIcon className="h-4 w-4 shrink-0" />
      <div className="flex-1 truncate">
        Commented on pull request {pullRequest.title} (#{pullRequest.number})
      </div>
      <EventDate date={event.created_at} />
    </div>
  );
};

const PullRequestReviewThreadEvent = ({ event }: { event: GitHubEvent }) => (
  <div className="flex items-center gap-4">
    <GitPullRequestIcon className="h-4 w-4 shrink-0" />
    <div className="flex-1 truncate">
      Marked a pull request thread as {event.payload.action} on{' '}
      {event.repo.name}
    </div>
    <EventDate date={event.created_at} />
  </div>
);

export const GitHubEvent = ({
  event,
}: {
  event: GitHubEvent;
}) => {
  const type = event.type as EventType;

  switch (type) {
    case 'PushEvent':
      return <PushEvent event={event} />;
    case 'PullRequestEvent':
      return <PullRequestEvent event={event} />;
    case 'WatchEvent':
      return <WatchEvent event={event} />;
    case 'ForkEvent':
      return <ForkEvent event={event} />;
    case 'PullRequestReviewEvent':
      return <PullRequestReviewEvent event={event} />;
    case 'PullRequestReviewCommentEvent':
      return <PullRequestReviewCommentEvent event={event} />;
    case 'PullRequestReviewThreadEvent':
      return <PullRequestReviewThreadEvent event={event} />;
    case 'PublicEvent':
      return <PublicEvent event={event} />;
    case 'IssueCommentEvent':
      return <IssueCommentEvent event={event} />;
    case 'CreateEvent':
      return <CreateEvent event={event} />;
    case 'DeleteEvent':
      return <DeleteEvent event={event} />;
    case 'IssuesEvent':
      return <IssuesEvent event={event} />;
    default:
      return null;
  }
};
