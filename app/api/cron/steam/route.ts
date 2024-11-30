import { env } from '@/lib/env';
import { parseError } from '@/lib/utils';
import { updateEdgeConfig } from '@/lib/vercel';

export const maxDuration = 300;
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export type GameProperties = {
  id: number;
  image: string;
  playtime: number;
  name: string;
  completeAchievements: number;
};

type GetRecentlyPlayedGamesResponse = {
  response?: {
    total_count: number;
    games?: {
      appid: number;
      name: string;
      playtime_2weeks: number;
      playtime_forever: number;
      img_icon_url: string;
      playtime_windows_forever: number;
      playtime_mac_forever: number;
      playtime_linux_forever: number;
    }[];
  };
};

type AppDetailsResponse = Record<
  string,
  {
    success: boolean;
    data: {
      type: string;
      name: string;
      steam_appid: number;
      required_age: number;
      is_free: boolean;
      controller_support: string;
      detailed_description: string;
      about_the_game: string;
      short_description: string;
      supported_languages: string;
      header_image: string;
      capsule_image: string;
      capsule_imagev5: string;
      website: never;
      pc_requirements: {
        minimum: string;
        recommended: string;
      };
      mac_requirements: {
        minimum: string;
        recommended: string;
      };
      linux_requirements: {
        minimum: string;
        recommended: string;
      };
      legal_notice: string;
      developers: string[];
      publishers: string[];
      price_overview: {
        currency: string;
        initial: number;
        final: number;
        discount_percent: number;
        initial_formatted: string;
        final_formatted: string;
      };
      packages: number[];
      package_groups: {
        name: string;
        title: string;
        description: string;
        selection_text: string;
        save_text: string;
        display_type: number;
        is_recurring_subscription: string;
        subs: {
          packageid: number;
          percent_savings_text: string;
          percent_savings: number;
          option_text: string;
          option_description: string;
          can_get_free_license: string;
          is_free_license: boolean;
          price_in_cents_with_discount: number;
        }[];
      }[];
      platforms: {
        windows: boolean;
        mac: boolean;
        linux: boolean;
      };
      categories: {
        id: number;
        description: string;
      }[];
      genres: {
        id: string;
        description: string;
      }[];
      screenshots: {
        id: number;
        path_thumbnail: string;
        path_full: string;
      }[];
      movies: {
        id: number;
        name: string;
        thumbnail: string;
        webm: {
          '480': string;
          max: string;
        };
        mp4: {
          '480': string;
          max: string;
        };
        highlight: boolean;
      }[];
      recommendations: {
        total: number;
      };
      achievements: {
        total: number;
        highlighted: {
          name: string;
          path: string;
        }[];
      };
      release_date: {
        coming_soon: boolean;
        date: string;
      };
      support_info: {
        url: string;
        email: string;
      };
      background: string;
      background_raw: string;
      content_descriptors: {
        ids: never[];
        notes: never;
      };
    };
  }
>;

type GetUserStatsForGameResponse = {
  playerstats: {
    steamID: string;
    gameName: string;
    achievements: {
      name: string;
      achieved: number;
    }[];
  };
};

const getRecentlyPlayedGames = async () => {
  const response = await fetch(
    `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${env.STEAM_API_KEY}&steamid=${env.STEAM_ID}&format=json`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 0,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      'Invalid response format from Steam API: getRecentlyPlayedGames'
    );
  }

  try {
    const data = (await response.json()) as GetRecentlyPlayedGamesResponse;

    if (!data.response?.games) {
      throw new Error('Invalid response format from Steam API');
    }

    return data.response.games[0];
  } catch {
    throw new Error(
      'Cannot parse response from Steam API: getRecentlyPlayedGames'
    );
  }
};

const getUserStatsForGame = async (appId: number) => {
  const response = await fetch(
    `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appId}&key=${env.STEAM_API_KEY}&steamid=${env.STEAM_ID}&format=json`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 0,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      'Invalid response format from Steam API: getUserStatsForGame'
    );
  }

  try {
    return (await response.json()) as GetUserStatsForGameResponse;
  } catch {
    throw new Error(
      'Cannot parse response from Steam API: getUserStatsForGame'
    );
  }
};

export const GET = async (): Promise<Response> => {
  try {
    const data = await getRecentlyPlayedGames();

    const userStatsData = await getUserStatsForGame(data.appid);
    const complete = userStatsData.playerstats.achievements.filter(
      (achievement) => achievement.achieved === 1
    ).length;

    const properties: GameProperties = {
      id: data.appid,
      image: `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${data.appid}/header.jpg`,
      playtime: data.playtime_forever,
      name: data.name,
      completeAchievements: complete,
    };

    await updateEdgeConfig('steam', properties);

    return new Response(undefined, { status: 204 });
  } catch (error) {
    const message = parseError(error);

    return new Response(message, { status: 500 });
  }
};
