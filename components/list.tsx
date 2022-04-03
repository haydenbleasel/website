import type { FC, ReactNode } from 'react';
import { Fragment } from 'react';
import Divider from './divider';

type ListProps = {
  data: unknown[];
  renderItem: (item: never) => ReactNode;
};

const List: FC<ListProps> = ({ data, renderItem }) => (
  <div className="group">
    {data.map((item, index) => (
      <Fragment key={index}>
        {Boolean(index) && <Divider />}
        <div className="transition-opacity group-hover:opacity-30 group-hover:hover:opacity-100">
          {renderItem(item as never)}
        </div>
      </Fragment>
    ))}
  </div>
);

export default List;
