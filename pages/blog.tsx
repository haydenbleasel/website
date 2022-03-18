import type { GetStaticProps } from "next";
import type { FC } from "react";
import type { TabProps } from "@reach/tabs";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import { format, parseISO } from "date-fns";
import type { KeyTextField, PrismicDocumentWithUID, SliceZone } from "@prismicio/types";
import Layout from "../components/layout";
import { getMediumPosts } from "../utils/medium";
import { getDevPosts } from "../utils/dev";
import type { Post } from "../types/post";
import { getPages } from "../utils/prismic";

type WorkData = {
  mediumPosts: Post[];
  devPosts: Post[];
  caseStudies: Post[];
}

const sortByDate = (postA: Post, postB: Post) => (
  parseISO(postA.date) > parseISO(postB.date) ? -1 : 1
);

const PostLink: FC<Post> = ({ title, date }, index) => (
  <>
    {Boolean(index) && (
      <hr className="border-t border-gray-100 my-2" />
    )}
    <div className="flex justify-between gap-8">
      <p className="text-md text-gray-900 flex-1">{title}</p>
      <p className="text-sm text-gray-500 w-24 flex-0 text-right">{format(parseISO(date), 'MMM dd, yyyy')}</p>
    </div>
  </>
);

const CustomTab: FC<TabProps & { isSelected?: boolean; }> = ({ isSelected, ...props }) => (
  <Tab
    className={`relative ${isSelected ? 'text-gray-900 after:content-[""] after:block after:absolute after:-bottom-[13px] after:w-full after:h-[1px] after:bg-gray-900' : 'text-gray-500'}`}
    {...props}
  />
)


const Work: FC<WorkData> = ({ mediumPosts, devPosts, caseStudies }) => (
  <Layout backHref="/" backLabel="Home">
    <div className="grid gap-8">
      <h1 className="text-md font-medium">Blog</h1>
      <Tabs className="grid gap-8">

        <div className="grid gap-3">
          <TabList className="flex gap-4">
            <CustomTab>All</CustomTab>
            <CustomTab>Projects</CustomTab>
            <CustomTab>Case Studies</CustomTab>
            <CustomTab>Code</CustomTab>
            <CustomTab>Other</CustomTab>
          </TabList>
          <hr className="border-t border-gray-100" />
        </div>

        <TabPanels>
          <TabPanel>
            {[...mediumPosts, ...devPosts, ...caseStudies].sort(sortByDate).map(PostLink)}
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            {caseStudies.sort(sortByDate).map(PostLink)}
          </TabPanel>
          <TabPanel>
            {devPosts.sort(sortByDate).map(PostLink)}
          </TabPanel>
          <TabPanel>
            {mediumPosts.sort(sortByDate).map(PostLink)}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </Layout>
);

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
        title: caseStudy.data.description,
        date: caseStudy.first_publication_date,
      })),
    }
  }
};

export default Work;