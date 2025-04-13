import type { Post as PostType } from '@/.content-collections/generated';
import { Link } from '@/components/link';

type PostProps = Pick<PostType, '_meta' | 'title' | 'date'>;

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
});

export const Post = ({ _meta, title, date }: PostProps) => (
  <Link
    className="group flex items-center gap-2 text-sm"
    href={`/blog/${_meta.path}`}
  >
    <p className="text-foreground">{title}</p>
    <span className="h-px grow bg-border transition-colors group-hover:bg-border-dark" />
    <p className="text-foreground-lighter transition-colors group-hover:text-foreground-light">
      {dateFormatter.format(date)}
    </p>
  </Link>
);
