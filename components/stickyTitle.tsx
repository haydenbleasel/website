import type { FC } from 'react';
import { useRef } from 'react';
import { useIntersection } from 'react-use';

type StickyTitleProps = {
  noSticky: boolean;
};

const StickyTitle: FC<StickyTitleProps> = ({ noSticky, children }) => {
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });
  const isSticky = !intersection?.isIntersecting;

  return (
    <div
      className={`top-[-1px] z-10 transition-all ${
        isSticky ? 'border-b border-gray-100 bg-white/80 backdrop-blur-sm' : ''
      } ${noSticky ? '' : 'sticky'}`}
      ref={intersectionRef}
    >
      <div className="container mx-auto grid max-w-[32rem] py-2 px-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          {children}
        </h1>
      </div>
    </div>
  );
};

export default StickyTitle;
