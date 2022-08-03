import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import type { KeyTextField, PrismicDocumentWithUID } from '@prismicio/types';
import { Star } from 'react-feather';
import { getPage } from '../utils/prismic';
import Layout from '../components/layout';
import type { GamesResponse } from '../utils/steam';
import { getGames } from '../utils/steam';
import List from '../components/list';

type ProjectsProps = {
  data: {
    title: KeyTextField;
    description: KeyTextField;
  };
  games: GamesResponse;
};

const Achievements: FC<GamesResponse[number]['achievements']> = ({
  total,
  achieved,
}) => (
  <span
    className={`flex items-center gap-1 text-xs sm:ml-2 ${
      achieved === total ? 'text-gold' : 'text-gray-500 dark:text-gray-400'
    }`}
  >
    <Star size={12} />
    {achieved} / {total}
  </span>
);

const Game = ({
  name,
  playtime,
  achievements,
}: ProjectsProps['games'][number]) => {
  const hours = Math.floor(playtime / 60);

  return (
    <div className="flex flex-col gap-2 py-2 sm:flex-row sm:gap-8">
      <p className="m-0 flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
        {name}
        {Boolean(achievements.total) && (
          <Achievements
            total={achievements.total}
            achieved={achievements.achieved}
          />
        )}
      </p>
      <p className="flex-0 m-0 flex w-24 text-sm text-gray-500 dark:text-gray-400 sm:justify-end">
        {playtime > 60
          ? `${hours} ${hours === 1 ? 'hour' : 'hours'}`
          : `${playtime} ${playtime === 1 ? 'minute' : 'minutes'}`}
      </p>
    </div>
  );
};

const sortByPlaytime = (
  gameA: ProjectsProps['games'][number],
  gameB: ProjectsProps['games'][number]
) => (gameB.playtime > gameA.playtime ? 1 : -1);

const Games: FC<ProjectsProps> = ({ data, games }) => {
  const totalPlaytime = games.reduce((acc, game) => acc + game.playtime, 0);
  const totalHours = Math.floor(totalPlaytime / 60);
  const totalAchievements = games.reduce(
    (acc, { achievements }) => acc + achievements.achieved,
    0
  );

  return (
    <Layout title={data.title} description={data.description}>
      <p className="animate-enter opacity-0 animation-delay-100">
        {totalHours} hours of tracked playtime and {totalAchievements}{' '}
        achievements across {games.length} games.
      </p>
      <List
        className="mt-4"
        data={[
          { title: 'All Games', items: games.sort(sortByPlaytime) },
          {
            title: 'Perfect Games',
            items: games
              .sort(sortByPlaytime)
              .filter(
                ({ achievements }) =>
                  achievements.achieved === achievements.total
              ),
          },
        ]}
        renderItem={Game}
        indexKey="id"
        searchKeys={['game.name']}
      />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const { data } = (await getPage(
    { previewData },
    'games'
  )) as PrismicDocumentWithUID;
  const games = await getGames();

  return {
    props: {
      data,
      games,
    },
  };
};

export default Games;
