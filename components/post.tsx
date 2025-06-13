import type { Post as PostType } from '@/.content-collections/generated';
import { Link } from '@/components/link';

type PostProps = Pick<PostType, '_meta' | 'title' | 'date'>;

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
});

export const Post = ({ _meta, title, date }: PostProps) => (
  <Link
    className="group flex flex-col gap-1 border-none text-sm sm:flex-row sm:items-center sm:gap-2"
    href={`/${_meta.path}`}
  >
    <p className="text-foreground">{title}</p>
    <span className="hidden h-px grow bg-border transition-colors group-hover:bg-border-dark sm:block" />
    <p className="text-foreground-lighter transition-colors group-hover:text-foreground-light">
      {dateFormatter.format(date)}
    </p>
  </Link>
);
