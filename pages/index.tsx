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
import { HelpCircle } from "react-feather";
import toast from "react-hot-toast";
import Layout from "../components/layout";
import useActivity from "../hooks/useActivity";
import tailwindConfig from "../tailwind.config";
import { getPage } from "../utils/prismic";

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
  const activity = useActivity();

  const joinMailingList = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/revue", {
        method: "post",
        body: JSON.stringify({ email }),
      });

      const body = (await response.json()) as { error?: string };

      if (body.error) {
        throw new Error(body.error);
      }

      toast.success(
        "Thanks, choom! I'll let you know when I release something cool."
      );
      setEmail("");
      if (process.env.NEXT_PUBLIC_FATHOM_NEWSLETTER_GOAL) {
        trackGoal(process.env.NEXT_PUBLIC_FATHOM_NEWSLETTER_GOAL, 0);
      }
    } catch (error) {
      toast.error(
        "Sorry, something went wrong! Try again later, hopefully I've fixed it by then."
      );
    } finally {
      setLoading(false);
    }
  };

  const notifyActivity = () =>
    toast(
      "The activity status is a guess of what I am doing right now, based on a combination of APIs, time and some solid guesswork."
    );

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
              <div className="absolute top-10 left-10 flex max-w-[26px] cursor-pointer items-center gap-2 overflow-hidden whitespace-nowrap rounded-full border border-gray-100 bg-white p-1 pr-2 transition-[max-width] hover:w-auto hover:max-w-[300px] dark:bg-gray-900">
                <p className="text-md leading-none text-gray-900">
                  {activity.emoji}
                </p>
                <p className="text-sm leading-none text-gray-900">
                  {activity.status}
                </p>
                <div
                  onClick={notifyActivity}
                  onKeyDown={notifyActivity}
                  tabIndex={-1}
                  role="button"
                >
                  <HelpCircle
                    size={12}
                    color={tailwindConfig.theme.colors.gray[400]}
                  />
                </div>
              </div>
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
          className={`relative ${
            loading
              ? "pointer-events-none opacity-50"
              : "pointer-events-auto opacity-100"
          }`}
        >
          <input
            className="w-full rounded-sm border border-gray-100 p-[2px] py-[6px] px-3 text-md font-normal text-gray-900 placeholder:text-gray-400"
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
            className="absolute right-[2px] top-[2px] rounded-sm bg-gray-900 py-[6px] px-6 text-md font-medium text-white"
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
