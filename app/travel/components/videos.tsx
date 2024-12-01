import { Prose } from '@/components/prose';
import { getTravelVideos } from '@/lib/youtube';
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
      <YoutubePlayer
        className="col-span-2"
        url={`https://www.youtube.com/watch?v=${latest.id}`}
        controls
      />
      <div className="flex flex-col gap-2">
        <small className="text-muted-foreground">Latest video</small>
        <h2 className="font-bold text-3xl tracking-tight">{latest.title}</h2>
        <Prose className="prose-sm">
          <p>{latest.description}</p>
        </Prose>
      </div>
      {rest.map((item) => (
        <div key={item.id} className="flex flex-col gap-4">
          <YoutubePlayer
            url={`https://www.youtube.com/watch?v=${item.id}`}
            controls
          />
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-xl tracking-tight">{item.title}</h2>
            <Prose className="prose-sm">
              <p>{item.description}</p>
            </Prose>
          </div>
        </div>
      ))}
    </section>
  );
};
