import * as prismic from "@prismicio/client";
import type { LinkResolverFunction } from "@prismicio/helpers";
import type {
  FilledLinkToMediaField,
  FilledLinkToWebField,
  FilledLinkToDocumentField,
} from "@prismicio/types";

export const linkResolver: LinkResolverFunction = (document) => {
  if (!document.uid) {
    return "/";
  }

  const routes: Record<string, string> = {
    home: "/",
  };

  return routes[document.type] || `/${document.uid}`;
};

export const docResolver = (
  link:
    | FilledLinkToDocumentField
    | FilledLinkToWebField
    | FilledLinkToMediaField
): string => {
  if (link.link_type === "Document") {
    return linkResolver(link);
  }

  return link.url;
};

export const client = prismic.createClient(
  process.env.PRISMIC_ENDPOINT ?? "loading",
  {
    fetch,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN ?? "",
  }
);

export const getPage = async (uid: string, type?: string): Promise<unknown> => {
  const page = await client.getByUID(type ?? uid, uid);

  return page;
};

export const getPages = async (type: string): Promise<unknown> => {
  const pages = await client.getAllByType(type);

  return pages;
};
