'use client';

import { navigation } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { atom, useAtom } from 'jotai';
import Link from 'next/link';
import { Button } from '../ui/button';

export const mobileMenuOpen = atom(false);

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useAtom(mobileMenuOpen);

  return (
    <div
      className={cn(
        'fixed top-[53px] right-0 left-0 z-50 flex h-[calc(100vh-53px)] w-full flex-col gap-4 bg-backdrop p-4 md:p-8',
        'sm:top-[69px] sm:h-[calc(100vh-69px)]',
        isOpen ? 'flex' : 'hidden'
      )}
    >
      {navigation.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="sm:text-lg"
          onClick={() => setIsOpen(false)}
        >
          {link.label}
        </Link>
      ))}
      <Button variant="outline" asChild onClick={() => setIsOpen(false)}>
        <Link href="/contact">Get in touch</Link>
      </Button>
    </div>
  );
};
