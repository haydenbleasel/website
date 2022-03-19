import type { FC } from "react";
import { useRef, useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { load, trackPageview } from "fathom-client";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import type { JSXMapSerializer, LinkProps } from "@prismicio/react";
import { PrismicProvider, PrismicLink } from "@prismicio/react";
import Link from "next/link";
import { Menu, Share } from "react-feather";
import { useClickAway, useToggle } from "react-use";
import { client, docResolver, linkResolver } from "../utils/prismic";
import "../styles/globals.css";
import "../styles/dev.css";
import tailwindConfig from "../tailwind.config";

export const components: JSXMapSerializer = {
  paragraph: ({ children, key }) => (
    <p
      key={key}
      className="text-normal mb-4 text-md text-gray-900 dark:text-white"
    >
      {children}
    </p>
  ),
  hyperlink: ({ children, node, key }) => {
    const href = docResolver(node.data);

    return (
      <PrismicLink key={key} href={href}>
        <span className="text-gray-900 underline transition-colors hover:text-gray-800 dark:text-white dark:hover:text-gray-100">
          {children}
        </span>
      </PrismicLink>
    );
  },
  heading1: ({ children, key }) => (
    <h1
      key={key}
      className="mt-8 mb-4 text-xl font-semibold text-gray-900 dark:text-white"
    >
      {children}
    </h1>
  ),
  heading2: ({ children, key }) => (
    <h2
      key={key}
      className="mt-8 mb-4 text-sm font-semibold text-gray-900 dark:text-white sm:text-lg"
    >
      {children}
    </h2>
  ),
  heading3: ({ children, key }) => (
    <h3
      key={key}
      className="mt-8 mb-4 text-xs font-semibold text-gray-900 dark:text-white sm:text-md"
    >
      {children}
    </h3>
  ),
  heading4: ({ children, key }) => (
    <h4
      key={key}
      className="mt-8 mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-sm"
    >
      {children}
    </h4>
  ),
  heading5: ({ children, key }) => (
    <h5
      key={key}
      className="mt-8 mb-4 text-lg font-semibold text-gray-900 dark:text-white sm:text-xs"
    >
      {children}
    </h5>
  ),
  heading6: ({ children, key }) => (
    <h6
      key={key}
      className="mt-8 mb-4 text-md font-semibold text-gray-900 dark:text-white sm:text-xl"
    >
      {children}
    </h6>
  ),
  list: ({ children, key }) => (
    <div key={key}>
      <ul className="mb-4 list-inside list-disc">{children}</ul>
    </div>
  ),
  oList: ({ children, key }) => (
    <div key={key}>
      <ul className="mb-4 list-inside list-decimal">{children}</ul>
    </div>
  ),
  listItem: ({ children, key }) => (
    <li key={key} className="text-md text-gray-900 dark:text-white">
      {children}
    </li>
  ),
  oListItem: ({ children, key }) => (
    <li key={key} className="text-md text-gray-900 dark:text-white">
      {children}
    </li>
  ),
};

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const { events, asPath } = useRouter();
  const [menuOpen, toggleMenuOpen] = useToggle(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID ?? "", {
      includedDomains: [
        new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "").hostname,
      ],
      url: process.env.NEXT_PUBLIC_ANALYTICS_URL,
    });

    const onRouteChangeComplete = () => trackPageview();

    events.on("routeChangeComplete", onRouteChangeComplete);

    onRouteChangeComplete();

    return () => {
      events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, [events]);

  useClickAway(ref, () => menuOpen && toggleMenuOpen(false));

  const internalLinkComponent = ({
    children,
    href,
    className = "",
    ...props
  }: LinkProps & { className?: string }) => {
    const active = asPath === href;

    return (
      <Link href={href} passHref>
        <a
          href={href}
          className={`text-md font-normal transition-all ${
            active
              ? "text-gray-700 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-500"
              : "text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-500"
          } ${className}`}
          {...props}
        >
          {children}
        </a>
      </Link>
    );
  };

  const externalLinkComponent = ({
    children,
    href,
    className = "",
    ...props
  }: LinkProps & { className?: string }) => (
    <Link href={href}>
      <a
        {...props}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 text-md font-normal text-gray-500 transition-all hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-500 ${className}`}
      >
        {children}
        {typeof children === "string" && (
          <div className="text-gray-400 dark:text-gray-600">
            <Share size={16} />
          </div>
        )}
      </a>
    </Link>
  );

  const pages = [
    { link: "/", label: "Home" },
    { link: "/work", label: "Work" },
    { link: "/clients", label: "Clients" },
    { link: "/blog", label: "Blog" },
    { link: "/playlists", label: "Playlists" },
    { link: "/colophon", label: "Colophon" },
  ];

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta name="application-name" content="Hayden Bleasel" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Hayden Bleasel" />

        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#F5F5F9" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#F5F5F9" />
        <link rel="manifest" href="/manifest.json" />

        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#F5F5F9" />
      </Head>
      <PrismicProvider
        linkResolver={linkResolver}
        internalLinkComponent={internalLinkComponent}
        externalLinkComponent={externalLinkComponent}
        client={client}
        richTextComponents={components}
      >
        <Component {...pageProps} />
      </PrismicProvider>
      <div className="fixed top-0 right-0 flex flex-col items-end" ref={ref}>
        <div
          className="p-4"
          onClick={toggleMenuOpen}
          onKeyDown={toggleMenuOpen}
          role="button"
          tabIndex={0}
        >
          <Menu size={16} color={tailwindConfig.theme.colors.gray[400]} />
        </div>
        <div
          className={`mr-4 grid w-[200px] rounded-md bg-white py-2 shadow-sm transition-all ${
            menuOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-1 opacity-0"
          } `}
        >
          {pages.map((page, index) => (
            <PrismicLink href={page.link} key={index}>
              <span className="flex bg-white px-3 py-1 text-sm text-gray-900 hover:bg-gray-100">
                {page.label}
              </span>
            </PrismicLink>
          ))}
        </div>
      </div>
      <Toaster
        toastOptions={{
          duration: 5000,
          position: "bottom-right",
        }}
      />
    </>
  );
};

export default App;
