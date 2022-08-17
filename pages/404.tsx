import { PrismicLink } from '@prismicio/react';
import Image from 'next/future/image';
import type { FC } from 'react';

const NotFound: FC = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <div className="prose max-w-none text-center">
      <Image src="/images/bonk.webp" alt="Bonk" width={498} height={371} />
      <h1 className="m-0">
        404:{' '}
        <span className="text-neutral-500 dark:text-neutral-400">
          Page not found
        </span>
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
