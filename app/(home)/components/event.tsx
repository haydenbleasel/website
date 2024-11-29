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
  RepoIcon,
  TagIcon,
} from '@primer/octicons-react';
import Image from 'next/image';

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

export const GitHubEvent = ({
  event,
}: {
  event: RestEndpointMethodTypes['activity']['listPublicEventsForUser']['response']['data'][0];
}) => {
  if (event.type === 'PushEvent') {
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
      <div className="flex items-center gap-2">
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
  }

  if (event.type === 'PullRequestEvent') {
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
      <div className="flex items-center gap-2">
        <GitPullRequestIcon className="h-4 w-4 shrink-0" />
        <div className="flex-1 truncate">
          Merged{' '}
          <div className="inline-flex items-center gap-1 align-bottom">
            <Image
              src={`https://github.com/${pullRequest.user.login}.png`}
              alt={pullRequest.user.login}
              width={16}
              height={16}
              className="rounded-full w-4 h-4"
            />
            {pullRequest.user.login}
          </div>
          's {pullRequest.title} on {event.repo.name}
        </div>
        <EventDate date={event.created_at} />
      </div>
    );
  }

  if (event.type === 'IssuesEvent') {
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
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 shrink-0" />
        <div className="flex-1 truncate">
          {event.actor.login} {event.payload.action}{' '}
          {event.payload.issue?.title} on {event.repo.name}
        </div>
        <EventDate date={event.created_at} />
      </div>
    );
  }

  if (event.type === 'PublicEvent') {
    return (
      <div className="flex items-center gap-2">
        <FeedPublicIcon className="h-4 w-4 shrink-0" />
        <span className="shrink-0">Open-sourced</span>
        <div className="flex-1 truncate">{event.repo.name} on GitHub</div>
        <EventDate date={event.created_at} />
      </div>
    );
  }

  if (event.type === 'IssueCommentEvent') {
    return (
      <div className="flex items-center gap-2">
        <CommentIcon className="h-4 w-4 shrink-0" />
        <span className="shrink-0">Commented on</span>
        <div className="flex-1 truncate">{event.payload.issue?.title}</div>
        <EventDate date={event.created_at} />
      </div>
    );
  }

  if (event.type === 'CreateEvent') {
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
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 shrink-0" />
        <span className="shrink-0">Created</span>
        <div className="flex-1 truncate">{event.repo.name}</div>
        <EventDate date={event.created_at} />
      </div>
    );
  }

  if (event.type === 'DeleteEvent') {
    const refType = (event.payload as { ref_type: 'branch' | 'tag' }).ref_type;
    const Icon = refType === 'branch' ? GitBranchIcon : TagIcon;

    return (
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 shrink-0" />
        <span className="shrink-0">Deleted</span>
        <div className="flex-1 truncate">{event.repo.name}</div>
        <EventDate date={event.created_at} />
      </div>
    );
  }
};
