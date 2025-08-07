import { useId } from 'react';

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const id = useId();

  return (
    <section
      aria-labelledby={id}
      className="md:border-zinc-100 md:border-l md:pl-6 md:dark:border-zinc-700/40"
    >
      <div className="grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4">
        <h2
          className="font-semibold text-sm text-zinc-800 dark:text-zinc-100"
          id={id}
        >
          {title}
        </h2>
        <div className="md:col-span-3">{children}</div>
      </div>
    </section>
  );
}
