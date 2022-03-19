import type { GetStaticPaths, GetStaticProps } from "next";
import type { FC } from "react";
import type {
  KeyTextField,
  PrismicDocumentWithUID,
  RichTextField,
  SliceZone,
} from "@prismicio/types";
import { format, parseISO } from "date-fns";
import type { JSXMapSerializer } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import Layout from "../../../components/layout";
import { getPage, getPages } from "../../../utils/prismic";
import { components } from "../../_app";

type LandingPageProps = {
  data: {
    title: KeyTextField;
    description: KeyTextField;
    slices1: SliceZone;
  };
  last_publication_date: string;
};

const blogComponents: JSXMapSerializer = {
  ...components,
  paragraph: ({ children, key }) => (
    <p
      key={key}
      className="text-normal mb-4 indent-8 text-md text-gray-900 dark:text-white"
    >
      {children}
    </p>
  ),
};

const LandingPage: FC<LandingPageProps> = ({ data, last_publication_date }) => (
  <Layout backHref="/blog" backLabel="Blog">
    <div className="grid gap-8">
      <div className="grid gap-1">
        <h1 className="text-md font-medium text-gray-900">{data.title}</h1>
        <p className="text-sm text-gray-500">
          Last updated at{" "}
          {format(parseISO(last_publication_date), "MMM dd, yyyy")}{" "}
        </p>
      </div>
      <div className="prose">
        {data.slices1.map((slice, index) => {
          if (slice.slice_type === "rich_text") {
            return (
              <PrismicRichText
                key={index}
                field={slice.primary.content as RichTextField}
                components={blogComponents}
              />
            );
          }

          return undefined;
        })}
      </div>
    </div>
  </Layout>
);

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data, last_publication_date } = (await getPage(
    params?.post as string,
    "case-study"
  )) as PrismicDocumentWithUID<LandingPageProps["data"]>;

  return {
    props: {
      data,
      last_publication_date,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const caseStudies = (await getPages("case-study")) as PrismicDocumentWithUID<
    LandingPageProps["data"]
  >[];

  const paths = caseStudies.map(({ uid }) => ({
    params: {
      post: uid,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default LandingPage;
