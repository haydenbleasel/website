import type { FC, KeyboardEventHandler } from 'react';
import toast from 'react-hot-toast';
import useActivity from '../hooks/useActivity';

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

  return (
    <div
      className="absolute top-10 left-10 flex h-[28px] w-[28px] cursor-pointer items-center gap-2 overflow-hidden whitespace-nowrap rounded-full border border-gray-100 bg-white pr-2 hover:w-auto dark:border-gray-800 dark:bg-gray-900"
      onClick={notifyActivity}
      onKeyDown={handleNotifyActivity}
      tabIndex={-1}
      role="button"
    >
      <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center text-sm leading-none text-gray-900 dark:text-white sm:text-md">
        {activity.emoji}
      </div>
      <p className="text-sm leading-none text-gray-900 dark:text-white">
        {activity.status}
      </p>
      {activity.source && (
        <span className="text-sm leading-none text-gray-500 dark:text-gray-400">
          via {activity.source}
        </span>
      )}
    </div>
  );
};

export default Activity;
