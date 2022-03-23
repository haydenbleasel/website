import { PrismicLink } from "@prismicio/react";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useEffect, Fragment, useState } from "react";
import toast from "react-hot-toast";
import Layout from "../components/layout";
import Search from "../components/search";
import type { Post } from "../types/post";

const PostLink: FC<Post> = ({ id, title, date, link }, index) => (
  <Fragment key={id}>
    {Boolean(index) && (
      <hr className="my-2 border-t border-gray-100 dark:border-gray-800" />
    )}
    <div className="fill-anchor">
      <PrismicLink href={link}>
        <div className="flex justify-between gap-8">
          <p className="flex-1 text-md text-gray-900 dark:text-white">
            {title}
          </p>
          <p className="flex-0 w-24 text-right text-sm text-gray-500 dark:text-gray-400">
            {format(parseISO(date), "MMM dd, yyyy")}
          </p>
        </div>
      </PrismicLink>
    </div>
  </Fragment>
);

type BlogTemplateData = {
  posts: Post[];
};

const BlogTemplate: FC<BlogTemplateData> = ({ posts }) => {
  const [results, setResults] = useState<string[]>([]);
  const { asPath } = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const filterPosts = async (term: string) => {
      const Fuse = (
        await import(
          /* webpackChunkName: "fuse" */
          "fuse.js"
        )
      ).default;
      const fuse = new Fuse(posts, {
        keys: ["title", "date", "content"],
      });

      const searchResults = fuse.search(term);

      setResults(searchResults.map(({ item }) => item.id));
    };

    if (!search) {
      setResults([]);
      return;
    }

    filterPosts(search).catch((error) => {
      const message =
        error instanceof Error ? error.message : (error as string);

      toast.error(message);
    });
  }, [posts, search]);

  const filterBySearch = (post: Post) =>
    results.length ? results.includes(post.id) : true;

  const tabs = [
    { label: "All", link: "/blog" },
    { label: "Work", link: "/blog/work" },
    { label: "Code", link: "/blog/code" },
    // { label: 'Other', link: '/blog/other' },
  ];

  return (
    <Layout backHref="/" backLabel="Home">
      <div className="grid gap-8">
        <h1 className="text-md font-medium text-gray-900 dark:text-white">
          Blog
        </h1>
        <div className="grid gap-8">
          <div className="grid gap-2">
            <div className="space-between flex items-center gap-8">
              <div className="flex flex-1 gap-4">
                {tabs.map((tab) => (
                  <PrismicLink href={tab.link} key={tab.label}>
                    <span
                      className={`relative whitespace-nowrap text-sm ${
                        tab.link === asPath
                          ? 'text-gray-900 after:absolute after:-bottom-[14.5px] after:block after:h-[1px] after:w-full after:bg-gray-900 after:content-[""] dark:text-white dark:after:bg-white'
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {tab.label}
                    </span>
                  </PrismicLink>
                ))}
              </div>
              <Search value={search} onChange={setSearch} />
            </div>
            <hr className="border-t border-gray-100 dark:border-gray-800" />
          </div>

          <div>
            {posts
              .filter(filterBySearch)
              .sort((postA: Post, postB: Post) =>
                parseISO(postA.date) > parseISO(postB.date) ? -1 : 1
              )
              .map(PostLink)}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogTemplate;
