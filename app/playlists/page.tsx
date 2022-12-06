import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
import Spotify from 'spotify-web-api-node';
import { Clock, Disc, Users } from 'lucide-react';
import Divider from '@/components/divider';

// credentials are optional
const spotifyApi = new Spotify({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  // redirectUri: 'http://www.example.com/callback',
});

type PlaylistProps = {
  name: string;
  href: string;
  image: string;
  description: string;
};

const Playlist = async ({ id }: { id: string }): Promise<ReactNode> => {
  const data = await spotifyApi.getPlaylist(id);

  return (
    <Link
      href={data.body.external_urls.spotify}
      className="grid items-center py-2 no-underline sm:grid-cols-3 sm:gap-4"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="flex-0 flex items-center gap-2">
        <Image
          src={data.body.images[0].url}
          width={24}
          height={24}
          alt=""
          className="m-0 h-4 w-4 object-contain sm:h-6 sm:w-6"
        />
        {data.body.name}
      </span>
      <span className="col-span-2 flex-1 text-sm font-light text-zinc-500 line-clamp-1 dark:text-zinc-400 sm:text-right">
        <span className="flex items-center gap-4 sm:justify-end">
          <span className="flex items-center gap-1">
            <Disc size={12} className="text-zinc-500 dark:text-zinc-400" />
            <span>{data.body.tracks.total} tracks</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-zinc-500 dark:text-zinc-400" />
            {(
              data.body.tracks.items.reduce(
                (acc, track) => acc + track.track?.duration_ms,
                0
              ) / 3600000
            ).toFixed(1)}
            <span>hours</span>
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} className="text-zinc-500 dark:text-zinc-400" />
            <span>{data.body.followers.total} followers</span>
          </span>
        </span>
      </span>
    </Link>
  );
};

const Playlists = async (): Promise<ReactNode> => {
  const data = await spotifyApi.clientCredentialsGrant();
  const accessToken = data.body.access_token;
  spotifyApi.setAccessToken(accessToken);

  const playlists = await spotifyApi.getUserPlaylists('haydenbleasel');

  return (
    <main className="flex flex-col gap-6 prose-h2:m-0 prose-p:m-0">
      <h1>Playlists</h1>
      <div>
        {playlists.body.items.map((playlist, index) => (
          <Fragment key={playlist.id}>
            {index > 0 && <Divider />}
            <Playlist id={playlist.id} />
          </Fragment>
        ))}
      </div>
    </main>
  );
};

export default Playlists;
