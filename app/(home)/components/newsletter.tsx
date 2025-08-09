import { MailboxIcon } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/Button';

export const Newsletter = () => (
  <form
    action="/thank-you"
    className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
  >
    <h2 className="flex font-semibold text-sm text-zinc-900 dark:text-zinc-100">
      <MailboxIcon className="h-6 w-6 flex-none" weight="duotone" />
      <span className="ml-3">Stay up to date</span>
    </h2>
    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
      Get notified when I publish something new, and unsubscribe at any time.
    </p>
    <div className="mt-6 flex items-center">
      <span className="flex min-w-0 flex-auto p-px">
        <input
          aria-label="Email address"
          className="w-full appearance-none rounded-[calc(var(--radius-md)-1px)] bg-white px-3 py-[calc(--spacing(2)-1px)] shadow-md shadow-zinc-800/5 outline outline-zinc-900/10 placeholder:text-zinc-400 focus:outline-teal-500 focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:bg-zinc-700/15 dark:text-zinc-200 dark:outline-zinc-700 dark:focus:outline-teal-400 dark:focus:ring-teal-400/10 dark:placeholder:text-zinc-500"
          placeholder="Email address"
          required
          type="email"
        />
      </span>
      <Button className="ml-4 flex-none" type="submit">
        Join
      </Button>
    </div>
  </form>
);
