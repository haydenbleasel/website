import { Prose } from '@/components/prose';
import { getTravelVideos } from '@/lib/youtube';
import { ViewAnimation } from '@/providers/view-animation';
import { YoutubePlayer } from './youtube-player';

export const Videos = async () => {
  const videos = await getTravelVideos();

  if (!videos.length) {
    return null;
  }

  const [latest, ...rest] = videos.sort((a, b) => {
    if (!a.date || !b.date) {
      return 0;
    }

    return b.date.localeCompare(a.date);
  });

  return (
    <section className="grid grid-cols-3 gap-8 p-8">
      <div className="col-span-2">
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          <YoutubePlayer
            url={`https://www.youtube.com/watch?v=${latest.id}`}
            controls
          />
        </ViewAnimation>
      </div>
      <ViewAnimation
        initial={{ opacity: 0, translateY: -8 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        delay={0.4}
      >
        <div className="flex flex-col gap-2">
          <small className="text-muted-foreground">Latest video</small>
          <h2 className="font-bold text-3xl tracking-tight">{latest.title}</h2>
          <Prose className="line-clamp-5">
            <p>{latest.description}</p>
          </Prose>
        </div>
      </ViewAnimation>
      {rest.map((item, index) => (
        <ViewAnimation
          key={item.id}
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={(index % 3) * 0.4}
        >
          <div className="flex flex-col gap-4">
            <YoutubePlayer
              url={`https://www.youtube.com/watch?v=${item.id}`}
              controls
            />
            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-xl tracking-tight">{item.title}</h2>
              <Prose className="prose-sm line-clamp-3">
                <p>{item.description}</p>
              </Prose>
            </div>
          </div>
        </ViewAnimation>
      ))}
    </section>
  );
};
