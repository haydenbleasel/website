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
import Image from 'next/image';
import toast from 'react-hot-toast';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import { docResolver, getPage } from '../utils/prismic';
import Layout from '../components/layout';
import type { WorkProps } from './work';
import { social } from './_app';
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
  work: WorkProps['data'];
};

const Resume: FC<ResumeProps> = ({ data, home, work }) => {
  useEffect(() => {
    toast('You can press ⌘P to print this page!');
  }, []);

  return (
    <Layout title="Resume" description="My printable resume." noTitle>
      <div className="grid gap-8">
        <div className="flex items-start gap-8">
          {home.photo.url && (
            <div className="flex overflow-hidden rounded-full">
              <Image
                src={home.photo.url}
                alt="Hayden Bleasel"
                width={64}
                height={64}
                layout="fixed"
                priority
              />
            </div>
          )}
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white print:text-lg">
              {home.name}
            </h1>
            <p className="text-md font-normal text-gray-500 dark:text-gray-400 print:text-sm">
              {home.description}
            </p>
            <div className="mt-2 flex items-center gap-4">
              <PrismicLink href={process.env.NEXT_PUBLIC_SITE_URL}>
                <span className="text-sm font-medium underline print:text-xs">
                  Website
                </span>
              </PrismicLink>
              <PrismicLink
                href={social.find(({ id }) => id === 'twitter')?.url}
              >
                <span className="text-sm font-medium underline print:text-xs">
                  Twitter
                </span>
              </PrismicLink>
              <PrismicLink href={social.find(({ id }) => id === 'github')?.url}>
                <span className="text-sm font-medium underline print:text-xs">
                  GitHub
                </span>
              </PrismicLink>
              <PrismicLink
                href={social.find(({ id }) => id === 'dribbble')?.url}
              >
                <span className="text-sm font-medium underline print:text-xs">
                  Dribbble
                </span>
              </PrismicLink>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white print:text-md">
            Summary
          </h2>
          <PrismicRichText field={data.summary} />
        </div>

        <div className="grid gap-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white print:text-md">
            Selected Work History
          </h2>
          <div className="grid gap-4">
            {work.jobs.map((job) => (
              <div key={job.title}>
                <p className="text-md font-semibold text-gray-900 dark:text-white print:text-sm">
                  {job.title},{' '}
                  {docResolver(job.link) ? (
                    <PrismicLink field={job.link}>
                      <span className="text-md font-semibold underline print:text-sm">
                        {job.company}
                      </span>
                    </PrismicLink>
                  ) : (
                    job.company
                  )}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 print:text-xs">
                  {job.startYear} &mdash; {job.endYear ?? 'Present'} in{' '}
                  {job.location}
                </p>
                <div className="mt-4">
                  <PrismicRichText field={job.description} />
                </div>
              </div>
            ))}
          </div>
          <PrismicLink href={social.find(({ id }) => id === 'linkedin')?.url}>
            <div className="inline-block text-md font-semibold underline print:text-sm">
              View more work history on LinkedIn
            </div>
          </PrismicLink>
        </div>

        <div className="grid gap-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white print:text-md">
            Education
          </h2>
          {data.education.map((degree) => (
            <div key={degree.degree}>
              <p className="text-md font-semibold text-gray-900 dark:text-white print:text-sm">
                {degree.degree}, {degree.university}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 print:text-xs">
                {degree.startYear} &mdash; {degree.endYear ?? 'Present'}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white print:text-md">
            Testimonials
          </h2>
          <div className="grid gap-4">
            {data.testimonials.map((testimonial) => (
              <blockquote
                key={testimonial.name}
                className="border-l-2 border-gray-200 pl-6"
              >
                <p className="text-md text-gray-900 dark:text-white print:text-sm">
                  {testimonial.quote}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  {testimonial.photo.url && (
                    <div className="inline-flex overflow-hidden rounded-full">
                      <Image
                        src={testimonial.photo.url}
                        alt=""
                        width={32}
                        height={32}
                      />
                    </div>
                  )}
                  <p className="text-md font-medium text-gray-900 dark:text-white print:text-sm">
                    {testimonial.name}
                  </p>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = (await getPage('resume')) as PrismicDocumentWithUID;
  const { data: home } = (await getPage('home')) as PrismicDocumentWithUID;
  const { data: work } = (await getPage('work')) as PrismicDocumentWithUID;

  return {
    props: {
      data,
      home,
      work,
    },
  };
};

export default Resume;
