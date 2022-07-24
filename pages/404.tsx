import { PrismicLink } from '@prismicio/react';
import type { FC } from 'react';

const NotFound: FC = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <div className="prose max-w-none text-center">
      <p className="text-xl">😰</p>
      <h1 className="m-0">
        404:{' '}
        <span className="text-gray-500 dark:text-gray-400">Page not found</span>
      </h1>
      <p>
        <PrismicLink className="font-medium" href="/">
          Take me home, country roads
        </PrismicLink>
      </p>
    </div>
  </div>
);

export default NotFound;
