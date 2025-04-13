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
    <Link className="group flex items-center gap-2 text-sm" href={href}>
      <span className="flex items-center gap-2">
        <Image src={src} alt="" width={12} height={12} className="rounded-sm" />
        <p className="text-foreground">{name}</p>
        {affiliate && <VerifiedIcon className="text-success" size={12} />}
      </span>
      <span className="h-px grow bg-border transition-colors group-hover:bg-border-dark" />
      <p className="text-foreground-lighter transition-colors group-hover:text-foreground-light">
        {description}
      </p>
    </Link>
  );
};
