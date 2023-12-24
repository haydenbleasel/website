import Image from 'next/image';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/components/mode-toggle';
import Status from '@/components/status';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '../ui/button';
import { Navigation } from './navigation';
import { Profile } from './profile';
import Avatar from './avatar.jpg';
import type { FC } from 'react';

export const Navbar: FC = () => (
  <>
    <div
      className={cn(
        'hidden lg:flex fixed left-0 top-0 bottom-0 w-60 flex-col py-2 border-r overflow-y-auto',
        'bg-white dark:bg-zinc-800',
        'border-zinc-200 dark:border-zinc-700'
      )}
    >
      <Profile />
      <Navigation />
      <section className="p-3 space-y-2">
        <p className="mx-3 text-xs font-semibold tracking-wide uppercase text-zinc-600 dark:text-zinc-400">
          Other
        </p>
        <div className="space-y-0.5">
          <ModeToggle />
          <Status />
        </div>
      </section>
    </div>

    <div
      className={cn(
        'sticky top-0 lg:hidden px-4 sm:px-8 z-50 py-3 backdrop-blur-sm flex justify-between gap-4 border-b',
        'bg-white/90 border-zinc-200',
        'dark:bg-zinc-900/90 dark:border-zinc-700'
      )}
    >
      <Link href="/" aria-label="Home">
        <Image
          src={Avatar}
          loading="eager"
          priority
          placeholder="blur"
          width={40}
          height={40}
          className="rounded-full w-10 h-10"
          alt=""
        />
      </Link>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="secondary" size="icon" aria-label="Open navigation">
            <HamburgerMenuIcon />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="max-h-[60vh] overflow-auto">
            <Navigation />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  </>
);
