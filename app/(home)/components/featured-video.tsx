import type { YoutubeProperties } from '@/app/api/cron/youtube/route';
import { YoutubePlayer } from '@/app/travel/components/youtube-player';
import { ThirdsSection } from '@/components/sections/thirds';
import { get } from '@vercel/edge-config';

export const FeaturedVideo = async () => {
  const videos = await get<YoutubeProperties>('youtube');

  if (!videos?.length) {
    return null;
  }

  const [latest] = videos;

  return (
    <ThirdsSection
      title={latest.title}
      description={latest.description}
      caption="Latest video"
      reverse
      buttons={[
        {
          label: 'Watch on YouTube',
          href: `https://www.youtube.com/watch?v=${latest.id}`,
        },
        {
          label: 'View all videos',
          href: '/travel',
        },
      ]}
    >
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
    </ThirdsSection>
  );
};
