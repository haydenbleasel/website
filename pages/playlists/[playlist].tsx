import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import type { FC } from "react";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import slugify from "slugify";
import Layout from "../../components/layout";
import type { SpotifyPlaylistDetailed } from "../../types/spotify/playlistDetailed";
import type { SpotifyTrack } from "../../types/spotify/track";
import { getPlaylist, getPlaylists } from "../../utils/spotify";

type PlaylistsProps = {
  data: SpotifyPlaylistDetailed;
  tracks: SpotifyTrack[];
}

const formatter = new Intl.ListFormat(
  'en-AU',
  {
    style: 'long',
    type: 'conjunction',
  }
);

const Track = ({ track }: SpotifyTrack, index: number) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [fadeIn, setFadeIn] = useState<NodeJS.Timer | null>(null);
  const [fadeOut, setFadeOut] = useState<NodeJS.Timer | null>(null);
  const [interactable, setInteractable] = useState<boolean>(false);

  const play = () => {
    if (audio || !track.preview_url) {
      return;
    }

    const newAudio = new Audio(track.preview_url);
    newAudio.volume = 0;

    newAudio.play().then(() => {
      setInteractable(true);
    }).catch((error) => {
      const message = error instanceof Error ? error.message : error as string;
      if (!message.includes('user didn\'t interact with the document first') && !message.includes('interrupted by a call to pause()')) {
        toast.error(message);
      }
    });

    const timer = setInterval(() => {
      if (newAudio.volume < 1) {
        newAudio.volume = Number((newAudio.volume + 0.05).toFixed(2));
      } else if (fadeIn) {
        clearInterval(fadeIn);
      }
    }, 100);

    setFadeIn(timer);
    setAudio(newAudio);
  }

  const stop = () => {
    if (!audio) {
      return;
    }

    const originalVolume = audio.volume;

    setAudio(null);

    if (fadeIn) {
      clearInterval(fadeIn);
    }

    setFadeOut(
      setInterval(() => {
        if (audio.volume > 0) {
          audio.volume = Number((audio.volume - 0.05).toFixed(2));
        } else if (fadeOut) {
          clearInterval(fadeOut);
        }
      }, 100)
    );

    setTimeout(() => {
      audio.pause();
    }, (originalVolume / 0.05) * 100);
  }

  return (
    <Fragment key={track.id}>
      {Boolean(index) && (
        <hr className="border-t border-gray-100" />
      )}
      <div className="relative" onMouseOver={play} onMouseLeave={stop} onFocus={play} onBlur={stop} role="button" tabIndex={0}>
        {Boolean(track.preview_url) && interactable && (
          <div className={`
            absolute left-0 top-0 h-full bg-gray-100
            ${audio ? 'w-full transition-all duration-[30s] ease-linear' : 'w-0'}
          `} />
        )}
        <div className="relative p-2 flex gap-4 items-center">
          <div className="rounded-sm overflow-hidden flex shrink-0 relative">
            <Image src={track.album.images[0].url} width={48} height={48} />
          </div>
          <div className="flex flex-col flex-1 relative">
            <p className="text-md text-gray-900 line-clamp-1">{track.name}</p>
            <p className="text-sm text-gray-500 line-clamp-1">{track.artists[0].name} &bull; {track.album.name}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

const Playlists: FC<PlaylistsProps> = ({ data, tracks }) => {
  const duration = (tracks.reduce((acc, track) => acc + track.track.duration_ms, 0) / 3600000).toFixed(1);
  const artists: { name: string; count: number }[] = [];

  tracks.forEach((track) => {
    track.track.artists.forEach((artist) => {
      const existing = artists.find(({ name }) => name === artist.name);

      if (existing) {
        existing.count += 1;
      } else if (artist.name) {
        artists.push({ name: artist.name, count: 1 });
      }
    });
  });

  const uniqueArtists = new Set(artists.map((artist) => artist.name));
  const topArtists = artists.sort((artist1, artist2) => artist2.count > artist1.count ? 1 : -1).slice(0, 5).map((artist) => artist.name);

  return (
    <Layout backHref="/playlists" backLabel="Playlists">
      <div className="grid gap-8">
        <div className="grid gap-1">
          <h1 className="text-md font-medium text-gray-900">{data.name}</h1>
          <p className="text-md font-normal text-gray-900">
            <span>{data.description.endsWith('.') ? data.description : `${data.description}.`} </span>
            <span>Featuring {formatter.format(topArtists)}.</span>
          </p>
          <p className="text-sm text-gray-500">
            {[`${duration} hours`, `${data.tracks.total} tracks`, `${uniqueArtists.size} artists`].join(' • ')}
          </p>
        </div>
        <div>
          {tracks.sort((playlist1, playlist2) => {
            if (playlist1.added_at === playlist2.added_at) {
              return 0;
            }

            return playlist2.added_at < playlist1.added_at ? 1 : -1;
          }).map(Track)}
        </div>
      </div>
    </Layout >
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = (params?.playlist as string).split('-')[0];

  const { data, tracks } = await getPlaylist(id);

  return {
    props: {
      data,
      tracks,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const playlists = await getPlaylists();

  const paths = playlists.map(({ id, name }) => ({
    params: {
      playlist: `${id}-${slugify(name, { lower: true, strict: true })}`
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default Playlists;