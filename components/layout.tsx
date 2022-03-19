import { PrismicLink } from "@prismicio/react";
import type { FC, HTMLAttributes } from "react";
import { ArrowLeft } from "react-feather";
import tailwindConfig from '../tailwind.config';

export type LayoutProps = HTMLAttributes<HTMLDivElement> & {
  backHref?: string;
  backLabel?: string;
}

const Layout: FC<LayoutProps> = ({ backHref, backLabel, ...props }) => (
  <div className="container mx-auto py-48">
    <div className="grid grid-cols-12 gap-8">
      {backHref && (
        <PrismicLink href={backHref}>
          <span className="flex items-center gap-1">
            <ArrowLeft size={14} color={tailwindConfig.theme.colors.gray[400]} />
            <span className="text-sm text-gray-400">{backLabel ?? 'Back'}</span>
          </span>
        </PrismicLink>
      )}
      <div className="col-span-6 col-start-4">
        <div className="max-w-[30rem] mx-auto grid gap-24" {...props} />
      </div>
    </div>
  </div>
);

export default Layout;