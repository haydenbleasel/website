import type { social } from '@/lib/social';
import Image from 'next/image';
import { Button } from './ui/button';

type SocialButtonProps = {
  data: (typeof social)[keyof typeof social];
};

export const SocialButton = ({ data }: SocialButtonProps) => (
  <Button asChild variant="outline">
    <a href={data.href} target="_blank" rel="noreferrer noopener">
      <Image
        src={data.icon}
        alt={data.label}
        width={16}
        height={16}
        className="h-4 w-4 dark:opacity-50 dark:brightness-0 dark:invert"
      />
      Follow me on {data.label}
    </a>
  </Button>
);
