import type { FC, HTMLAttributes } from 'react';

type TabProps = {
  tab: string;
  onTabSelect: (tab: string) => void;
  isActive: boolean;
} & HTMLAttributes<HTMLDivElement>;

const Tab: FC<TabProps> = ({ tab, onTabSelect, isActive, ...props }) => (
  <div
    onClick={() => onTabSelect(tab)}
    onKeyDown={(event) => {
      if (event.code === 'Space') {
        event.preventDefault();
        event.stopPropagation();
        onTabSelect(tab);
      }
    }}
    role="button"
    tabIndex={0}
    {...props}
  >
    <span
      className={`relative whitespace-nowrap text-sm ${
        isActive
          ? 'text-gray-900 after:absolute after:-bottom-[13px] after:block after:h-[1px] after:w-full after:bg-gray-900 after:content-[""] dark:text-white dark:after:bg-white'
          : 'text-gray-500 dark:text-gray-400'
      }`}
    >
      {tab}
    </span>
  </div>
);

export default Tab;
