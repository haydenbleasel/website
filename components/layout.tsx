import { PrismicLink } from "@prismicio/react";
import type { NextSeoProps } from "next-seo";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import type { FC } from "react";
import { ArrowLeft } from "react-feather";

export type LayoutProps = {
  backHref?: string;
  backLabel?: string;
} & NextSeoProps;

const Layout: FC<LayoutProps> = ({
  title,
  description,
  backHref,
  backLabel,
  children,
  ...props
}) => {
  const { asPath } = useRouter();
  const siteUrl = new URL(asPath, process.env.NEXT_PUBLIC_SITE_URL).href;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={siteUrl}
        openGraph={{
          url: siteUrl,
          title,
          description,
          images: [
            {
              url: new URL("cover.jpg", process.env.NEXT_PUBLIC_SITE_URL).href,
              width: 1200,
              height: 630,
              alt: "",
              type: "image/jpeg",
            },
          ],
          site_name: "Hayden Bleasel",
          type: "profile",
          profile: {
            firstName: "Hayden",
            lastName: "Bleasel",
            username: "haydenbleasel",
            gender: "male",
          },
        }}
        twitter={{
          handle: "@haydenbleasel",
          site: "@haydenbleasel",
          cardType: "summary_large_image",
        }}
        {...props}
      />
      <div className="container mx-auto py-12 sm:py-48">
        <div className="grid gap-8 sm:grid-cols-12">
          <div className="mx-auto grid w-full max-w-[32rem] gap-24 self-start px-4 sm:col-span-3">
            {backHref && (
              <PrismicLink href={backHref}>
                <span className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
                  <ArrowLeft size={14} />
                  <span className="text-sm text-gray-400 dark:text-gray-500">
                    {backLabel ?? "Back"}
                  </span>
                </span>
              </PrismicLink>
            )}
          </div>
          <div className="sm:col-span-9 sm:col-start-4 md:col-span-6">
            <div className="mx-auto grid w-full max-w-[32rem] gap-24 px-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
