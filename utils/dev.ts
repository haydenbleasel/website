import { parseISO, format } from "date-fns";
import type { DevPost, DevPostDetailed } from "../types/dev";
import type { Post } from "../types/post";

export const getDevPosts = async (): Promise<DevPost[]> => {
  const response = await fetch(
    "https://dev.to/api/articles?username=haydenbleasel"
  );
  const items = (await response.json()) as DevPost[];

  const content = await Promise.all(
    items.map(async (item) => {
      const resp = await fetch(`https://dev.to/api/articles/${item.id}`);

      const data = (await resp.json()) as DevPostDetailed;

      return {
        id: item.id,
        content: data.body_html,
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
