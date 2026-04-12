import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@haydenbleasel/design-system/components/ui/card";
import { getPublishedPosts } from "@/lib/typefully";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "My recent posts on X, managed via Typefully.",
  title: "Posts | OS1",
};

const formatNumber = (num = 0) => {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

const PostsPage = async () => {
  const posts = await getPublishedPosts();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="Posts" description="My recent posts on X, managed via Typefully." />

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id} size="sm">
            <CardHeader>
              <CardTitle className="whitespace-pre-wrap leading-relaxed font-normal text-sm">
                {post.text_first_tweet}
              </CardTitle>
              {post.num_tweets > 1 && (
                <CardDescription>Thread ({post.num_tweets} posts)</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span>{formatNumber(post.num_impressions)} impressions</span>
                <span>{formatNumber(post.num_likes)} likes</span>
                <span>{formatNumber(post.num_retweets)} retweets</span>
                <span>{formatNumber(post.num_replies)} replies</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                {post.published_on && (
                  <span className="text-xs text-muted-foreground">
                    {new Date(post.published_on).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                )}
                {post.publish_url && (
                  <a
                    href={post.publish_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-foreground hover:text-muted-foreground"
                  >
                    View on X
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
