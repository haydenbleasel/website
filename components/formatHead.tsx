import type { FC } from 'react';

type FormatHeadProps = {
  title: string;
  description: string;
  path: string;
};

const FormatHead: FC<FormatHeadProps> = ({ title, description, path }) => {
  const url = new URL(path, process.env.SITE_URL).href;

  return (
    <>
      <title>{title} — Hayden Bleasel</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="canonical" content={url} />
    </>
  );
};

export default FormatHead;
