import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: ReactNode;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => (
  <div>
    <h1 className="text-2xl font-medium">{title}</h1>
    <p className="text-muted-foreground">{description}</p>
  </div>
);
