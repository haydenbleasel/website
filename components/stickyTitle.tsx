import type { FC } from 'react';
import { useRef } from 'react';
import { useIntersectionObserver } from '@react-hookz/web';

type StickyTitleProps = {
  noSticky: boolean;
  noTitle: boolean;
};

const StickyTitle: FC<StickyTitleProps> = ({ noSticky, noTitle, children }) => {
  const intersectionRef = useRef(null);
  const intersection = useIntersectionObserver(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: [1],
  });
  const isSticky = intersection ? !intersection.isIntersecting : false;

  return (
    <div
      className={`top-[-1px] z-10 border-b bg-transparent pt-12 sm:pt-0 ${
        isSticky && !noSticky
          ? 'border-gray-100 bg-white/80 backdrop-blur-sm transition-all dark:border-gray-800 dark:bg-gray-900/80'
          : 'border-transparent'
      } ${noSticky ? '' : 'sticky'}`}
      ref={intersectionRef}
    >
      {!noTitle && (
        <div className="container mx-auto grid max-w-[42rem] py-2 px-4">
          <h1
            className={`animate-enter font-semibold text-gray-900 opacity-0 transition-all dark:text-white ${
              isSticky && !noSticky ? 'text-md leading-loose' : 'text-xl'
            }`}
          >
            {children}
          </h1>
        </div>
      )}
    </div>
  );
};

export default StickyTitle;
