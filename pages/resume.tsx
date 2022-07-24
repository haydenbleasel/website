import type { GetStaticProps } from 'next';
import type {
  GroupField,
  ImageField,
  KeyTextField,
  NumberField,
  PrismicDocumentWithUID,
  RichTextField,
} from '@prismicio/types';
import type { FC } from 'react';
import { useEffect } from 'react';
import Image from 'next/future/image';
import toast from 'react-hot-toast';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import { getPage, getPages } from '../utils/prismic';
import Layout from '../components/layout';
import { social } from '../utils/social';
import SocialLinks from '../components/socialLinks';
import getCommandKey from '../utils/getCommandKey';
import type { WorkPostProps } from './work/[post]';
import type { HomeProps } from '.';

type ResumeProps = {
  data: {
    summary: RichTextField;
    testimonials: GroupField<{
      name: KeyTextField;
      quote: KeyTextField;
      photo: ImageField;
    }>;
    education: GroupField<{
      degree: KeyTextField;
      university: KeyTextField;
      startYear: NumberField;
      endYear: NumberField;
    }>;
  };
  home: HomeProps['data'];
  work: WorkPostProps[];
};

const sortByYear = (postA: WorkPostProps, postB: WorkPostProps) => {
  if (!postA.data.startYear || !postB.data.startYear) {
    return -1;
  }

  return postB.data.startYear - postA.data.startYear;
};

const Resume: FC<ResumeProps> = ({ data, home, work }) => {
  useEffect(() => {
    toast(`You can press ${getCommandKey()}P to print this page!`, {
      duration: 5 * 60 * 1000,
    });

    return () => {
      toast.dismiss();
    };
  }, []);

  return (
    <Layout title="Resume" description="My printable resume." noTitle>
      {home.photo.url && (
        <Image
          src={home.photo.url}
          alt="Hayden Bleasel"
          width={64}
          height={64}
          priority
          quality={100}
          className="flex shrink-0 overflow-hidden rounded-full"
        />
      )}
      <h1 className="mb-4">{home.name}</h1>
      <p className="mt-0 text-lg">{home.description}</p>
      <PrismicLink href={process.env.NEXT_PUBLIC_SITE_URL}>
        Visit my website
      </PrismicLink>

      <h2>Summary</h2>
      <PrismicRichText field={data.summary} />

      <h2>Selected Work History</h2>
      {work.sort(sortByYear).map((job) => (
        <div key={job.uid}>
          <h3 className="mb-1">
            {job.data.role},{' '}
            {job.data.slices1.length ? (
              <PrismicLink document={job}>
                <span>{job.data.company}</span>
              </PrismicLink>
            ) : (
              job.data.company
            )}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {job.data.startYear} &mdash; {job.data.endYear ?? 'Present'} in{' '}
            {job.data.location}
          </p>
          <PrismicRichText field={job.data.summary} />
        </div>
      ))}
      <PrismicLink href={social.find(({ id }) => id === 'linkedin')?.url}>
        View more work history on LinkedIn
      </PrismicLink>

      <h2>Education</h2>
      {data.education.map((degree) => (
        <div key={degree.degree}>
          <h3 className="mb-0">{degree.degree}</h3>
          <p>
            {degree.university}, {degree.startYear} &mdash;{' '}
            {degree.endYear ?? 'Present'}
          </p>
        </div>
      ))}

      <h2>Testimonials</h2>
      <div>
        {data.testimonials.map((testimonial) => (
          <div key={testimonial.name}>
            <blockquote>{testimonial.quote}</blockquote>
            <div className="mt-4 flex items-center gap-2">
              {testimonial.photo.url && (
                <Image
                  src={testimonial.photo.url}
                  alt=""
                  width={32}
                  height={32}
                  quality={100}
                  priority
                  className="m-0 inline-flex overflow-hidden rounded-full"
                />
              )}
              <p className="m-0 font-semibold">{testimonial.name}</p>
            </div>
          </div>
        ))}
      </div>

      <SocialLinks />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const { data } = (await getPage(
    { previewData },
    'resume'
  )) as PrismicDocumentWithUID;
  const { data: home } = (await getPage(
    { previewData },
    'home'
  )) as PrismicDocumentWithUID;
  const work = (await getPages('work-post')) as WorkPostProps[];

  return {
    props: {
      data,
      home,
      work,
    },
  };
};

export default Resume;
