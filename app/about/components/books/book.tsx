import type { OkuProperties } from '@/app/api/cron/oku/route';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export const Book = (book: OkuProperties['backlog'][number]) => (
  <a
    key={book.id}
    href={book.link}
    target="_blank"
    rel="noreferrer noopener"
    className={cn(
      'relative flex h-full flex-row items-center justify-center gap-4 overflow-hidden rounded-xl border p-4 transition-all',
      'hover:-translate-y-1 hover:bg-background hover:shadow-sm sm:flex-col sm:p-8 sm:text-center'
    )}
  >
    <div
      className={cn(
        'relative w-20 shrink-0 overflow-hidden',
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-sm after:bg-[linear-gradient(90deg,rgba(0,0,0,0.118)_0.65%,rgba(255,255,255,0.2)_1.53%,rgba(255,255,255,0.1)_2.38%,rgba(0,0,0,0.05)_3.26%,rgba(255,255,255,0.14)_5.68%,rgba(244,244,244,0)_6.96%)] after:shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] after:content-['']",
        'sm:mx-auto sm:w-[70%]'
      )}
    >
      {book.image ? (
        <Image
          src={book.image}
          alt={book.title}
          width={100}
          height={100}
          className="size-full object-cover"
        />
      ) : (
        <div className="flex aspect-[128/193] w-full items-center justify-center bg-muted p-4">
          <span className="line-clamp-3 font-medium text-muted-foreground text-xs">
            {book.title}
          </span>
        </div>
      )}
    </div>
    <div className="flex-1 sm:flex-initial">
      <p className="line-clamp-2 text-sm">{book.title}</p>
      <p className="line-clamp-2 text-muted-foreground text-sm">
        {book.author}
      </p>
    </div>
  </a>
);
