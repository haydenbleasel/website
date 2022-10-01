import type { FC, ReactNode } from 'react';
import { useRef } from 'react';
import useSticky from '@haydenbleasel/use-sticky';

type StickyTitleProps = {
  noSticky: boolean;
  noTitle: boolean;
  children: ReactNode;
};

const StickyTitle: FC<StickyTitleProps> = ({ noSticky, noTitle, children }) => {
  const ref = useRef(null);
  const isSticky = useSticky(ref);

  return (
    <div
      className={`z-10 border-b bg-transparent pt-12 print:hidden sm:pt-0 ${
        isSticky && !noSticky
          ? 'border-neutral-200 bg-neutral-100/80 backdrop-blur-sm transition-all dark:border-neutral-700 dark:bg-neutral-900/80'
          : 'border-transparent'
      } ${noSticky ? '' : 'sticky'}`}
      ref={ref}
    >
      {!noTitle && (
        <div className="container prose mx-auto grid max-w-[42rem] py-2 px-4 dark:prose-invert">
          <h1
            className={`animate-enter opacity-0 transition-all ${
              isSticky && !noSticky ? 'text-md leading-loose' : ''
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
