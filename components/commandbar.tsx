/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
  KBarResults,
} from "kbar";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useCallback } from "react";

const RenderResults: FC = () => {
  const { results } = useMatches();

  const onRender = useCallback(
    ({ item, active }) =>
      typeof item === "string" ? (
        <div>{item}</div>
      ) : (
        <div
          className={`flex items-center ${active ? "bg-gray-100" : "bg-white"}`}
        >
          {item.name}
          <div className="rounded-sm bg-gray-100 p-1 font-mono text-gray-700">
            {item.shortcut}
          </div>
        </div>
      ),
    []
  );

  return <KBarResults items={results} onRender={onRender} />;
};

const CommandBar: FC = ({ children }) => {
  const { push } = useRouter();
  const actions = [
    {
      id: "home",
      name: "Home",
      shortcut: ["h"],
      keywords: "home",
      perform: async () => push("/"),
    },
    {
      id: "blog",
      name: "Blog",
      shortcut: ["b"],
      keywords: "blog",
      perform: async () => push("/blog"),
    },
    {
      id: "colophon",
      name: "Colophon",
      shortcut: ["c"],
      keywords: "colophon",
      perform: async () => push("/colophon"),
    },
  ];

  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner>
          <KBarAnimator className="mx-auto w-full max-w-xl overflow-hidden rounded-lg bg-white drop-shadow-2xl">
            <KBarSearch className="font-md w-full border-none bg-white py-3 px-4 font-normal text-gray-900 outline-none" />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  );
};

export default CommandBar;
