import { Button } from '@/components/ui/button';
import { navigation } from '@/lib/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Logo from './logo.jpg';

export const Header = () => (
  <header className="container sticky top-0 z-50 mx-auto flex items-center justify-between border-b bg-backdrop/90 px-4 py-4 backdrop-blur-md transition-all sm:px-0">
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
      {navigation.map((link) => (
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
      <Button variant="outline" size="sm" asChild>
        <Link href="/contact">Get in touch</Link>
      </Button>
    </div>
  </header>
);
