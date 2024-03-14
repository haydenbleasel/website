import type { FC, ReactNode } from 'react';

type PageLayoutProps = {
  readonly children: ReactNode;
};

const PageLayout: FC<PageLayoutProps> = ({ children }) => (
  <main className="px-4 pt-16 pb-32 sm:pt-32">
    <div className="space-y-12 prose prose-neutral prose-orange mx-auto dark:prose-invert">
      {children}
    </div>
  </main>
);

export default PageLayout;
