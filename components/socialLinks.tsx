import Image from 'next/future/image';
import Link from 'next/link';
import type { FC } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { social } from '../utils/social';

const SocialLinks: FC = () => (
  <div className="-ml-3 flex flex-wrap">
    {social.map((platform, index) => (
      <Tooltip.Root key={platform.id}>
        <Tooltip.Trigger className="flex animate-enter opacity-0">
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
              className={`flex ${
                platform.invertDark ? 'dark:brightness-0 dark:invert' : ''
              }`}
            />
          </Link>
        </Tooltip.Trigger>
        <Tooltip.Content
          side="top"
          align="center"
          sideOffset={0}
          alignOffset={0}
          className="rounded-md bg-gray-900/90 py-1 px-2 text-sm text-white shadow-lg backdrop-blur-sm"
        >
          {platform.name}
          <Tooltip.Arrow className="fill-gray-900/90" />
        </Tooltip.Content>
      </Tooltip.Root>
    ))}
  </div>
);

export default SocialLinks;
