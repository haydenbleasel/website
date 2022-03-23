import { PrismicLink } from "@prismicio/react";
import type { FC, HTMLAttributes } from "react";
import { ArrowLeft } from "react-feather";

export type LayoutProps = HTMLAttributes<HTMLDivElement> & {
  backHref?: string;
  backLabel?: string;
};

const Layout: FC<LayoutProps> = ({ backHref, backLabel, ...props }) => (
  <div className="container mx-auto py-12 sm:py-48">
    <div className="grid gap-8 sm:grid-cols-12">
      <div className="mx-auto grid w-full max-w-[32rem] gap-24 self-start px-4 sm:col-span-3">
        {backHref && (
          <PrismicLink href={backHref}>
            <span className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
              <ArrowLeft size={14} />
              <span className="text-sm text-gray-400 dark:text-gray-500">
                {backLabel ?? "Back"}
              </span>
            </span>
          </PrismicLink>
        )}
      </div>
      <div className="sm:col-span-9 sm:col-start-4 md:col-span-6">
        <div
          className="mx-auto grid w-full max-w-[32rem] gap-24 px-4"
          {...props}
        />
      </div>
    </div>
  </div>
);

export default Layout;
