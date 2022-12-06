import Link from 'next/link';
import Image from 'next/image';
import type { FC } from 'react';
import { Eye, MessageCircle, ThumbsUp } from 'lucide-react';
import clsx from 'clsx';
import type { DribbbleResponse } from '@/lib/dribbble';
import formatNumbers from '@/lib/formatNumbers';

const Shot: FC<DribbbleResponse> = ({
  id,
  url,
  comments,
  image,
  likes,
  title,
  video,
  views,
}) => (
  <Link
    key={id}
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className={clsx(
      'group relative flex w-full max-w-[400px] flex-shrink-0 flex-grow-0 flex-col overflow-hidden rounded-md border no-underline shadow-lg shadow-zinc-800/5 transition-colors',
      'border-zinc-200 bg-white hover:bg-zinc-100',
      'dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800'
    )}
  >
    <div>
      <div className="relative aspect-[4/3] w-full">
        {video && (
          <video
            className="relative m-0 w-full rounded-none"
            autoPlay
            loop
            muted
            playsInline
            src={video}
          />
        )}

        {!video && image && (
          <Image
            src={image}
            width={400}
            height={300}
            quality={100}
            alt=""
            className="relative m-0 aspect-[4/3] w-full rounded-none object-cover"
          />
        )}
      </div>
      <div className="flex flex-col gap-1 border-t border-zinc-200 p-4 dark:border-zinc-700">
        <p className="m-0 font-medium text-zinc-900 line-clamp-1 dark:text-white">
          {title ?? 'Loading'}
        </p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <MessageCircle width={16} height={16} className="text-zinc-400" />
            <p className="m-0 text-base text-zinc-500 dark:text-zinc-400">
              {formatNumbers(comments)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsUp width={16} height={16} className="text-zinc-400" />
            <p className="m-0 text-base text-zinc-500 dark:text-zinc-400">
              {formatNumbers(likes)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Eye width={16} height={16} className="text-zinc-400" />
            <p className="m-0 text-base text-zinc-500 dark:text-zinc-400">
              {formatNumbers(views)}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default Shot;
