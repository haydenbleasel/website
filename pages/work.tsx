import type { GetStaticProps } from "next";
import type { FC } from "react";
import groupBy from 'lodash.groupby';
import Layout from "../components/layout";
import { getPage } from "../utils/prismic";

type WorkData = {
  data: {
    jobs: {
      title: string;
      startYear: number;
    }[];
  }
}

const Work: FC<WorkData> = ({ data }) => {
  const years = groupBy(data.jobs, (job) => job.startYear);

  return (
    <Layout backHref="/" backLabel="Home">
      <div className="grid gap-8">
        <h1 className="text-md font-medium">Work</h1>
        {Object.keys(years).reverse().map((startYear) => (
          <div className="flex gap-8" key={startYear}>
            <p className="w-24 flex-0 text-sm text-gray-400">{startYear}</p>
            <div className="flex-1 flex flex-col gap-1">
              {years[startYear].map((job) => (
                <p className="text-md text-gray-900" key={job.title}>{job.title}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getPage('work');

  return {
    props: {
      data,
    }
  }
};

export default Work;