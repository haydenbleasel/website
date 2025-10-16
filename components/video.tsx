"use client";

import { clsx } from "clsx";
import dynamic from "next/dynamic";
import type { ComponentProps, FC } from "react";

const ReactPlayer = dynamic(
  async () =>
    import(
      /* webpackChunkName: "react-player" */
      "react-player"
    ),
  { ssr: false }
);

type VideoProperties = ComponentProps<typeof ReactPlayer> & {
  readonly className?: string;
};

export const Video: FC<VideoProperties> = ({ className, ...properties }) => (
  <div
    className={clsx(
      "relative aspect-video overflow-hidden rounded-md",
      className
    )}
  >
    <ReactPlayer
      {...properties}
      height="100%"
      style={{ position: "absolute", inset: 0 }}
      width="100%"
    />
  </div>
);
