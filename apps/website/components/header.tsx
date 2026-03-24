import type { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

export const Header = ({ children }: HeaderProps) => (
  <header className="grid gap-6">{children}</header>
);
