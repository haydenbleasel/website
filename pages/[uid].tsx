import type { GetStaticPaths, GetStaticProps } from "next";
import type { FC } from "react";
import type {
  ImageFieldImage,
  KeyTextField,
  PrismicDocumentWithUID,
  RichTextField,
} from "@prismicio/types";
import type { JSXMapSerializer } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Layout from "../components/layout";
import { getPage, getPages } from "../utils/prismic";
import { components } from "./_app";

type LandingPageProps = {
  data: {
    title: KeyTextField;
    description: KeyTextField;
    cover: ImageFieldImage;
    content: RichTextField;
  };
  last_publication_date: string;
};

const landingPageComponents: JSXMapSerializer = {
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
  <Layout backHref="/" backLabel="Home">
    <div className="grid gap-8">
      <div className="grid gap-1">
        <h1 className="text-md font-medium text-gray-900 dark:text-white">
          {data.title}
        </h1>
        {data.description && (
          <p className="text-md font-normal text-gray-900">
            {data.description}
          </p>
        )}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated at{" "}
          {format(parseISO(last_publication_date), "MMM dd, yyyy")}{" "}
        </p>
      </div>
      {data.cover.url && (
        <div className="flex overflow-hidden rounded-sm">
          <Image
            src={data.cover.url}
            alt={data.cover.alt ?? ""}
            width={480}
            height={
              480 * (data.cover.dimensions.height / data.cover.dimensions.width)
            }
            priority
          />
        </div>
      )}
      <div>
        <PrismicRichText
          field={data.content}
          components={landingPageComponents}
        />
      </div>
    </div>
  </Layout>
);

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data, last_publication_date } = (await getPage(
    params?.uid as string,
    "landing-page"
  )) as PrismicDocumentWithUID;

  return {
    props: {
      data,
      last_publication_date,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = (await getPages("landing-page")) as PrismicDocumentWithUID[];

  const paths = pages.map(({ uid }) => ({
    params: {
      uid,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default LandingPage;
