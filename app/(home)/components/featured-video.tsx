import type { YoutubeProperties } from '@/app/api/cron/youtube/route';
import { YoutubePlayer } from '@/app/travel/components/youtube-player';
import { Prose } from '@/components/prose';
import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { social } from '@/lib/social';
import { ViewAnimation } from '@/providers/view-animation';
import { get } from '@vercel/edge-config';
import Image from 'next/image';
import Link from 'next/link';

export const FeaturedVideo = async () => {
  const videos = await get<YoutubeProperties>('youtube');

  if (!videos?.length) {
    return null;
  }

  const [latest] = videos;

  return (
    <Section className="grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      <div className="sm:col-span-2">
        <ViewAnimation initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <div className="relative overflow-hidden bg-dashed p-8">
            <YoutubePlayer
              url={`https://www.youtube.com/watch?v=${latest.id}`}
              controls
              className="overflow-hidden rounded-2xl border"
            />
            <div className="dashed-line-top" />
            <div className="dashed-line-left" />
            <div className="dashed-line-right" />
            <div className="dashed-line-bottom" />
          </div>
        </ViewAnimation>
      </div>
      <div>
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.4}
          className="flex h-full flex-col items-start justify-between gap-4 p-8"
        >
          <div className="flex flex-col gap-2">
            <small className="text-muted-foreground">Latest reel</small>
            <h2 className="font-bold text-3xl tracking-tight">
              {latest.title}
            </h2>
            <Prose className="line-clamp-5 text-muted-foreground">
              <p>{latest.description}</p>
            </Prose>
          </div>
          <div className="flex items-center gap-1">
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
            <Button variant="link" className="text-muted-foreground">
              <Link href="/travel">View all videos</Link>
            </Button>
          </div>
        </ViewAnimation>
      </div>
    </Section>
  );
};
