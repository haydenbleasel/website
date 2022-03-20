import type { GetStaticPaths, GetStaticProps } from "next";
import type { FC } from "react";
import type {
  ImageField,
  KeyTextField,
  PrismicDocumentWithUID,
  RichTextField,
  Slice,
  SliceZone as SliceZoneProps,
} from "@prismicio/types";
import { format, parseISO } from "date-fns";
import type {
  JSXMapSerializer,
  SliceComponentProps,
  SliceComponentType,
} from "@prismicio/react";
import { SliceZone, PrismicRichText } from "@prismicio/react";
import Image from "next/image";
import { ReactCompareSlider } from "react-compare-slider";
import Layout from "../../../components/layout";
import { getPage, getPages } from "../../../utils/prismic";
import { components } from "../../_app";

type WorkPostProps = {
  data: {
    title: KeyTextField;
    description: KeyTextField;
    slices1: SliceZoneProps;
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

const RichTextSlice: FC<
  SliceComponentProps<{
    slice_type: "rich_text";
    primary: {
      content: RichTextField;
    };
  }>
> = ({ slice }) => (
  <PrismicRichText field={slice.primary.content} components={blogComponents} />
);

const QuoteSlice: FC<
  SliceComponentProps<{
    slice_type: "quote";
    primary: {
      content: RichTextField;
      author: KeyTextField;
      photo: ImageField;
    };
  }>
> = ({ slice }) => (
  <div className="my-8 grid gap-2">
    <p className="m-0 text-md text-gray-900 dark:text-white">
      {slice.primary.content}
    </p>
    <div className="flex items-center gap-3">
      {slice.primary.photo.url && (
        <div className="flex overflow-hidden rounded-full">
          <Image src={slice.primary.photo.url} width={32} height={32} />
        </div>
      )}
      <p className="m-0 text-sm text-gray-500 dark:text-gray-400">
        {slice.primary.author}
      </p>
    </div>
  </div>
);

const ComparisonSlice: FC<
  SliceComponentProps<{
    slice_type: "quote";
    primary: {
      before: ImageField;
      after: ImageField;
    };
  }>
> = ({ slice }) => {
  if (!slice.primary.before.url || !slice.primary.after.url) {
    return null;
  }

  return (
    <ReactCompareSlider
      itemOne={
        <Image
          src={slice.primary.before.url}
          width={480}
          height={
            480 *
            (slice.primary.before.dimensions.height /
              slice.primary.before.dimensions.width)
          }
        />
      }
      itemTwo={
        <Image
          src={slice.primary.after.url}
          width={480}
          height={
            480 *
            (slice.primary.after.dimensions.height /
              slice.primary.after.dimensions.width)
          }
        />
      }
    />
  );
};

const WorkPost: FC<WorkPostProps> = ({ data, last_publication_date }) => (
  <Layout backHref="/blog" backLabel="Blog">
    <div className="grid gap-8">
      <div className="grid gap-1">
        <h1 className="text-md font-medium text-gray-900 dark:text-white">
          {data.title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated at{" "}
          {format(parseISO(last_publication_date), "MMM dd, yyyy")}{" "}
        </p>
      </div>
      <div className="prose dark:prose-invert">
        <SliceZone
          slices={data.slices1}
          components={{
            rich_text: RichTextSlice as unknown as SliceComponentType<Slice>,
            quote: QuoteSlice as unknown as SliceComponentType<Slice>,
            comparison: ComparisonSlice as unknown as SliceComponentType<Slice>,
          }}
        />
      </div>
    </div>
  </Layout>
);

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data, last_publication_date } = (await getPage(
    params?.post as string,
    "case-study"
  )) as PrismicDocumentWithUID<WorkPostProps["data"]>;

  return {
    props: {
      data,
      last_publication_date,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const caseStudies = (await getPages("case-study")) as PrismicDocumentWithUID<
    WorkPostProps["data"]
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

export default WorkPost;
