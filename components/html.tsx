/* eslint-disable @typescript-eslint/naming-convention, react/no-danger */

import type { FC, HTMLAttributes } from "react";

type HTMLProps = HTMLAttributes<HTMLDivElement> & {
  data: string;
};

const Html: FC<HTMLProps> = ({ data, ...props }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: data,
    }}
    {...props}
  />
);

export default Html;
