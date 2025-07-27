import { VerifiedIcon } from 'lucide-react';
import Image from 'next/image';
import { Link } from './link';

type ToolProps = {
  name: string;
  description: string;
  href: string;
  affiliate?: boolean;
  featured?: boolean;
  imageHref?: string;
};

export const Tool = ({
  name,
  description,
  href,
  affiliate,
  imageHref,
}: ToolProps) => {
  const baseHref = imageHref ?? href;
  const src = `https://img.logo.dev/${new URL(baseHref).hostname}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN}`;

  return (
    <Link
      className="group flex items-center divide-x rounded-md border transition-colors hover:bg-secondary"
      href={href}
    >
      <div className="flex size-16 shrink-0 items-center justify-center">
        <Image alt="" className="rounded-sm" height={28} src={src} width={28} />
      </div>
      <span className="flex-1 px-4">
        <span className="flex items-center gap-2">
          <p className="text-foreground">{name}</p>
          {affiliate && (
            <VerifiedIcon
              className="text-blue-600 dark:text-blue-400"
              size={12}
            />
          )}
        </span>
        <p className="text-muted-foreground text-sm transition-colors group-hover:text-foreground">
          {description}
        </p>
      </span>
    </Link>
  );
};
