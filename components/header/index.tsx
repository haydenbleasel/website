'use client';

import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { type SVGProps, useEffect, useState } from 'react';
import { Link } from '../link';
import { Navigation } from '../navigation';
import avatar from './avatar.jpg';

const X = (props: SVGProps<SVGSVGElement>) => (
  <svg
    version="1.1"
    viewBox="0 0 300.251 300"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>X</title>
    <path
      d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66"
      fill="currentColor"
    />
  </svg>
);

const GitHub = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>GitHub</title>
    <path
      clipRule="evenodd"
      d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
      fill="currentColor"
      fillRule="evenodd"
      transform="scale(64)"
    />
  </svg>
);

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: "We want to close the menu when the pathname changes"
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="sticky top-0 z-50 flex h-16 items-center justify-between bg-background p-4">
        <Link className="flex items-center gap-4" href="/">
          <Image
            alt=""
            className="size-8 rounded-full"
            height={32}
            placeholder="blur"
            priority
            src={avatar}
            width={32}
          />
          <p className="hidden font-medium text-foreground leading-normal sm:block">
            Hayden Bleasel
          </p>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            className="rounded-full p-2.5 text-sm transition-colors hover:bg-muted"
            href="https://x.com/haydenbleasel"
            rel="noopener"
            target="_blank"
          >
            <X className="size-4" />
          </Link>
          <Link
            className="rounded-full p-2.5 text-sm transition-colors hover:bg-muted"
            href="https://github.com/haydenbleasel"
            rel="noopener"
            target="_blank"
          >
            <GitHub className="size-4" />
          </Link>
          <Link
            className="rounded-full bg-muted px-4 py-2.5 font-medium text-sm transition-colors hover:bg-muted/50"
            href="/contact"
          >
            Get in touch
          </Link>
          <div className="md:hidden">
            <button
              className="cursor-pointer rounded-full p-2.5 text-sm transition-colors hover:bg-muted"
              onClick={() => setIsOpen(!isOpen)}
              type="button"
            >
              <MenuIcon className="size-4" />
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed top-16 right-0 left-0 z-50 border-b bg-background pb-4 md:hidden">
          <Navigation />
        </div>
      )}
    </>
  );
};
