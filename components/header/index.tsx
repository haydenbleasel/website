import Image from 'next/image';
import { Link } from '../link';
import avatar from './avatar.jpg';

export const Header = () => (
  <div className="sticky top-0 z-50 flex h-16 items-center justify-between bg-background p-4">
    <Link href="/" className="flex items-center gap-4">
      <Image
        src={avatar}
        alt=""
        width={32}
        height={32}
        className="size-8 rounded-full"
        placeholder="blur"
        priority
      />
      <p className="font-medium text-foreground leading-normal">
        Hayden Bleasel
      </p>
    </Link>
    <Link href="/contact" className="rounded-full bg-muted px-4 py-2.5 text-sm">
      Get in touch
    </Link>
  </div>
);
