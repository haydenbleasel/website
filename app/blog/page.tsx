import { basehub } from 'basehub';
import { Pump } from 'basehub/react-pump';

export const generateMetadata = async () => {
  const { blog } = await basehub({ cache: 'no-store' }).query({
    blog: {
      metaTitle: true,
      metaDescription: true,
    },
  });

  return {
    title: blog.metaTitle,
    description: blog.metaDescription,
  };
};

const Blog = () => (
  <Pump
    queries={[
      {
        __typename: true,
        blog: {
          posts: {
            items: {
              _title: true,
              content: {
                plainText: true,
                readingTime: true,
              },
              date: true,
            },
          },
        },
      },
    ]}
  >
    {/* biome-ignore lint/suspicious/useAwait: Server Actions must be async */}
    {async ([data]) => {
      'use server';

      if (!data.blog.posts.items.length) {
        return <div>No posts found</div>;
      }

      const [firstPost, ...restPosts] = data.blog.posts.items;

      return (
        <div className="container mx-auto px-4 py-12 transition-all sm:px-0">
          <article className="mb-12 grid grid-cols-1 gap-8 overflow-hidden rounded-2xl border bg-backdrop/10 md:grid-cols-2">
            <div className="flex flex-col justify-between p-6">
              <div>
                <small className="text-muted-foreground">
                  {new Date(firstPost.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </small>
                <h2 className="text-3xl font-bold mt-2 mb-4">
                  {firstPost._title}
                </h2>
                <p className="text-muted-foreground">
                  {firstPost.content?.plainText.slice(0, 250)}...
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {firstPost.content?.readingTime} min read
                </span>
              </div>
            </div>
            <div className="hidden aspect-video bg-backdrop/10 md:block" />
          </article>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restPosts.map((post) => (
              <div
                key={post._title}
                className="border rounded-lg p-6 flex flex-col"
              >
                <small className="text-muted-foreground">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </small>
                <h3 className="text-xl font-semibold mt-2 mb-3">
                  {post._title}
                </h3>
                <p className="text-muted-foreground flex-grow">
                  {post.content.plainText.slice(0, 150)}...
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {post.content.readingTime} min read
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }}
  </Pump>
);

export default Blog;
