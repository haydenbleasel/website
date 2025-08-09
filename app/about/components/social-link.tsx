import clsx from 'clsx';

type SocialLinkProps = {
  className?: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
};

export const SocialLink = ({
  className,
  href,
  children,
  icon: Icon,
}: SocialLinkProps) => (
  <li className={clsx(className, 'flex')}>
    <a
      className="group flex font-medium text-sm text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
      <span className="ml-4">{children}</span>
    </a>
  </li>
);
