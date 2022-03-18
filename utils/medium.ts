import Parser from "rss-parser";
import { JSDOM } from "jsdom";
import { parseISO, format } from "date-fns";
import type { MediumPost } from "../types/medium";
import type { Post } from "../types/post";

export const getMediumPosts = async (): Promise<Post[]> => {
  const parser = new Parser();

  const { items } = await parser.parseURL(
    "https://medium.com/feed/@haydenbleasel"
  );

  const posts: MediumPost[] = (items as MediumPost[]).map((item) => {
    const content = item["content:encoded"];
    const { document } = new JSDOM(content).window;

    return {
      id: item.guid,
      title: item.title,
      description: document.querySelector("h4")?.textContent ?? "",
      caption: format(parseISO(item.isoDate), "MMMM d, yyyy"),
      image:
        document.querySelector("img")?.src.replace("max/1024", "max/3840") ??
        "",
      link: item.link,
      date: item.isoDate,
      tags: item.categories,
      content,
    };
  });

  return posts;
};
