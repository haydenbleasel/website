/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { PrismicDocumentWithUID } from "@prismicio/types";
import type { NextApiHandler } from "next";
import { getPages } from "../../utils/prismic";

const handler: NextApiHandler = async (req, res) => {
  const caseStudies = (await getPages(
    "case-study"
  )) as PrismicDocumentWithUID[];
  const landingPages = (await getPages(
    "landing-page"
  )) as PrismicDocumentWithUID[];

  const caseStudyActions = caseStudies.map(({ uid, data }) => ({
    name: data.title,
    shortcut: [uid.charAt(0)],
    keywords: data.title,
    link: `/blog/work/${uid}`,
  }));

  const landingPageActions = landingPages.map(({ uid, data }) => ({
    name: data.title,
    shortcut: [uid.charAt(0)],
    keywords: data.title,
    link: `/${uid}`,
  }));

  const actions = [...caseStudyActions, ...landingPageActions];

  res.status(200).json({ actions });
};

export default handler;
