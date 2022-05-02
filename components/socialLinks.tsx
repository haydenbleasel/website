import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { social } from '../utils/social';

const SocialLinks: FC = () => (
  <div className="-ml-3 flex flex-wrap">
    {social.map((platform, index) => (
      <Link href={platform.url} key={platform.id} passHref>
        <a
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={platform.name}
          className="animate-enter opacity-0"
          style={{ animationDelay: `${(index + 2) * 100}ms` }}
        >
          <span
            className={`flex p-4 transition-transform hover:-translate-y-1 ${
              platform.invertDark ? 'dark:brightness-0 dark:invert' : ''
            }`}
          >
            <Image
              src={`/social/${platform.id}.svg`}
              width={18}
              height={18}
              layout="fixed"
              quality={100}
              alt={platform.name}
            />
          </span>
        </a>
      </Link>
    ))}
  </div>
);

export default SocialLinks;
