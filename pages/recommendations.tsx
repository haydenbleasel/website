import { PrismicLink } from "@prismicio/react";
import type {
  KeyTextField,
  LinkField,
  PrismicDocumentWithUID,
} from "@prismicio/types";
import type { GetStaticProps } from "next";
import type { ChangeEventHandler, FC } from "react";
import { Fragment, useState } from "react";
import { Search } from "react-feather";
import Layout from "../components/layout";
import tailwindConfig from "../tailwind.config";
import { getPage } from "../utils/prismic";

type RecommendationsData = {
  data: {
    tools: Recommendation[];
    freelancers: Recommendation[];
  };
};

type Recommendation = {
  name: KeyTextField;
  description: KeyTextField;
  link: LinkField;
};

const PostLink = (
  { name, description, link }: Recommendation,
  index: number
) => (
  <Fragment key={index}>
    {Boolean(index) && <hr className="my-2 border-t border-gray-100" />}
    <PrismicLink field={link}>
      <div className="flex flex-1 justify-between gap-8">
        <p className="flex-0 w-32 text-md text-gray-900">{name}</p>
        <p className="flex-1 text-right text-sm text-gray-500">{description}</p>
      </div>
    </PrismicLink>
  </Fragment>
);

const Recommendations: FC<RecommendationsData> = ({ data }) => {
  const [results, setResults] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: "Tools", data: data.tools },
    { label: "Freelancers", data: data.freelancers },
  ];

  const handleSearch: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const { value } = event.currentTarget;

    const Fuse = (
      await import(
        /* webpackChunkName: "fuse" */
        "fuse.js"
      )
    ).default;
    const fuse = new Fuse(tabs[activeTab].data, {
      keys: ["title", "date", "content"],
    });

    const searchResults = fuse.search(value);

    setResults(searchResults.map(({ item }) => item.name ?? ""));
  };

  const filterBySearch = (post: RecommendationsData["data"]["tools"][number]) =>
    results.length && post.name ? results.includes(post.name) : true;

  return (
    <Layout backHref="/" backLabel="Home">
      <div className="grid gap-8">
        <h1 className="text-md font-medium text-gray-900">Recommendations</h1>
        <div className="grid gap-8">
          <div className="grid gap-2">
            <div className="space-between flex items-center gap-8">
              <div className="flex flex-1 gap-4">
                {tabs.map((tab, index) => (
                  <div
                    className="text-md font-normal text-gray-700 transition-all hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-500"
                    key={tab.label}
                  >
                    <span
                      onClick={() => setActiveTab(index)}
                      onKeyDown={() => setActiveTab(index)}
                      role="button"
                      tabIndex={0}
                      className={`relative whitespace-nowrap text-sm ${
                        index === activeTab
                          ? 'text-gray-900 after:absolute after:-bottom-[14.5px] after:block after:h-[1px] after:w-full after:bg-gray-900 after:content-[""]'
                          : "text-gray-500"
                      }`}
                    >
                      {tab.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex-0 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2">
                  <Search
                    size={14}
                    color={tailwindConfig.theme.colors.gray[400]}
                  />
                </div>
                <input
                  className="w-full px-[18px] text-sm"
                  type="text"
                  placeholder="Search"
                  onChange={handleSearch}
                />
              </div>
            </div>
            <hr className="border-t border-gray-100" />
          </div>

          <div>{tabs[activeTab].data.filter(filterBySearch).map(PostLink)}</div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = (await getPage("recommendations")) as PrismicDocumentWithUID;

  return {
    props: {
      data,
    },
  };
};

export default Recommendations;
