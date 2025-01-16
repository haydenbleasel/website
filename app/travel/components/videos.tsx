import type { YoutubeProperties } from '@/app/api/cron/youtube/route';
import { Prose } from '@/components/prose';
import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { social } from '@/lib/social';
import { cn } from '@/lib/utils';
import { ViewAnimation } from '@/providers/view-animation';
import { get } from '@vercel/edge-config';
import Image from 'next/image';
import { YoutubePlayer } from './youtube-player';

export const Videos = async () => {
  const videos = await get<YoutubeProperties>('youtube');

  if (!videos?.length) {
    return null;
  }

  const [latest, ...rest] = videos;

  return (
    <Section className="grid sm:grid-cols-3">
      <div className="sm:col-span-2 sm:border-b">
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          className={cn('px-4 py-8', 'sm:px-8')}
        >
          <YoutubePlayer
            url={`https://www.youtube.com/watch?v=${latest.id}`}
            controls
          />
        </ViewAnimation>
      </div>
      <div className="border-b border-l">
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          className={cn('h-full px-4 py-8', 'sm:px-8')}
          delay={0.4}
        >
          <div className="flex h-full flex-col items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <small className="text-muted-foreground">Latest video</small>
              <h2 className="font-bold text-3xl tracking-tight">
                {latest.title}
              </h2>
              <Prose className="line-clamp-5">
                <p>{latest.description}</p>
              </Prose>
            </div>
            <Button asChild variant="outline">
              <a
                href={`https://www.youtube.com/watch?v=${latest.id}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Image
                  src={social.youtube.icon}
                  alt={social.youtube.label}
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
                Watch on YouTube
              </a>
            </Button>
          </div>
        </ViewAnimation>
      </div>
      {rest.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            'border-t',
            index < 3 && 'sm:border-t-0',
            index % 3 !== 0 && 'border-l'
          )}
        >
          <ViewAnimation
            initial={{ opacity: 0, translateY: -8 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            delay={(index % 3) * 0.4}
          >
            <div className={cn('flex flex-col gap-4 px-4 py-8', 'sm:px-8')}>
              <YoutubePlayer
                url={`https://www.youtube.com/watch?v=${item.id}`}
                controls
              />
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-xl tracking-tight">
                  {item.title}
                </h2>
                <Prose className="prose-sm line-clamp-3">
                  <p>{item.description}</p>
                </Prose>
              </div>
            </div>
          </ViewAnimation>
        </div>
      ))}
      {new Array(3 - (rest.length % 3)).fill(null).map((_, index) => (
        <div
          key={index}
          className="hidden border-t border-l bg-dashed sm:block"
        />
      ))}
    </Section>
  );
};
