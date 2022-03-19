import { PrismicLink } from "@prismicio/react";
import type { GetStaticProps } from "next";
import type { FC } from "react";
import slugify from "slugify";
import Layout from "../../components/layout";
import type { SpotifyPlaylistPreview } from "../../types/spotify/playlistPreview";
import { getPlaylists } from "../../utils/spotify";

type PlaylistsProps = {
  playlists: SpotifyPlaylistPreview[];
};

const Playlists: FC<PlaylistsProps> = ({ playlists }) => (
  <Layout backHref="/" backLabel="Home">
    <div className="grid gap-8">
      <h1 className="text-md font-medium text-gray-900">Playlists</h1>
      <div>
        {playlists.map((playlist, index) => (
          <>
            {Boolean(index) && <hr className="my-2 border-t border-gray-100" />}
            <PrismicLink
              href={`/playlists/${playlist.id}-${slugify(playlist.name, {
                strict: true,
                lower: true,
              })}`}
            >
              <div className="flex gap-8" key={playlist.id}>
                <p className="flex-1 text-md text-gray-900">{playlist.name}</p>
                <p className="flex-0 w-24 text-right text-sm text-gray-400">
                  {playlist.tracks.total} tracks
                </p>
              </div>
            </PrismicLink>
          </>
        ))}
      </div>
    </div>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const playlists = await getPlaylists();

  return {
    props: {
      playlists,
    },
  };
};

export default Playlists;
