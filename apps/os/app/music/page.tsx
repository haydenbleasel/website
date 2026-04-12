import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@haydenbleasel/design-system/components/ui/card";
import { getCurrentlyPlaying, getTopArtists, getTopTracks } from "@/lib/spotify";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  description: "What I've been listening to on Spotify.",
  title: "Music | OS1",
};

const MusicPage = async () => {
  const [currentlyPlaying, topTracks, topArtists] = await Promise.all([
    getCurrentlyPlaying(),
    getTopTracks(),
    getTopArtists(),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold">Music</h1>
        <p className="text-muted-foreground">What I&apos;ve been listening to on Spotify.</p>
      </div>

      {currentlyPlaying?.is_playing && currentlyPlaying.item && (
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">Now Playing</h2>
          <Card size="sm">
            <div className="flex items-center gap-4 px-6">
              {currentlyPlaying.item.album.images[0] && (
                <Image
                  src={currentlyPlaying.item.album.images[0].url}
                  alt={currentlyPlaying.item.album.name}
                  className="size-16 rounded-lg"
                  width={64}
                  height={64}
                />
              )}
              <div>
                <p className="font-medium">{currentlyPlaying.item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {currentlyPlaying.item.artists.map((a) => a.name).join(", ")}
                </p>
              </div>
            </div>
          </Card>
        </section>
      )}

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Top Tracks</h2>
        <div className="grid gap-4">
          {topTracks.map((track, index) => (
            <a
              key={track.id}
              href={track.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card size="sm" className="transition-colors hover:bg-accent">
                <div className="flex items-center gap-4 px-6">
                  <span className="text-sm font-medium text-muted-foreground w-6 text-right">
                    {index + 1}
                  </span>
                  {track.album.images[0] && (
                    <Image
                      src={track.album.images[0].url}
                      alt={track.album.name}
                      className="size-10 rounded"
                      width={40}
                      height={40}
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-sm">{track.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {track.artists.map((a) => a.name).join(", ")}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{track.album.name}</span>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Top Artists</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topArtists.map((artist) => (
            <a
              key={artist.id}
              href={artist.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card size="sm" className="transition-colors hover:bg-accent">
                {artist.images[0] && (
                  <Image
                    src={artist.images[0].url}
                    alt={artist.name}
                    className="h-32 w-full object-cover"
                    width={128}
                    height={128}
                  />
                )}
                <CardHeader>
                  <CardTitle>{artist.name}</CardTitle>
                  {artist.genres.length > 0 && (
                    <CardDescription className="line-clamp-1">
                      {artist.genres.slice(0, 3).join(", ")}
                    </CardDescription>
                  )}
                </CardHeader>
              </Card>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MusicPage;
