import { SealCheckIcon } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';

import { Card } from '@/components/Card';

export type ToolProps = {
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
  let logoSrc: string | null = null;
  if (href) {
    try {
      const baseHref = imageHref ?? href;
      const hostname = new URL(baseHref).hostname;
      const token = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN;
      logoSrc = `https://img.logo.dev/${hostname}${token ? `?token=${token}` : ''}`;
    } catch {
      logoSrc = null;
    }
  }

  return (
    <Card as="li">
      <div className="flex items-center gap-4">
        {logoSrc ? (
          <Image
            alt={`${name} logo`}
            className="z-10 rounded-sm"
            height={28}
            src={logoSrc}
            width={28}
          />
        ) : null}
        <Card.Title as="h3" href={href}>
          {name}
        </Card.Title>
        {affiliate ? (
          <span className="relative z-10 inline-flex items-center gap-1">
            <SealCheckIcon
              aria-hidden="true"
              className="size-4 text-teal-500"
              weight="duotone"
            />
            <span className="sr-only">Affiliate link</span>
          </span>
        ) : null}
      </div>
      <Card.Description>{description}</Card.Description>
    </Card>
  );
};
