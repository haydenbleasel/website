import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import Logo from './logo.jpg';

const links = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/blog', label: 'Blog' },
  { href: '/stack', label: 'Stack' },
  { href: '/features', label: 'Features' },
];

export const Header = () => (
  <header className="container mx-auto flex items-center justify-between py-4">
    <div className="w-32">
      <Link href="/" aria-label="Hayden Bleasel">
        <Image
          src={Logo}
          alt=""
          width={32}
          height={32}
          className="h-8 w-8 overflow-hidden rounded-full object-cover"
          priority
          placeholder="blur"
        />
      </Link>
    </div>
    <nav className="flex gap-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-muted-foreground text-sm"
        >
          {link.label}
        </Link>
      ))}
    </nav>
    <div className="flex w-32 justify-end">
      <Button variant="outline" size="sm">
        Get in touch
      </Button>
    </div>
  </header>
);
