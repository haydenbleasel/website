import { PrismicLink } from "@prismicio/react";
import type { GetStaticProps } from "next";
import type { FC } from "react";
import slugify from "slugify";
import Layout from "../../components/layout";
import type { SpotifyPlaylistPreview } from "../../types/spotify/playlistPreview";
import { getPlaylists } from "../../utils/spotify";

type PlaylistsProps = {
  playlists: SpotifyPlaylistPreview[];
}

const Playlists: FC<PlaylistsProps> = ({ playlists }) => (
  <Layout backHref="/" backLabel="Home">
    <div className="grid gap-8">
      <h1 className="text-md font-medium text-gray-900">Playlists</h1>
      <div>
        {playlists.map((playlist, index) => (
          <>
            {Boolean(index) && (
              <hr className="border-t border-gray-100 my-2" />
            )}
            <PrismicLink href={`/playlists/${playlist.id}-${slugify(playlist.name, { strict: true, lower: true })}`}>
              <div className="flex gap-8" key={playlist.id}>
                <p className="text-md text-gray-900 flex-1">{playlist.name}</p>
                <p className="w-24 flex-0 text-sm text-gray-400 text-right">{playlist.tracks.total} tracks</p>
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
    }
  }
}

export default Playlists;