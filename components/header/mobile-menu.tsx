'use client';

import { navigation } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/button';

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)}>
        <MenuIcon size={16} className="text-muted-foreground" />
      </Button>
      <div
        className={cn(
          'fixed top-[69px] right-0 left-0 flex h-[calc(100vh-69px)] w-full flex-col gap-4 bg-backdrop p-4 md:p-8',
          isOpen ? 'flex' : 'hidden'
        )}
      >
        {navigation.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-lg"
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Button variant="outline" asChild>
          <Link href="/contact">Get in touch</Link>
        </Button>
      </div>
    </>
  );
