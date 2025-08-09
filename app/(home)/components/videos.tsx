import clsx from 'clsx';
import { Video } from './video';

const videos = [
  { src: '/alaska.mov', rotation: 'rotate-2' },
  { src: '/bali.mov', rotation: '-rotate-2' },
  { src: '/california.mov', rotation: 'rotate-2' },
  { src: '/south-dakota.mov', rotation: 'rotate-2' },
  { src: '/sydney.mov', rotation: '-rotate-2' },
];

export const Videos = () => (
  <div className="mt-16 sm:mt-20">
    <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
      {videos.map((video) => (
        <div
          className={clsx(
            'relative aspect-9/10 w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
            video.rotation
          )}
          key={video.src}
        >
          <Video src={video.src} />
        </div>
      ))}
    </div>
  </div>
);
