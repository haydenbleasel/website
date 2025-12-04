"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { subscribe } from "@/actions/subscribe";

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
      className="relative mt-4 overflow-hidden rounded-full border"
    >
      <input
        aria-label="Email address"
        autoCapitalize="none"
        autoComplete="email"
        className="w-full appearance-none rounded-full py-2 pr-16 pl-4 text-base focus-visible:outline-none"
        id="email"
        name="email"
        placeholder="jane@acme.com"
        required
        type="email"
      />
      <button
        className="absolute top-1 right-1 flex-none cursor-pointer rounded-full! bg-primary px-4 py-1 text-base text-white transition-colors hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isPending}
        type="submit"
      >
        <span>Join</span>
      </button>
    </form>
  );
};
