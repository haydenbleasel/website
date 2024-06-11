import Image from 'next/image';
import Profile from '@/app/about/profile.jpg';
import GitHubLogo from './github.svg';
import { Location } from './location';
import type { FC } from 'react';

const GitHub: FC = () => (
  <div className="not-prose align-text-bottom inline-flex overflow-hidden border rounded-md shadow-[0_1px_8px_0_rgba(0,0,0,0.04)] border-gray-200 scale-[0.8] md:scale-100">
    <a
      className="px-2 py-1.5 border-r shadow-[inset_0_-2px_5px_0_rgba(0,0,0,0.07)] bg-gray-100 border-gray-200 flex items-center justify-center"
      href="https://github.com/haydenbleasel"
    >
      <Image alt="GitHub icon" className="h-5 w-5" src={GitHubLogo} />
    </a>{' '}
    <span className="px-2 py-1.5 text-sm font-medium bg-white shadow-[inset_0_-2px_5px_0_rgba(0,0,0,0.07)]">
      212
    </span>
  </div>
);

const Avatar: FC = () => (
  <Image
    alt=""
    className="m-0 inline w-8 aspect-square overflow-hidden object-cover rounded-md border border-neutral-200 rotate-6 -translate-y-0.5"
    src={Profile}
  />
);

export const Hero: FC = () => (
  <h1 className="tracking-tight leading-tight">
    Hello 👋 I’m Hayden Bleasel <Avatar />
    . I’m an Australian 🦘 Product Designer 🖼️ and Software Engineer <GitHub />{' '}
    currently based in <Location />.
  </h1>
);
