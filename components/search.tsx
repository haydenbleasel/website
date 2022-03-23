import type { FC } from "react";
import { Search as SearchIcon } from "react-feather";

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
};

const Search: FC<SearchProps> = ({ value, onChange }) => (
  <div className="flex-0 relative">
    <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
      <SearchIcon size={14} />
    </div>
    <input
      className="w-full bg-transparent px-[18px] text-sm text-gray-900 placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"
      type="text"
      placeholder="Search"
      value={value}
      onChange={({ target }) => onChange(target.value)}
    />
  </div>
);

export default Search;
