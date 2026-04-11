import type { ComponentProps, ReactNode } from "react";

interface Project {
  name: string;
  description: string;
  url: string;
  status?: "Acquired" | "Merged" | "Archived";
  logo: (props: ComponentProps<"svg">) => ReactNode;
}

const UltraciteLogo = (props: ComponentProps<"svg">) => (
  <svg
    fill="none"
    viewBox="0 0 507 508"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Ultracite</title>
    <path
      d="M318.661 13.3835L268.715 0L226.623 157.087L188.623 15.2678L138.674 28.6513L179.732 181.876L77.4678 79.6125L40.9035 116.177L153.075 228.349L13.3834 190.918L0 240.865L152.63 281.763C150.882 274.225 149.958 266.372 149.958 258.303C149.958 201.186 196.26 154.883 253.378 154.883C310.495 154.883 356.797 201.186 356.797 258.303C356.797 266.32 355.884 274.125 354.158 281.618L492.869 318.785L506.251 268.838L353.016 227.778L492.718 190.346L479.332 140.399L326.102 181.456L428.366 79.1929L391.801 42.6286L281.186 153.244L318.661 13.3835Z"
      fill="currentColor"
    />
    <path
      d="M354.009 282.198C349.727 300.302 340.686 316.567 328.281 329.597L428.772 430.09L465.336 393.525L354.009 282.198Z"
      fill="currentColor"
    />
    <path
      d="M327.264 330.651C314.709 343.474 298.844 353.043 281.052 357.974L317.619 494.442L367.566 481.06L327.264 330.651Z"
      fill="currentColor"
    />
    <path
      d="M279.195 358.47C270.94 360.592 262.288 361.72 253.372 361.72C243.819 361.72 234.569 360.425 225.787 358L189.187 494.595L239.134 507.976L279.195 358.47Z"
      fill="currentColor"
    />
    <path
      d="M224.015 357.498C206.495 352.321 190.911 342.631 178.613 329.771L77.8749 430.509L114.439 467.074L224.015 357.498Z"
      fill="currentColor"
    />
    <path
      d="M177.789 328.881C165.702 315.94 156.898 299.893 152.707 282.068L13.5416 319.357L26.9249 369.304L177.789 328.881Z"
      fill="currentColor"
    />
  </svg>
);

const EververseLogo = (props: ComponentProps<"svg">) => (
  <svg
    fill="none"
    viewBox="0 0 118 118"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Eververse</title>
    <path
      d="M59.3377 117.036C63.1496 117.036 66.2732 114.231 66.8024 110.26C72.0434 74.8953 76.861 69.9718 110.85 66.1073C114.767 65.6308 117.785 62.3486 117.785 58.5368C117.785 54.6717 114.82 51.4954 110.902 50.913C77.1259 46.2012 72.9438 42.0718 66.8024 6.76032C66.1142 2.84261 63.0964 0.036499 59.3377 0.036499C55.4732 0.036499 52.4022 2.84261 51.7671 6.81298C46.632 42.125 41.8144 47.0485 7.87879 50.913C3.85524 51.4427 0.890625 54.619 0.890625 58.5368C0.890625 62.3486 3.7494 65.5249 7.77295 66.1073C41.6022 70.9249 45.7316 75.0012 51.7671 110.313C52.5612 114.284 55.6317 117.036 59.3377 117.036Z"
      fill="currentColor"
    />
  </svg>
);

const KiboLogo = (props: ComponentProps<"svg">) => (
  <svg
    fill="none"
    viewBox="0 0 116 116"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Kibo UI</title>
    <path
      clipRule="evenodd"
      d="m29.3378 0h87.0002v87l-29.0002 29v-87h-87.000031zm-29.000031 95.7389v-37.7389h37.738831zm58.000031 20.2611h-37.249l37.249-37.2488z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

const OrateLogo = (props: ComponentProps<"svg">) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Orate</title>
    <path d="m10 9-3 3 3 3" />
    <path d="m14 15 3-3-3-3" />
    <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
  </svg>
);

const RefractionLogo = (props: ComponentProps<"svg">) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Refraction</title>
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);

const NextForgeLogo = (props: ComponentProps<"svg">) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>next-forge</title>
    <path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2" />
    <rect height="8" rx="1" width="8" x="14" y="2" />
  </svg>
);

const JoyfulLogo = (props: ComponentProps<"svg">) => (
  <svg
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.488 0C11.5467 0.00171974 9.62847 0.422142 7.86433 1.23259C6.10019 2.04304 4.53161 3.22444 3.26557 4.69622C1.99953 6.168 1.06581 7.89554 0.528117 9.76098C-0.00957876 11.6264 -0.138607 13.5859 0.149833 15.5057C0.438273 17.4256 1.1374 19.2606 2.19951 20.8857C3.26163 22.5108 4.66176 23.8877 6.30439 24.9225C7.94702 25.9573 9.79351 26.6256 11.7179 26.8819C13.6423 27.1381 15.5994 26.9763 17.4555 26.4075C17.6915 26.3358 17.9062 26.207 18.0805 26.0325L26.0268 18.0863C26.2011 17.9118 26.3298 17.6971 26.4018 17.4613C27.0194 15.4418 27.155 13.3058 26.7978 11.2245C26.4405 9.14315 25.6004 7.17458 24.3447 5.47672C23.089 3.77885 21.4528 2.39899 19.5674 1.44787C17.6819 0.496754 15.5998 0.000863902 13.488 0ZM23.628 16.2388L16.228 23.6388C13.9986 24.2386 11.6334 24.0857 9.49977 23.2038C7.36608 22.3219 5.58318 20.7604 4.42778 18.7615C3.27239 16.7627 2.80912 14.4383 3.10989 12.1493C3.41065 9.86018 4.45863 7.73441 6.09117 6.10187C7.7237 4.46934 9.84947 3.42136 12.1385 3.12059C14.4276 2.81983 16.752 3.28309 18.7508 4.43849C20.7497 5.59389 22.3112 7.37679 23.1931 9.51048C24.075 11.6442 24.2279 14.0093 23.628 16.2388ZM6.98804 11C6.98804 10.6044 7.10534 10.2178 7.3251 9.88886C7.54487 9.55996 7.85722 9.30362 8.22268 9.15224C8.58813 9.00087 8.99026 8.96126 9.37822 9.03843C9.76618 9.1156 10.1226 9.30608 10.4023 9.58579C10.682 9.86549 10.8724 10.2219 10.9496 10.6098C11.0268 10.9978 10.9872 11.3999 10.8358 11.7654C10.6844 12.1308 10.4281 12.4432 10.0992 12.6629C9.77028 12.8827 9.3836 13 8.98804 13C8.45761 13 7.9489 12.7893 7.57383 12.4142C7.19876 12.0391 6.98804 11.5304 6.98804 11ZM19.988 11C19.988 11.3956 19.8707 11.7822 19.651 12.1111C19.4312 12.44 19.1189 12.6964 18.7534 12.8478C18.388 12.9991 17.9858 13.0387 17.5979 12.9616C17.2099 12.8844 16.8535 12.6939 16.5738 12.4142C16.2941 12.1345 16.1036 11.7781 16.0265 11.3902C15.9493 11.0022 15.9889 10.6001 16.1403 10.2346C16.2917 9.86918 16.548 9.55682 16.8769 9.33706C17.2058 9.1173 17.5925 9 17.988 9C18.5185 9 19.0272 9.21071 19.4023 9.58579C19.7773 9.96086 19.988 10.4696 19.988 11ZM19.7868 17.25C18.4118 19.6325 16.113 21 13.488 21C10.863 21 8.56804 19.6337 7.18929 17.25C6.99896 16.9061 6.95124 16.5012 7.0564 16.1224C7.16156 15.7436 7.41119 15.4213 7.7516 15.2247C8.092 15.0281 8.49597 14.9731 8.87658 15.0713C9.2572 15.1695 9.58404 15.4132 9.78679 15.75C10.273 16.5913 11.4005 18 13.488 18C15.5755 18 16.703 16.59 17.1893 15.75C17.2858 15.5756 17.4161 15.4222 17.5725 15.2988C17.7289 15.1753 17.9084 15.0843 18.1004 15.031C18.2925 14.9777 18.4932 14.9632 18.6909 14.9883C18.8886 15.0134 19.0793 15.0777 19.2518 15.1773C19.4244 15.277 19.5754 15.4101 19.696 15.5687C19.8166 15.7274 19.9043 15.9085 19.9541 16.1014C20.0039 16.2944 20.0148 16.4954 19.9861 16.6926C19.9573 16.8898 19.8896 17.0793 19.7868 17.25Z"
      fill="currentColor"
    />
  </svg>
);

const projects: Project[] = [
  {
    description: "Delightful, random word combinations for your app.",
    logo: JoyfulLogo,
    name: "Joyful",
    url: "https://github.com/haydenbleasel/joyful",
  },
  {
    description: "Robust, zero-config linter/formatter preset.",
    logo: UltraciteLogo,
    name: "Ultracite",
    url: "https://www.ultracite.ai",
  },
  {
    description: "A UI library for building web applications.",
    logo: KiboLogo,
    name: "Kibo UI",
    status: "Acquired",
    url: "https://www.shadcnblocks.com/blog/announcing-kibo-ui-acquisition/",
  },
  {
    description: "Learn, improve and generate code with AI.",
    logo: RefractionLogo,
    name: "Refraction",
    status: "Acquired",
    url: "https://x.com/haydenbleasel/status/1678770475647012864",
  },
  {
    description: "Production-grade Turborepo template.",
    logo: NextForgeLogo,
    name: "next-forge",
    status: "Acquired",
    url: "https://x.com/haydenbleasel/status/1929625673586598148",
  },
  {
    description: "AI toolkit for transcribing and synthesizing speech.",
    logo: OrateLogo,
    name: "Orate",
    status: "Merged",
    url: "https://x.com/haydenbleasel/status/1931033287851675688",
  },
  {
    description: "The open source product management platform.",
    logo: EververseLogo,
    name: "Eververse",
    status: "Archived",
    url: "https://github.com/haydenbleasel/eververse",
  },
];

export const Projects = () => (
  <div className="grid gap-6 sm:gap-2">
    {projects.map((project) => (
      <a
        className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 no-underline"
        href={project.url}
        key={project.name}
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <project.logo className="size-4 text-foreground transition-colors group-hover:text-muted mb-2 sm:mb-0" />
          <p className="font-medium text-foreground transition-colors group-hover:text-muted">
            {project.name}
          </p>
          <p className="text-sm">{project.description}</p>
        </div>
        {project.status ? (
          <span className="shrink-0 w-fit rounded-full border px-2.5 py-0.5 text-xs">
            {project.status}
          </span>
        ) : null}
      </a>
    ))}
  </div>
);
