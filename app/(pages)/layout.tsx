import type { FC, ReactNode } from 'react';

type PageLayoutProps = {
  readonly children: ReactNode;
};

const PageLayout: FC<PageLayoutProps> = ({ children }) => (
  <main className="px-4 py-16 sm:py-32">
    <div className="space-y-12 prose prose-neutral prose-orange mx-auto">
      {children}
    </div>
  </main>
);

export default PageLayout;
