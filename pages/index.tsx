import { PrismicRichText } from "@prismicio/react";
import type {
  ImageFieldImage,
  KeyTextField,
  PrismicDocumentWithUID,
  RichTextField,
} from "@prismicio/types";
import { trackGoal } from "fathom-client";
import type { GetStaticProps } from "next";
import Image from "next/image";
import type { FC, FormEvent } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import Activity from "../components/activity";
import Layout from "../components/layout";
import { getPage } from "../utils/prismic";
import type { RevueHandlerResponse } from "./api/revue";

type HomeProps = {
  data: {
    title: KeyTextField;
    description: KeyTextField;
    name: KeyTextField;
    role: KeyTextField;
    photo: ImageFieldImage;
    sections: {
      title: KeyTextField;
      content: RichTextField;
    }[];
  };
};

const Home: FC<HomeProps> = ({ data }) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const joinMailingList = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/revue", {
        method: "post",
        body: JSON.stringify({ email }),
      });

      const body = (await response.json()) as RevueHandlerResponse;

      if (response.status !== 200) {
        throw new Error(body.message);
      }

      toast.success(body.message);
      setEmail("");
      if (process.env.NEXT_PUBLIC_FATHOM_NEWSLETTER_GOAL) {
        trackGoal(process.env.NEXT_PUBLIC_FATHOM_NEWSLETTER_GOAL, 0);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : (error as string);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="grid gap-8">
        {data.photo.url && (
          <div className="flex">
            <div className="relative">
              <div className="inline-flex overflow-hidden rounded-full">
                <Image
                  src={data.photo.url}
                  width={64}
                  height={64}
                  layout="fixed"
                  priority
                />
              </div>
              <Activity />
            </div>
          </div>
        )}
        <div>
          <h1 className="text-md font-medium text-gray-900 dark:text-white">
            {data.name}
          </h1>
          <p className="text-md font-normal text-gray-500 dark:text-gray-400">
            {data.role}
          </p>
        </div>
      </div>
      <div className="grid gap-12">
        {data.sections.map((section, index) => (
          <div key={index} className="grid gap-4">
            {section.title && (
              <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {section.title}
              </p>
            )}
            <PrismicRichText field={section.content} />
          </div>
        ))}
        <form
          onSubmit={joinMailingList}
          className={`flex gap-4 ${
            loading
              ? "pointer-events-none opacity-50"
              : "pointer-events-auto opacity-100"
          }`}
        >
          <input
            className="w-full rounded-sm border border-gray-200 bg-transparent py-2 px-3 text-md font-normal text-gray-900 placeholder:text-gray-400 dark:border-gray-700 dark:text-white"
            name="email"
            placeholder="hello@janesmith.com"
            type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            required
          />
          <button
            type="submit"
            disabled={!email}
            className="rounded-sm border border-gray-900 bg-gray-900 py-2 px-6 text-md font-medium text-white dark:border-gray-800 dark:bg-gray-800"
          >
            Join
          </button>
        </form>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = (await getPage("home")) as PrismicDocumentWithUID;

  return {
    props: {
      data,
    },
  };
};

export default Home;
