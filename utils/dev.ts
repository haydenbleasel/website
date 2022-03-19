import { parseISO, format } from "date-fns";
import type { DevPost, DevPostDetailed } from "../types/dev";
import type { Post } from "../types/post";

export const getDevPost = async (id: string): Promise<Post> => {
  const resp = await fetch(`https://dev.to/api/articles/${id}`);

  const data = (await resp.json()) as DevPostDetailed;

  return {
    id,
    title: data.title,
    link: data.url,
    caption: "",
    description: data.description,
    image: data.social_image,
    date: data.created_at,
    comments: data.comments_count,
    reactions: data.public_reactions_count,
    duration: data.reading_time_minutes,
    tags: data.tags,
    content: data.body_html,
  };
};

export const getDevPosts = async (): Promise<DevPost[]> => {
  const response = await fetch(
    "https://dev.to/api/articles?username=haydenbleasel"
  );
  const items = (await response.json()) as DevPost[];

  const content = await Promise.all(
    items.map(async (item) => {
      const data = await getDevPost(`${item.id}`);

      return {
        id: item.id,
        content: data.content,
      };
    })
  );

  const posts: Post[] = items.map(
    ({
      id,
      title,
      description,
      published_timestamp,
      social_image,
      url,
      comments_count,
      public_reactions_count,
      reading_time_minutes,
      tag_list,
    }) => ({
      id: `${id}`,
      title,
      description,
      caption: format(parseISO(published_timestamp), "MMMM d, yyyy"),
      image: social_image,
      link: url,
      date: published_timestamp,
      comments: comments_count,
      reactions: public_reactions_count,
      duration: reading_time_minutes,
      tags: tag_list,
      content: content.find((item) => item.id === id)?.content,
    })
  );

  return posts;
};
