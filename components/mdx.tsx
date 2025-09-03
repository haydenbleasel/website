import { MDXContent } from "@content-collections/mdx/react";
import Image from "next/image";
import Link from "next/link";
import type { HTMLProps, ReactNode } from "react";
import Zoom from "react-medium-image-zoom";
import { Tweet } from "./tweet";
import { Video } from "./video";

type MdxProperties = {
  readonly code: string;
};

const a = (props: HTMLProps<HTMLAnchorElement>) => {
  if (typeof props.href !== "string") {
    throw new TypeError("href is required");
  }

  return <Link {...props} href={props.href as string} />;
};

const img = (properties: HTMLProps<HTMLImageElement>) => {
  if (
    typeof properties.src !== "string" ||
    typeof properties.alt !== "string"
  ) {
    throw new TypeError("Image src and alt are required");
  }

  return (
    <Zoom zoomMargin={16}>
      <Image
        alt={properties.alt}
        className="my-0! overflow-hidden rounded-sm border border-border/50"
        height={698}
        quality={100}
        src={properties.src}
        unoptimized={properties.src.startsWith("http")}
        width={1240}
      />
    </Zoom>
  );
};

const Callout = ({ children }: { children: ReactNode }) => (
  <div className="overflow-hidden rounded-lg bg-gradient-to-tr from-white/0 to-white/20 p-px">
    <div className="rounded-[7px] bg-gradient-to-tr from-black to-neutral-950 p-6">
      {children}
    </div>
  </div>
);

export const Mdx = ({ code }: MdxProperties) => (
  <MDXContent
    code={code}
    components={{
      a,
      img,
      Video,
      Callout,
      Tweet,
    }}
  />
);
