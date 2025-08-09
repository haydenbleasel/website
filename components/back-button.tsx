'use client';

import { ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AppContext } from '@/app/providers';

export const BackButton = () => {
  const router = useRouter();
  const { previousPathname } = useContext(AppContext);

  if (!previousPathname) {
    return null;
  }

  return (
    <button
      aria-label="Go back to blog"
      className="group lg:-left-5 lg:-mt-2 xl:-top-1.5 mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition lg:absolute lg:mb-0 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
      onClick={() => router.back()}
      type="button"
    >
      <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
    </button>
  );
};
