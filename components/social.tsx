import { social } from '@/lib/social';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Link } from './link';

type SocialItemProps = {
  id: keyof typeof social;
};

export const SocialItem = ({ id }: SocialItemProps) => {
  const { href, icon, label, invert } = social[id];

  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2 rounded-full bg-secondary px-2.5 py-1 text-sm transition-colors',
        'hover:bg-border'
      )}
    >
      <Image
        className={cn('h-3.5 w-3.5 object-contain', invert && 'dark:invert')}
        src={icon}
        alt={label}
        width={14}
        height={14}
        priority
      />
      {label}
    </Link>
  );
};

export const Social = () => (
  <ul className="flex list-none flex-wrap gap-1 p-0">
    {Object.entries(social)
      .map(([id, { follow }]) => ({ id, follow }))
      .filter(({ follow }) => follow)
      .map(({ id }) => (
        <li key={id}>
          <SocialItem id={id as keyof typeof social} />
        </li>
      ))}
  </ul>
);
