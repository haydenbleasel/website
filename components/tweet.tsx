import type { ComponentProps } from 'react';
import { Tweet as TweetComponent } from 'react-tweet';
import { cn } from '@/lib/utils';

type TweetProps = ComponentProps<typeof TweetComponent> & {
  className?: string;
};

export const Tweet = ({ className, ...props }: TweetProps) => (
  <div
    className={cn(
      'not-prose [&_.react-tweet-theme]:mt-4! [&_.react-tweet-theme]:mb-4!',
      className
    )}
  >
    <TweetComponent {...props} />
  </div>
);
