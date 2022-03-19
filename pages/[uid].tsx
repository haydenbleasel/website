import type { GetStaticPaths, GetStaticProps } from "next";
import type { FC } from "react";
import type {
  ImageFieldImage,
  KeyTextField,
  PrismicDocumentWithUID,
  RichTextField,
} from "@prismicio/types";
import { PrismicRichText } from "@prismicio/react";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Layout from "../components/layout";
import { getPage, getPages } from "../utils/prismic";

type LandingPageProps = {
  data: {
    title: KeyTextField;
    description: KeyTextField;
    cover: ImageFieldImage;
    content: RichTextField;
  };
  last_publication_date: string;
};

const LandingPage: FC<LandingPageProps> = ({ data, last_publication_date }) => (
  <Layout backHref="/" backLabel="Home">
    <div className="grid gap-8">
      <div className="grid gap-1">
        <h1 className="text-md font-medium text-gray-900">{data.title}</h1>
        {data.description && (
          <p className="text-md font-normal text-gray-900">
            {data.description}
          </p>
        )}
        <p className="text-sm text-gray-500">
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
      <div className="indent-8">
        <PrismicRichText field={data.content} />
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
