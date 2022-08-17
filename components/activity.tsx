import type { FC, KeyboardEventHandler } from 'react';
import toast from 'react-hot-toast';
import useActivity from '../hooks/useActivity';
import Tooltip from './tooltip';

const Activity: FC = () => {
  const activity = useActivity();
  const notifyActivity = () =>
    toast(
      'The activity status is a guess of what I am doing right now, based on a combination of several APIs and the time of day.'
    );

  const handleNotifyActivity: KeyboardEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (event.code === 'Space') {
      event.preventDefault();
      event.stopPropagation();
      notifyActivity();
    }
  };

  let label = activity.status;

  if (activity.source) {
    label += ` (via ${activity.source})`;
  }

  return (
    <div
      className="fixed top-2 right-12 flex h-[28px] w-[28px] cursor-pointer items-center gap-2 overflow-hidden whitespace-nowrap rounded-full border border-neutral-100 bg-white pr-2 dark:border-neutral-800 dark:bg-neutral-900"
      onClick={notifyActivity}
      onKeyDown={handleNotifyActivity}
      tabIndex={-1}
      role="button"
    >
      <Tooltip label={label} side="bottom" sideOffset={4}>
        <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center text-sm leading-none text-neutral-900 dark:text-white sm:text-md">
          {activity.emoji}
        </div>
      </Tooltip>
    </div>
  );
};

export default Activity;
