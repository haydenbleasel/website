import type { FC, ReactNode } from 'react';
import { useEffect, useState, Fragment } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import toast from 'react-hot-toast';
import { Search } from 'react-feather';
import Divider from './divider';

type ListProps = {
  className?: string;
  data: {
    title: string;
    items: Record<string, unknown>[];
  }[];
  indexKey: string;
  searchKeys: string[];
  renderItem: (item: never) => ReactNode;
};

const List: FC<ListProps> = ({
  className = '',
  data,
  renderItem,
  indexKey,
  searchKeys,
}) => {
  const [activeTab, setActiveTab] = useState<string>(data[0].title);
  const [results, setResults] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const filterRecommendations = async (term: string) => {
      const Fuse = (
        await import(
          /* webpackChunkName: "fuse" */
          'fuse.js'
        )
      ).default;
      const activeData = data.find((tab) => tab.title === activeTab)?.items;
      const fuse = new Fuse(activeData ?? [], {
        keys: searchKeys,
        threshold: 0.4,
      });
      const searchResults = fuse.search(term);
      const searchResultKeys = searchResults.map(({ item }) => item[indexKey]);

      setResults(searchResultKeys as never);
    };

    if (!search) {
      setResults([]);
      return;
    }

    filterRecommendations(search).catch((error) => {
      const message =
        error instanceof Error ? error.message : (error as string);

      toast.error(message);
    });
  }, [activeTab, data, indexKey, search, searchKeys]);

  const filterBySearch = (post: Record<string, unknown>) =>
    search.length ? results.includes(post[indexKey] as string) : true;

  return (
    <Tabs.Root
      className={`flex flex-col gap-3 ${className}`}
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <div className="flex flex-col gap-1 overflow-x-auto pb-1">
        <div className="space-between flex items-center gap-8">
          <Tabs.List className="flex flex-1 gap-4">
            {data.map(({ items, title }, index) => (
              <Tabs.Trigger
                className={`relative animate-enter whitespace-nowrap opacity-0 ${
                  title === activeTab
                    ? 'text-neutral-900 after:absolute after:-bottom-[9px] after:block after:h-[1px] after:w-full after:bg-neutral-900 after:content-[""] dark:text-white dark:after:bg-white'
                    : 'text-neutral-500 dark:text-neutral-400'
                }`}
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
                value={title}
                key={title}
              >
                {title}{' '}
                <span className="rounded-full border border-neutral-200 py-1 px-2 text-xs dark:border-neutral-700">
                  {items.length}
                </span>
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <div
            className="flex-0 relative animate-enter opacity-0"
            style={{
              animationDelay: `${(data.length + 2) * 100}ms`,
            }}
          >
            <Search
              className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500"
              size={14}
            />
            <input
              className="w-full min-w-[200px] bg-transparent py-1 px-[18px] outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
              type="text"
              placeholder="Search"
              value={search}
              onChange={({ target }) => setSearch(target.value)}
            />
          </div>
        </div>
        <Divider />
      </div>
      {data.map(({ title, items }) => (
        <Tabs.Content value={title} key={title} className="group">
          {items.filter(filterBySearch).length ? (
            items.filter(filterBySearch).map((item, index) => (
              <Fragment key={index}>
                {Boolean(index) && <Divider />}
                <div
                  className="animate-enter opacity-0 transition-opacity"
                  style={{ animationDelay: `${300 + index * 50}ms` }}
                >
                  <div className="group-hover:opacity-30 group-hover:hover:opacity-100">
                    {renderItem(item as unknown as never)}
                  </div>
                </div>
              </Fragment>
            ))
          ) : (
            <p className="text-md text-neutral-500 dark:text-neutral-400">
              No data found.
            </p>
          )}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};

export default List;
