import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  p: ({ children, ...props }) => (
    <p {...props} className="not-first:mt-6">
      {children}
    </p>
  ),
  a: ({ children, ...props }) => (
    <a
      {...props}
      className="underline transition-colors hover:text-primary"
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  ),
  h2: ({ children, ...props }) => (
    <h2 {...props} className="not-first:mt-12 text-muted text-sm">
      {children}
    </h2>
  ),
  ul: ({ children, ...props }) => (
    <ul {...props} className="not-first:mt-6">
      {children}
    </ul>
  ),
  li: ({ children, ...props }) => (
    <li {...props} className="list-inside list-disc">
      {children}
    </li>
  ),
  em: ({ children, ...props }) => (
    <span {...props} className="text-muted">
      {children}
    </span>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
