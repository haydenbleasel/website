import { forwardRef } from 'react';
import type { ReactNode } from 'react';

type HintProps = { children: ReactNode };

const Hint = forwardRef<HTMLParagraphElement, HintProps>(
  ({ children }, ref) => (
    <p className="text-sm text-neutral-500 dark:text-neutral-400" ref={ref}>
      {children}
    </p>
  )
);
Hint.displayName = 'Hint';

export default Hint;
