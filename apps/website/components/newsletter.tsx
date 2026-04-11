"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

import { subscribe } from "@/actions/subscribe";

const initialState = {
  error: "",
  message: "",
};

export const emailRegex = /.+@.+/u;

export const Newsletter = () => {
  const [state, formAction, isPending] = useActionState(
    subscribe,
    initialState
  );
  const prevState = useRef(state);

  useEffect(() => {
    if (state === prevState.current) {
      return;
    }
    prevState.current = state;

    if (state.message) {
      toast.success(state.message);
    }
    if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="relative overflow-hidden rounded-full bg-secondary"
    >
      <input
        aria-label="Email address"
        autoCapitalize="none"
        autoComplete="email"
        className="w-full appearance-none rounded-full py-2 pr-18 pl-4 text-base focus-visible:outline-none"
        id="email"
        name="email"
        placeholder="jane@acme.com"
        required
        type="email"
      />
      <button
        className="absolute top-1 right-1 flex-none cursor-pointer rounded-full! bg-foreground px-4 py-1 text-base text-background transition-colors hover:bg-foreground/80 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isPending}
        type="submit"
      >
        <span>Join</span>
      </button>
    </form>
  );
};
