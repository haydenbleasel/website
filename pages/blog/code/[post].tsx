import type { GetStaticPaths, GetStaticProps } from 'next';
import type { FC } from 'react';
import { format, parseISO } from 'date-fns';
import slugify from 'slugify';
import Layout from '../../../components/layout';
import { getDevPost, getDevPosts } from '../../../utils/dev';
import type { DevPostDetailed } from '../../../types/dev';
import Html from '../../../components/html';

type LandingPageProps = {
  data: DevPostDetailed;
};

const LandingPage: FC<LandingPageProps> = ({ data }) => (
  <Layout title={data.title} description={data.description} noSticky>
    <div className="grid gap-8">
      <div className="grid gap-1">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {[
            `${data.comments_count} ${
              data.comments_count === 1 ? 'comment' : 'comments'
            }`,
            `${data.public_reactions_count} ${
              data.public_reactions_count === 1 ? 'reaction' : 'reactions'
            }`,
            `${data.reading_time_minutes} min read`,
          ].join(' · ')}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated at {format(parseISO(data.created_at), 'MMM dd, yyyy')}
        </p>
      </div>
      <Html className="prose dark:prose-invert" data={data.body_html} />
    </div>
  </Layout>
);

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = (params?.post as string).split('-')[0];
  const data = await getDevPost(id);

  return {
    props: {
      data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const devPosts = await getDevPosts();

  const paths = devPosts.map(({ id, title }) => ({
    params: {
      post: `${id}-${slugify(title, { lower: true, strict: true })}`,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default LandingPage;
