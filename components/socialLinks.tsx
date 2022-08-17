import Image from 'next/future/image';
import Link from 'next/link';
import type { FC } from 'react';
import { social } from '../utils/social';
import Tooltip from './tooltip';

const SocialLinks: FC = () => (
  <div className="-ml-3 flex flex-wrap">
    {social.map((platform, index) => (
      <Tooltip label={platform.name} key={platform.id}>
        <Link
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={platform.name}
          className="p-4 transition-transform hover:-translate-y-1"
          style={{ animationDelay: `${(index + 2) * 100}ms` }}
        >
          <Image
            src={`/social/${platform.id}.svg`}
            width={20}
            height={20}
            quality={100}
            alt={platform.name}
            className={`m-0 flex ${
              platform.invertDark ? 'dark:brightness-0 dark:invert' : ''
            }`}
          />
        </Link>
      </Tooltip>
    ))}
  </div>
);

export default SocialLinks;
