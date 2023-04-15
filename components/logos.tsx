import type { FC } from 'react';
import Image from './image';
import clsx from 'clsx';
import ScrollAreaProvider from './scrollArea';

const logos = [
  '/images/australian-ethical.svg',
  '/images/canva.svg',
  '/images/google.svg',
  '/images/national-geographic.svg',
  '/images/nike.svg',
  '/images/timberland.svg',
  '/images/toyota.svg',
  '/images/westfield.svg',
];

const Logos: FC = () => (
  <>
    <div className="mt-8 hidden grid-cols-8 gap-x-16 gap-y-8 sm:grid sm:grid-cols-4">
      {logos.map((logo) => (
        <div className="flex aspect-video w-full items-center" key={logo}>
          <Image
            src={logo}
            width={113}
            height={113}
            alt=""
            className={clsx(
              'm-0 h-auto max-h-[2.5rem] w-full opacity-40',
              'dark:brightness-0 dark:invert'
            )}
          />
        </div>
      ))}
    </div>
    <div className="-mx-4 block w-screen overflow-hidden sm:hidden">
      <ScrollAreaProvider orientation="horizontal">
        <div className="mt-8 flex flex-row items-center gap-12">
          {logos.map((logo, index) => (
            <div
              className={clsx(
                'w-[100px] items-center',
                index === 0 && 'ml-4',
                index === logos.length - 1 && 'mr-4'
              )}
              key={logo}
            >
              <Image
                src={logo}
                width={113}
                height={113}
                alt=""
                className={clsx(
                  'm-0 h-auto max-h-[2.5rem] w-full opacity-40',
                  'dark:brightness-0 dark:invert'
                )}
              />
            </div>
          ))}
        </div>
      </ScrollAreaProvider>
    </div>
  </>
);

export default Logos;
