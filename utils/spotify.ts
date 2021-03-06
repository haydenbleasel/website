import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
});

type IArtist = {
  name: string;
  count: number;
};

async function fetchPlaylist(id: string) {
  const { body } = await spotifyApi.getPlaylistTracks(id);
  let duration = 0;

  const allArtists = body.items
    .map(({ track }) => {
      duration += track.duration_ms;
      const artistsArray = track.artists.map(({ name }) => name.split(","));

      return artistsArray.flat();
    })
    .flat();

  const sorted: IArtist[] = [];

  allArtists.forEach((artist) => {
    const currentArtist = sorted.findIndex(({ name }) => name === artist);

    if (currentArtist === -1) {
      sorted.push({
        name: artist,
        count: 1,
      });
    } else {
      sorted[currentArtist].count += 1;
    }
  });

  sorted.sort((a: IArtist, b: IArtist) => (b.count > a.count ? 1 : -1));

  const artistsMap: string[] = sorted
    .map(({ name }) => name)
    .slice(0, 8);
  
  const artists = artistsMap.slice(0, -1).join(", ") + " and " + artistsMap.slice(-1);

  return {
    id,
    duration,
    artists,
  };
}

export async function getPlaylists() {
  const grant = await spotifyApi.clientCredentialsGrant();

  spotifyApi.setAccessToken(grant.body.access_token);

  const { body } = await spotifyApi.getUserPlaylists("haydenbleasel");

  const playlistData = await Promise.all(
    body.items.map(({ id }) => fetchPlaylist(id))
  );

  const playlists = body.items.map(
    ({ external_urls, id, images, name, tracks }: ISpotifyPlaylist) => {
      const data: any = playlistData.find((pl: any) => pl.id === id);

      return {
        id,
        name,
        url: external_urls.spotify,
        image: images[0].url,
        tracks: tracks.total,
        duration: data.duration,
        artists: `Featuring ${data.artists}.`,
      };
    }
  );

  return playlists;
}
