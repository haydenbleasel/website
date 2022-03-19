import type { GetStaticProps } from "next";
import type { ChangeEventHandler, FC } from "react";
import { useState } from "react";
import type { TabProps } from "@reach/tabs";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import { format, parseISO } from "date-fns";
import type { KeyTextField, PrismicDocumentWithUID, SliceZone } from "@prismicio/types";
import { Search } from "react-feather";
import slugify from "slugify";
import { PrismicLink } from "@prismicio/react";
import Layout from "../../components/layout";
import { getMediumPosts } from "../../utils/medium";
import { getDevPosts } from "../../utils/dev";
import type { Post } from "../../types/post";
import { getPages } from "../../utils/prismic";
import tailwindConfig from "../../tailwind.config";

type WorkData = {
  mediumPosts: Post[];
  devPosts: Post[];
  caseStudies: Post[];
}

const sortByDate = (postA: Post, postB: Post) => (
  parseISO(postA.date) > parseISO(postB.date) ? -1 : 1
);

const PostLink: FC<Post> = ({ id, title, date }, index) => (
  <>
    {Boolean(index) && (
      <hr className="border-t border-gray-100 my-2" />
    )}
    <PrismicLink href={`/blog/${id}-${slugify(title, { lower: true, strict: true })}`}>
      <div className="flex justify-between gap-8">
        <p className="text-md text-gray-900 flex-1">{title}</p>
        <p className="text-sm text-gray-500 w-24 flex-0 text-right">{format(parseISO(date), 'MMM dd, yyyy')}</p>
      </div>
    </PrismicLink>
  </>
);

const CustomTab: FC<TabProps & { isSelected?: boolean; }> = ({ isSelected, ...props }) => (
  <Tab
    className={`relative whitespace-nowrap text-sm ${isSelected ? 'text-gray-900 after:content-[""] after:block after:absolute after:-bottom-[13px] after:w-full after:h-[1px] after:bg-gray-900' : 'text-gray-500'}`}
    {...props}
  />
)


const Work: FC<WorkData> = ({ mediumPosts, devPosts, caseStudies }) => {
  const allPosts = [...mediumPosts, ...devPosts, ...caseStudies];
  const [results, setResults] = useState<string[]>(allPosts.map(({ id }) => id));

  const handleSearch: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const { value } = event.currentTarget
    // Dynamically load fuse.js
    const Fuse = (await import(
      /* webpackChunkName: "fuse" */
      'fuse.js'
    )).default;
    const fuse = new Fuse(allPosts, {
      keys: ['title', 'date', 'content'],
    });

    const searchResults = fuse.search(value);

    setResults(searchResults.map(({ item }) => item.id));
  };

  const filterBySearch = (post: Post) => results.length ? results.includes(post.id) : true;

  return (
    <Layout backHref="/" backLabel="Home">
      <div className="grid gap-8">
        <h1 className="text-md font-medium text-gray-900">Blog</h1>
        <Tabs className="grid gap-8">

          <div className="grid gap-3">
            <div className="flex items-center space-between gap-8">
              <TabList className="flex gap-4 flex-1">
                <CustomTab>All</CustomTab>
                <CustomTab>Case Studies</CustomTab>
                <CustomTab>Code</CustomTab>
                <CustomTab>Other</CustomTab>
              </TabList>
              <div className="relative flex-0">
                <div className="absolute left-0 top-1/2 -translate-y-1/2">
                  <Search size={14} color={tailwindConfig.theme.colors.gray[400]} />
                </div>
                <input
                  className="text-sm px-[18px] w-full"
                  type="text"
                  placeholder="Search"
                  onChange={handleSearch}
                />
              </div>
            </div>
            <hr className="border-t border-gray-100" />
          </div>

          <TabPanels>
            <TabPanel>
              {[...mediumPosts, ...devPosts, ...caseStudies].filter(filterBySearch).sort(sortByDate).map(PostLink)}
            </TabPanel>
            <TabPanel>
              {caseStudies.sort(sortByDate).filter(filterBySearch).map(PostLink)}
            </TabPanel>
            <TabPanel>
              {devPosts.sort(sortByDate).filter(filterBySearch).map(PostLink)}
            </TabPanel>
            <TabPanel>
              {mediumPosts.sort(sortByDate).filter(filterBySearch).map(PostLink)}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const mediumPosts = await getMediumPosts();
  const devPosts = await getDevPosts();
  const caseStudies = await getPages('case-study') as PrismicDocumentWithUID<{
    title: KeyTextField;
    description: KeyTextField;
    slices: SliceZone;
  }>[];

  return {
    props: {
      mediumPosts,
      devPosts,
      caseStudies: caseStudies.map((caseStudy) => ({
        id: caseStudy.uid,
        title: caseStudy.data.description,
        date: caseStudy.first_publication_date,
      })),
    }
  }
};

export default Work;