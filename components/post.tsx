import type { Post as PostType } from '@/.content-collections/generated';
import { Link } from '@/components/link';

type PostProps = Pick<PostType, '_meta' | 'title' | 'date'>;

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
});

export const Post = ({ _meta, title, date }: PostProps) => (
  <div>
    <Link className="block break-words" href={`/${_meta.path}`}>
      {title}
    </Link>
    <p className="block text-muted-foreground text-sm">
      {dateFormatter.format(date)}
    </p>
  </div>
);
