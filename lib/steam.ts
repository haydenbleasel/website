type SteamGame = {
  appid: number;
  name: string;
  playtime_forever: number;
  img_icon_url: string;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
  rtime_last_played: number;
};

type PlayerStatsProps = {
  playerstats:
    | {
        error: string;
        success: false;
      }
    | {
        steamID: string;
        gameName: string;
        achievements: AchievementProps[] | undefined;
        success: true;
      };
};

type AchievementProps = {
  apiname: string;
  achieved: number;
  unlocktime: number;
};

export type SteamGameProps = {
  id: SteamGame['appid'];
  name: SteamGame['name'];
  playtime: SteamGame['playtime_forever'];
  icon: SteamGame['img_icon_url'];
  lastPlayed: string;
  achievements: {
    total: number;
    achieved: number;
  };
};

const getSteamAchievements = async (
  appid: number
): Promise<AchievementProps[]> => {
  const response = await fetch(
    `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?key=${
      process.env.STEAM_API_KEY ?? ''
    }&steamid=${process.env.STEAM_ID ?? ''}&appid=${appid}`
  );

  const data = (await response.json()) as PlayerStatsProps;

  if (!data.playerstats.success) {
    return [];
  }

  return data.playerstats.achievements ?? [];
};

const getSteamGames = async (): Promise<SteamGameProps[]> => {
  const response = await fetch(
    `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${
      process.env.STEAM_API_KEY ?? ''
    }&steamid=${process.env.STEAM_ID ?? ''}&include_appinfo=1`
  );

  const data = (await response.json()) as {
    response: {
      games: SteamGame[];
    };
  };

  const games = data.response.games
    .filter(({ playtime_forever }) => Boolean(playtime_forever))
    .map(async (game) => {
      const achievements = await getSteamAchievements(game.appid);

      return {
        id: game.appid,
        name: game.name,
        playtime: game.playtime_forever,
        icon: `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`,
        lastPlayed: new Date(game.rtime_last_played * 1000).toISOString(),
        achievements: {
          total: achievements.length,
          achieved: achievements.filter(({ achieved }) => achieved).length,
        },
      };
    });

  return Promise.all(games);
};

export default getSteamGames;
