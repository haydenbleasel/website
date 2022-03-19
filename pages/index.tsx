import { PrismicRichText } from '@prismicio/react';
import type { ImageFieldImage, KeyTextField, PrismicDocumentWithUID, RichTextField } from '@prismicio/types';
import { trackGoal } from 'fathom-client';
import type { GetStaticProps } from 'next';
import Image from 'next/image';
import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Layout from '../components/layout';
import { getPage } from '../utils/prismic';

type HomeProps = {
  data: {
    title: KeyTextField
    description: KeyTextField;
    name: KeyTextField;
    role: KeyTextField;
    photo: ImageFieldImage;
    sections: {
      title: KeyTextField;
      content: RichTextField;
    }[];
  }
}

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

      const body = await response.json() as { error?: string }

      if (body.error) {
        throw new Error(body.error);
      }

      toast.success('Thanks, choom! I\'ll let you know when I release something cool.');
      setEmail("");
      if (process.env.NEXT_PUBLIC_FATHOM_NEWSLETTER_GOAL) {
        trackGoal(process.env.NEXT_PUBLIC_FATHOM_NEWSLETTER_GOAL, 0);
      }
    } catch (error) {
      toast.error('Sorry, something went wrong! Try again later, hopefully I\'ve fixed it by then.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="grid gap-8">
        {data.photo.url && (
          <div className="flex">
            <div className="inline-flex rounded-full overflow-hidden">
              <Image src={data.photo.url} width={64} height={64} layout="fixed" priority />
            </div>
          </div>
        )}
        <div>
          <h1 className="text-md font-medium text-gray-900">{data.name}</h1>
          <p className="text-md font-normal text-gray-500">{data.role}</p>
        </div>
      </div>
      <div className="grid gap-12">
        {data.sections.map((section, index) => (
          <div key={index} className="grid gap-4">
            <p className="text-sm font-normal text-gray-500">{section.title}</p>
            <PrismicRichText field={section.content} />
          </div>
        ))}
        <form onSubmit={joinMailingList} className="relative">
          <input
            className="w-full text-md font-normal text-gray-900 placeholder:text-gray-400 py-[6px] px-3 border border-gray-100 rounded-sm p-[2px]"
            name="email"
            placeholder="hello@janesmith.com"
            type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            required
          />
          <button type="submit" disabled={!email} className="absolute right-[2px] top-[2px] text-md font-medium bg-gray-900 text-white py-[6px] px-6 rounded-sm">Join</button>
        </form>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await getPage('home') as PrismicDocumentWithUID;

  return {
    props: {
      data,
    }
  }
}

export default Home;