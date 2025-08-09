import clsx from 'clsx';
import { Video } from './video';

const videos = [
  {
    src: 'https://wztid1lvoae2pjmk.public.blob.vercel-storage.com/alaska.mov',
    rotation: 'rotate-2',
    location: 'Seward, Alaska',
  },
  {
    src: 'https://wztid1lvoae2pjmk.public.blob.vercel-storage.com/bali.mov',
    rotation: '-rotate-2',
    location: 'Bali, Indonesia',
  },
  {
    src: 'https://wztid1lvoae2pjmk.public.blob.vercel-storage.com/california.mov',
    rotation: 'rotate-2',
    location: 'Monterey, California',
  },
  {
    src: 'https://wztid1lvoae2pjmk.public.blob.vercel-storage.com/south-dakota.mov',
    rotation: 'rotate-2',
    location: 'Jackson, South Dakota',
  },
  {
    src: 'https://wztid1lvoae2pjmk.public.blob.vercel-storage.com/sydney.mov',
    rotation: '-rotate-2',
    location: 'Sydney, Australia',
  },
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
          <Video location={video.location} src={video.src} />
        </div>
      ))}
    </div>
  </div>
);
