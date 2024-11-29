import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import Logo from './logo.jpg';

export const Header = () => (
  <header className="container mx-auto flex items-center justify-between">
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
    <nav>
      <Link href="/">Home</Link>
      <Link href="/projects">Projects</Link>
      <Link href="/blog">Blog</Link>
    </nav>
    <Button variant="outline">Get in touch</Button>
  </header>
);
