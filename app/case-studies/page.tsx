import type { FC } from 'react';
import { Fragment } from 'react';
import { ArticleJsonLd } from 'next-seo';
import Post from './post';
import { allCaseStudies } from '@/.contentlayer/generated';
import Divider from '@/components/divider';
import sortBlogPostByDate from '@/lib/sortBlogPost';

const CaseStudies: FC = () => (
  <main className="relative flex flex-col gap-12 prose-h2:m-0 prose-p:m-0">
    <ArticleJsonLd
      useAppDir
      type="Blog"
      url={
        new URL('/case-studies', process.env.NEXT_PUBLIC_SITE_URL ?? '').href
      }
      title="Case Studies"
      images={[]}
      dateModified={allCaseStudies[allCaseStudies.length - 1].date}
      datePublished={allCaseStudies[0].date}
      description="Some of my projects from across the years."
      authorName="Hayden Bleasel"
    />
    <h1>Case Studies</h1>
    <div>
      {allCaseStudies.sort(sortBlogPostByDate).map((post, index) => (
        <Fragment key={post.slug}>
          {index > 0 && <Divider />}
          <Post {...post} />
        </Fragment>
      ))}
    </div>
  </main>
);

export default CaseStudies;
