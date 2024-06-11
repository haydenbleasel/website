import Image from 'next/image';
import GitHubLogo from './github.svg';
import type { StaticImageData } from 'next/image';
import type { FC } from 'react';

export const GitHub: FC = () => (
  <div className="not-prose align-text-bottom inline-flex overflow-hidden border rounded-md shadow-[0_1px_8px_0_rgba(0,0,0,0.04)] border-gray-200 scale-[0.8] md:scale-100">
    <a
      className="px-2 py-1.5 border-r shadow-[inset_0_-2px_5px_0_rgba(0,0,0,0.07)] bg-gray-100 border-gray-200 flex items-center justify-center"
      href="https://github.com/haydenbleasel"
      aria-label="GitHub"
    >
      <Image alt="" className="h-5 w-5" src={GitHubLogo as StaticImageData} />
    </a>{' '}
    <span className="px-2 py-1.5 text-sm font-medium bg-white shadow-[inset_0_-2px_5px_0_rgba(0,0,0,0.07)]">
      212
    </span>
  </div>
);
