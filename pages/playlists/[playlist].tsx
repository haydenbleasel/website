import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import type { FC } from "react";
import slugify from "slugify";
import Layout from "../../components/layout";
import type { SpotifyPlaylistDetailed } from "../../types/spotify/playlistDetailed";
import type { SpotifyTrack } from "../../types/spotify/track";
import { getPlaylist, getPlaylists } from "../../utils/spotify";

type PlaylistsProps = {
  data: SpotifyPlaylistDetailed;
  tracks: SpotifyTrack[];
}

const Playlists: FC<PlaylistsProps> = ({ data, tracks }) => {
  const duration = (tracks.reduce((acc, track) => acc + track.track.duration_ms, 0) / 3600000).toFixed(1);
  const artists = new Set();

  tracks.forEach((track) => {
    track.track.artists.forEach((artist) => {
      artists.add(artist.name);
    });
  });

  return (
    <Layout>
      <div className="grid gap-8">
        <div className="grid gap-1">
          <h1 className="text-md font-medium text-gray-900">{data.name}</h1>
          <p className="text-sm text-gray-500">{duration} hours &bull; {data.tracks.total} tracks &bull; {artists.size} artists</p>
        </div>
        <div>
          {tracks.map((track, index) => (
            <>
              {Boolean(index) && (
                <hr className="border-t border-gray-100 my-2" />
              )}
              <div className="flex gap-4 items-center" key={track.track.id}>
                <div className="rounded-sm overflow-hidden flex shrink-0">
                  <Image src={track.track.album.images[0].url} width={48} height={48} />
                </div>
                <div className="flex flex-col flex-1">
                  <p className="text-md text-gray-900 line-clamp-1">{track.track.name}</p>
                  <p className="text-sm text-gray-500 line-clamp-1">{track.track.artists[0].name} &bull; {track.track.album.name}</p>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </Layout>
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