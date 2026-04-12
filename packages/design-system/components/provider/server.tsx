import { Analytics } from "@vercel/analytics/next";
import type { PropsWithChildren } from "react";

const DesignSystemServerProvider = ({ children }: PropsWithChildren) => (
  <>
    {children}
    <Analytics />
  </>
);

export { DesignSystemServerProvider };
