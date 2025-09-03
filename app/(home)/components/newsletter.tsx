"use client";

import { ArrowRightIcon, MailboxIcon } from "@phosphor-icons/react/dist/ssr";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { subscribe } from "@/app/actions/subscribe";
import { Button } from "@/components/button";

const initialState = {
  message: "",
  error: "",
};

export const emailRegex = /.+@.+/u;

export const Newsletter = () => {
  const [state, formAction, isPending] = useActionState(
    subscribe,
    initialState
  );

  useEffect(() => {
    if (state.message) {
      toast.success(state.message);
    }
  }, [state.message]);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state.error]);

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex font-semibold text-sm text-zinc-900 dark:text-zinc-100">
        <MailboxIcon className="h-6 w-6 flex-none" weight="duotone" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="relative mt-6 flex items-center">
        <span className="flex min-w-0 flex-auto p-px">
          <input
            aria-label="Email address"
            className="w-full appearance-none rounded-full bg-zinc-50 px-4 py-[calc(--spacing(2)-1px)] pr-12 shadow-md shadow-zinc-800/5 outline outline-zinc-900/10 placeholder:text-zinc-400 focus:outline-teal-500 focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:bg-zinc-800 dark:text-zinc-200 dark:outline-zinc-700 dark:focus:outline-teal-400 dark:focus:ring-teal-400/10 dark:placeholder:text-zinc-500"
            id="email"
            name="email"
            placeholder="jane@acme.com"
            required
            type="email"
          />
        </span>
        <Button
          className="absolute top-1 right-1 flex-none cursor-pointer rounded-full! disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isPending}
          type="submit"
        >
          <span className="sr-only">Join</span>
          <ArrowRightIcon className="size-4" />
        </Button>
      </div>
    </form>
  );
};
