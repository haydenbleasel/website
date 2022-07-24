import { PrismicLink } from '@prismicio/react';
import Image from 'next/future/image';
import type { FC } from 'react';
import { social } from '../utils/social';

const ServerError: FC = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <div className="prose max-w-none text-center">
      <Image src="/images/bonk.webp" alt="Bonk" width={498} height={371} />
      <h1 className="m-0">
        500:{' '}
        <span className="text-gray-500 dark:text-gray-400">
          Internal server error
        </span>
      </h1>
      <p>
        <PrismicLink
          className="font-medium"
          href={social.find(({ id }) => id === 'twitter')?.url}
        >
          Tell me my website sucks on Twitter
        </PrismicLink>
      </p>
    </div>
  </div>
);

export default ServerError;
